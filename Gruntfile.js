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
        command: 'node ./bin/peons test && node ./bin/peons build'
      }
    }
  });

  /* Load grunt tasks from NPM packages */
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('release', 'Build, bump and publish to NPM.', function(type) {
    grunt.task.run([
      'shell:testpeons',
      'bump:' + (type || 'patch'),
      'npm-publish'
    ]);
  });
};
