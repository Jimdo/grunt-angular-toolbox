// var helpers = require('./helpers');
var grunt = require('grunt');
var helpers = require('./helpers');
var availableTasks = {};

/**
 * Hooks that may be overwritten in order to
 * prepare or tear down additional services.
 */
var hooks = {
  demo: function() {
    grunt.registerTask('demo:before', 'overwrite this *', []);
  },
  'demo:e2e': function() {
    grunt.registerTask('demo:e2e:before', 'overwrite this *', []);
  },
  test: function() {
    grunt.registerTask('test:before', 'overwrite this *', []);
    grunt.registerTask('test:unit:before', 'overwrite this *', []);
    grunt.registerTask('test:unit:after', 'overwrite this *', []);
    grunt.registerTask('test:e2e:before', 'overwrite this *', []);
    grunt.registerTask('test:e2e:after', 'overwrite this *', []);
    grunt.registerTask('test:after', 'overwrite this *', []);
  },
  e2e: function() {
    grunt.registerTask('tdd:before', 'overwrite this *', []);
    grunt.registerTask('tdd:unit:before', 'overwrite this *', []);
    grunt.registerTask('tdd:e2e:before', 'overwrite this *', []);
  },
  coverage: function() {
    grunt.registerTask('coverage:before', 'overwrite this *', []);
  },
  build: function() {
    grunt.registerTask('build:before', 'overwrite this *', []);
    grunt.registerTask('build:after', 'overwrite this *', []);
  },
  release: function() {
    grunt.registerTask('release:before', 'overwrite this *', []);
    grunt.registerTask('release:after', 'overwrite this *', []);
  }
};


/**
 * Following tasks can be registered by calling
 * loadTasks({tasks: [ <tasklist> ]})
 */

availableTasks.demo = {
  desc: [
    'serve demo application',
    '  options:',
    '    --port  (default: 8000)',
    '  Environment Variables:',
    '    DEMO_PORT  (default: 8000)'
  ].join('\n'),
  hooks: hooks.demo,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:bower',
      'ngtemplates:dist',
      'connect:demo',
      'concurrent:demo',
      'watch:partials',
      'watch:demo',
      'shell:openDemo',
      'ngtemplates:dist'
    ]));
    grunt.registerTask('demo', availableTasks.demo.desc, [
      'demo:before',
      'shell:bower',
      'ngtemplates:dist',
      'connect:demo',
      'concurrent:demo'
    ]);
  }
};

availableTasks['demo:e2e'] = {
  desc: [
    'serve e2e sandbox application',
    '  options:',
    '    --port  (default: 8765)',
    '  Environment Variables:',
    '    E2E_SANDBOX_PORT  (default: 8765)'
  ].join('\n'),
  hooks: hooks['demo:e2e'],
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:deleteInstrumented',
      'instrument',
      'shell:bower',
      'ngtemplates:dist',
      'concurrent:demoE2e',
      'shell:openDemoE2e',
      'connect:test'
    ]));
    grunt.registerTask('demo:e2e', availableTasks['demo:e2e'].desc, [
      'demo:e2e:before',
      'shell:deleteInstrumented',
      'instrument',
      'shell:bower',
      'ngtemplates:dist',
      'concurrent:demoE2e'
    ]);
  }
};

availableTasks.test = {
  desc: [
    'run the tests',
    '  subtasks:',
    '    :unit  execute just unit suite',
    '    :e2e   execute just end to end suite',
    '  options:',
    '    --browsers   set browsers for current suite(s)',
    '    --reporters  set reporters for current suite(s)',
    '  Environment Variables:',
    '    E2E_SANDBOX_PORT     (default: 8765)',
    '    KARMA_BROWSERS       (default: PhantomJs,Chrome,Firefox)',
    '    KARMA_REPORTERS      (default: progress)',
    '    PROTRACTOR_BROWSERS  (default: Chrome)',
    '    PROTRACTOR_REPORTERS (default: dots)'
  ].join('\n'),
  hooks: hooks.test,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:deleteCoverages',
      'shell:bower',
      'jshint',
      'ngtemplates:dist',
      'karma:all',
      'shell:updateWebdriver',
      'shell:deleteInstrumented',
      'instrument',
      'makeReport',
      'connect:test',
      'protractor_coverage:single'
    ]));
    grunt.registerTask(
      'test',
      availableTasks.test.desc,
      function(suite) {
        var tasks = ['test:before', 'shell:deleteCoverages', 'shell:bower', 'jshint', 'ngtemplates:dist'];

        if (!suite || suite === 'unit') {
          process.env.defaultBrowsers = 'Firefox,Chrome';
          tasks.push(
            'test:unit:before',
            'karma:all',
            '_normalizeUnitCoverage',
            'test:unit:after'
          );
        }
        if (!suite || suite === 'e2e') {
          tasks.push(
            'test:e2e:before',
            'shell:updateWebdriver',
            'shell:deleteInstrumented',
            'instrument',
            'connect:test',
            'protractor_coverage:single',
            'test:e2e:after'
          );
        }

        tasks.push('makeReport', 'test:after');
        grunt.task.run(tasks);
      }
    );
  }
};

availableTasks.tdd = {
  desc: availableTasks.test.desc.replace(
    'run the tests',
    'run the tests and rerun on src changes'
  ),
  hooks: function() {
    hooks.test();
    hooks.e2e();
  },
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:deleteCoverages',
      'shell:bower',
      'jshint',
      'ngtemplates:dist',
      'karma:watch',
      'shell:updateWebdriver',
      'connect:test',
      'protractor_webdriver',
      'shell:triggerTests',

      'watch:andTestBoth',
      'watch:andTestUnit',
      'watch:andTestE2e',

      'shell:deleteCoverages',
      'shell:deleteInstrumented',
      'instrument',
      'protractor_coverage:tdd',
      'makeReport'
    ]));
    grunt.registerTask(
      'tdd',
      availableTasks.tdd.desc,
      function(suite) {
        var tasks = ['tdd:before', 'shell:bower'];

        var watcher = '';
        if (!suite || suite === 'unit') {
          tasks.push('tdd:unit:before', 'karma:watch:start');
          watcher = 'watch:andTestUnit';
        }

        if (!suite || suite === 'e2e') {
          tasks.push(
            'tdd:e2e:before',
            'shell:updateWebdriver',
            'connect:test',
            'protractor_webdriver'
          );
          watcher = 'watch:andTestE2e';
        }
        if (!suite) {
          watcher = 'watch:andTestBoth';
        }
        if (!suite || suite === 'unit') {
          tasks.push('shell:triggerTests');
        }

        tasks.push(watcher);
        grunt.task.run(tasks);
      }
    );
  }
};

availableTasks.coverage = {
  desc: [
    'serve coverage report',
    'requires `grunt test` to have been run once',
    '  options:',
    '    --port  (default: 7000)',
    '  Environment Variables:',
    '    COVERAGE_PORT  (default: 7000)'
  ].join('\n'),
  hooks: hooks.coverage,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'connect:coverage'
    ]));
    grunt.registerTask('coverage', availableTasks.coverage.desc, [
      'coverage:before',
      'connect:coverage'
    ]);
  }
};

availableTasks.build = {
  desc: [
    'Concatenate, annotate and minify JavaScript and less files'
  ].join('\n'),
  hooks: hooks.build,
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:bower',
      'ngtemplates:dist',
      'less:dist',
      'less:distmin',
      'concat:dist',
      'ngAnnotate:dist',
      'uglify:dist'
    ]));
    grunt.registerTask(
      'build',
      availableTasks.build.desc,
      [
        'build:before',
        'shell:bower',
        'ngtemplates:dist',
        'less:dist',
        'less:distmin',
        'concat:dist',
        'ngAnnotate:dist',
        'uglify:dist',
        'build:after'
      ]
    );
  }
};

availableTasks.release = {
  desc: [
    'Run tests,',
    '(if successful) bump version build project,',
    'commit changes and push to origin.',
    '  options:',
    '    <see test>',
    '  Environment Variables:',
    '    <see test>'
  ].join('\n'),
  hooks: function() {
    hooks.release();
    hooks.test();
    hooks.build();
  },
  task: function() {
    grunt.config.merge(helpers.getTaskConfig([
      'shell:deleteCoverages',
      'shell:bower',
      'jshint',
      'ngtemplates:dist',
      'karma:all',
      'shell:updateWebdriver',
      'shell:deleteInstrumented',
      'instrument',
      'makeReport',
      'connect:test',
      'protractor_coverage:single',
      'npm-contributors',
      'bump',
      'less:dist',
      'less:distmin',
      'concat:dist',
      'ngAnnotate:dist',
      'uglify:dist'
    ]));
    grunt.registerTask('release', availableTasks.release.desc, function(type) {
      grunt.task.run([
        'release:before',
        'test',
        'npm-contributors',
        'bump-only:' + (type || 'patch'),
        'build',
        'bump-commit',
        'release:after'
      ]);
    });
  }
};


module.exports = {
  addTasks: function(tasksToAdd) {
    if (typeof tasksToAdd === 'undefined') {
      tasksToAdd = Object.keys(availableTasks);
    }

    grunt.registerTask(
      '_normalizeUnitCoverage',
      'helper for coverage reports *',
      helpers.normalizeCoverageTask
    );

    tasksToAdd.forEach(function(task) {
      if (availableTasks[task]) {
        availableTasks[task].hooks();
      } else {
        grunt.log.error('undefined task "' + task + '" in grunt-angular-toolbox');
      }
    });

    tasksToAdd.forEach(function(task) {
      if (availableTasks[task]) {
        availableTasks[task].task();
      }
    });

  }
};
