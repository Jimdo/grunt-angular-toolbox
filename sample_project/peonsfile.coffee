peons = (grunt) ->
  grunt.registerTask 'hase', ->
    console.log 'igel'

peons.config = {
  files: {
    src: {
      js: [
        'src/js/helper.module.js',
        'src/js/!(helper)*.js'
      ],
      less: [
        'src/less/**/*.less'
      ],
      partialsFolder: 'src/partials/'
    },
    test: {
      unit: [
        'test/unit/SpecHelper.+(js|coffee)',
        'test/unit/**/*Spec.+(js|coffee)'
      ],
      e2e: [
        'test/e2e/SpecHelper.+(js|coffee)',
        'test/e2e/**/*Spec.+(js|coffee)'
      ]
    },
    demoEnvFolder: 'demo/',
    e2eEnvFolder: 'test/e2e/env/',
    distFolder: 'dist/'
  }
}

module.exports = peons;