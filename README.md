grunt-angular-toolbox
=====================

[![Build Status](https://travis-ci.org/Jimdo/grunt-angular-toolbox.svg)](https://travis-ci.org/Jimdo/grunt-angular-toolbox)
[![Dependency Status](https://david-dm.org/Jimdo/grunt-angular-toolbox.svg)](https://david-dm.org/Jimdo/grunt-angular-toolbox)

Collection of grunt tasks and optional opinionated configuration
for development of small and mid-sized angular modules.

Like:
 - [angular-fontselect](https://github.com/Jimdo/angular-fontselect)


Install
-------

```sh
npm install grunt-angular-toolbox --save-dev
```

Use
---

```js
// Gruntfile.js
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'angular-toolbox': { /* see config */ }
    /* project specific configuration here */
  });

  /* load angular-toolbox collection 
     see Included 3rd party tasks */
  grunt.loadNpmTasks('grunt-angular-toolbox');

  /* custom tasks and hooks */
  grunt.registerTask('default', ['test']);
  grunt.registerTask('build:after', function() {
    grunt.log.ok('work complete!');
  });
};
```


Tasks
-----

Depending on the tasks added by [addTasks](#use) these grunts are available
in the project.

```sh
#see this list by using
grunt --help
``` 

### $ `grunt test[:(unit|e2e)]`

Run the tests.

__Environment Variables__:  
 - `E2E_SANDBOX_PORT` change port (default: 8765)
 - `KARMA_BROWSERS` overwrite browsers for unit tests (default: PhantomJs,Chrome,Firefox)
 - `KARMA_REPORTERS` overwrite reporters for unit tests (default: progress)
 - `PROTRACTOR_BROWSERS` overwrite browsers for unit tests (default: Chrome)
 - `PROTRACTOR_REPORTERS` overwrite reporters for unit tests (default: dots)

__Options__:  
 - `--browsers` change browsers for current suite(s)
 - `--reporters` change reporters for current suite(s)
 - `--no-coverage` disable coverage reports and instrumentation (useful for debugging)
 - `--no-jshint` disable jshint (useful for debugging)

### $ `grunt tdd[:(unit|e2e)]`
Run the tests and rerun on src changes

Same __Environment Variables__ and __Options__ as the test task.

### $ `grunt demo[:e2e]`
Serve demo or e2e standbox application

__Environment Variables__:  
 - `DEMO_PORT` change port (default: 8000)
 - `E2E_SANDBOX_PORT` change port (default: 8765)

__Options__:  
 - `--port` change port of current task

### $ `grunt coverage`
Serve coverage report, requires `grunt test:unit` to have been run once.

__Environment Variables__:  
 - `COVERAGE_PORT` change port (default: 7000)

__Options__:  
 - `--port` change port

### $ `grunt coveralls`
Send coverage report to coveralls, requires `grunt test:unit` to have been run once.

### $ `grunt build`
Concatenate, annotate and minify JavaScript and less files

### $ `grunt release`
Run tests, (if successful) bump version build project, commit changes and push to origin


Default project structure
-------------------------

```
 ┌ demo/
 │ └ index.html
 ├ dist/
 ├ src/
 │ ├ js/
 │ │ ├ *.js (project related js files)
 │ │ └ helper.module.js (initiator of angular module)
 │ ├ less/
 │ │ └ *.less (project related less files)
 │ └ partials/
 │   └ *.html (views for directives)
 ├ test/
 │ ├ e2e/
 │ │ ├ env/
 │ │ │ └ index.html
 │ │ ├ SpecHelper.js|coffee (test setup stuff)
 │ │ └ *Spec.js|coffee (end to end test files)
 │ └ unit/
 │   ├ SpecHelper.js|coffee (test setup stuff)
 │   └ *Spec.js|coffee (unit test files)
 ├ .jshintrc (optional)
 ├ bower.json (optional)
 ├ package.json
 └ Gruntfile.js|coffee
```

This is customizable via the [config](#config)


Config
------

Values are defaults or explanations. 

```js
// Gruntfile.js
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    'angular-toolbox': {
        /* specify the preconfigured tasks that 
         should be used in the project */
      tasks: [
        'build',
        'coverage',
        'coveralls',
        'demo',
        'demo:e2e',
        'release',
        'tdd',
        'test'
      ],
      
      // whether or not the author in package.json should be set to the
      // contributor with the most commits
      dynamicAuthor: false,
      
      // customize the demo/test environment files
      envFilter: function(env) { return env; },

      // customize project structure
      files: {
        src: {
          js: [
            'src/js/helper.module.js',
            'src/js/**/!(helper)*.js'
          ],
          less: [
            'src/less/**/*.less'
          ],
          partialsFolder: 'src/partials/'
        },
        // additional vendor files for tests and demos that 
        // won't be shipped within dist
        vendor: {
          js: {
            top: [],
            angularModules: [],
            bottom: []
          },
          css: [],
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
      },

      // custom path for your jshintrc
      jshintrc: '.jshintrc',

      // how much commits make a maintainer?
      maintainersThreshold: 15,

      // the angular module name in case it differs from project name 
      moduleName: '"name" from package.json',

      // banners an wraps for generated dist files (can be paths or strings)
      templates: {
        banner: 'lib/templates/banner.tpl',
        bannerMin: 'lib/templates/bannerMin.tpl',
        wrapTop: 'lib/templates/wrapTop.tpl',
        wrapBottom: 'lib/templates/wrapBottom.tpl'
      }
    }

    /* additional configuration ... */
  });

  /* rest of gruntfile ... */
};
```


Custom tasks and hooks
----------------------

Register custom tasks and or setup before the added tasks run.

```js
// Gruntfile.js
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({ /* ... */ });

  /* initiation of tasks ... */

  /* add any custom tasks */
  grunt.registerTask('sayYolo', function() {
    console.log('YOLO!');
  });

  /* hook it into tooling tasks ones.
     this will be called before all other release tasks */
  grunt.registerTask('release:before', ['sayYolo']);
};
```

### Hooks

 - test:before
 - test:unit:before
 - test:e2e:before
 - test:after
 - test:unit:after
 - test:e2e:after
 - tdd:before
 - tdd:unit:before
 - tdd:e2e:before
 - demo:before
 - demo:e2e:before
 - coverage:before
 - build:before
 - build:after
 - release:before
 - release:after


Included 3rd party tasks
------------------------

 - [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates)
 - [grunt-bump](https://github.com/vojtajina/grunt-bump)
 - [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent)
 - [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
 - [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
 - [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
 - [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
 - [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
 - [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
 - [grunt-coveralls](https://github.com/pimterry/grunt-coveralls)
 - [grunt-istanbul](https://github.com/taichi/grunt-istanbul)
 - [grunt-karma](https://github.com/karma-runner/grunt-karma)
 - [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)
 - [grunt-npm](https://github.com/Xiphe/grunt-npm/)
 - [grunt-protractor-coverage](https://github.com/r3b/grunt-protractor-coverage)
 - [grunt-protractor-webdriver](https://github.com/seckardt/grunt-protractor-webdriver)
 - [grunt-shell](https://github.com/sindresorhus/grunt-shell)


LICENSE
-------

> The MIT License
> 
> Copyright (c) 2014 Jimdo GmbH http://jimdo.com
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
