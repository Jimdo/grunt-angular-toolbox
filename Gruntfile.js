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
      test: {
        command: 'cd sample_project && grunt test'
      }
    }
  });

  /* Load grunt tasks from NPM packages */
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['shell:test']);

  grunt.registerTask('release', 'Build, bump and publish to NPM.', function(type) {
    grunt.task.run([
      'test',
      'bump:' + (type || 'patch'),
      'npm-publish'
    ]);
  });
};
