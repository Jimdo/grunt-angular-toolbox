module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        updateConfigs: ['pkg'],
        commitFiles: ['package.json', 'bower.json'],
        commitMessage: 'release v%VERSION%',
        pushTo: 'origin'
      }
    },
    'npm-publish': {
      options: {
        abortIfDirty: true,
        tag: 'latest'
      }
    },
    shell: {
      testpeons: {
        command: 'node ./bin/peons test --reporter=spec && node ./bin/peons build'
      }
    }
  });

  /* Load grunt tasks from NPM packages */
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['shell:testpeons']);

  grunt.registerTask('release', 'Build, bump and publish to NPM.', function(type) {
    grunt.task.run([
      'test',
      'bump:' + (type || 'patch'),
      'npm-publish'
    ]);
  });
};
