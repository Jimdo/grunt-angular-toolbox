grunt-angular-toolbox
=====================

# DEPRECATED + NOT MAINTAINED ANYMORE

you might want to just use npm scripts or check the state
of [gulp-toolbox](https://github.com/search?utf8=✓&q=gulp+toolbox+user%3AXiphe)
which is the mental follow-up to this project.


[![Build Status](https://travis-ci.org/Jimdo/grunt-angular-toolbox.svg?branch=master)](https://travis-ci.org/Jimdo/grunt-angular-toolbox)
[![Dependency Status](https://david-dm.org/Jimdo/grunt-angular-toolbox.svg)](https://david-dm.org/Jimdo/grunt-angular-toolbox)

Collection of grunt tasks and opinionated configuration
for development of small and mid-sized angular modules.

Compared to other tooling collections like [angular-seed](https://github.com/angular/angular-seed) and [yeoman angular generator](https://github.com/yeoman/generator-angular), this project aims to produce [bower](http://bower.io/) packages consumable by other angular apps.

Examples:
 - [angular-fontselect](https://github.com/Jimdo/angular-fontselect)
 - [angular-kachelei](https://github.com/Xiphe/angular-kachelei)


[Changelog](https://github.com/Jimdo/grunt-angular-toolbox/blob/master/CHANGELOG.md)
------------------------------------------------------------------------------------

Getting Started
---------------

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, you probably don't want to use this
but build your own tooling.

```sh
npm install grunt grunt-cli --save-dev
npm install grunt-angular-toolbox --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-toolbox');
```

Use
---

```js
// Gruntfile.js
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    angularToolbox: { /* see config */ }
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

Depending on the tasks added by [angularToolbox.tasks](#Config) these grunts are available
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
 - `USE_SAUCELABS` weather or not to run e2e tests on saucelabs (default: true)
 - `PROTRACTOR_BROWSERS` overwrite browsers for unit tests (default: Chrome)

__Options__:  
 - `--browsers` change browsers for current suite(s)
 - `--reporters` change reporters for current suite(s)
 - `--no-coverage` disable coverage reports and instrumentation (useful for debugging)
 - `--no-jshint` disable jshint (useful for debugging)
 - `--no-saucelabs` disable saucelabs

### $ `grunt demo[:e2e]`
Serve demo or e2e standbox application

__Environment Variables__:  
 - `DEMO_PORT` change port (default: 8000)
 - `E2E_SANDBOX_PORT` change port (default: 8765)
 - `LIVERELOAD_PORT` change livereload port (default: 35729)

__Options__:  
 - `--port` change port of current task
 - `--livereload-port` change livereload port

### $ `grunt coverage`
Serve coverage report, requires `grunt test:unit` to have been run once.

__Environment Variables__:  
 - `COVERAGE_PORT` change port (default: 7000)
 - `LIVERELOAD_PORT` change livereload port (default: 35729)

__Options__:  
 - `--port` change port
 - `--livereload-port` change livereload port

### $ `grunt build[:watch]`
Concatenate, annotate and minify JavaScript and less/sass files
Optionally watch the `src` files and rebuild on change

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
 │ ├ partials/
 │ │ └ *.html (views for directives)
 │ └ sass/
 │   └ *.scss (project related sass files)
 ├ test/
 │ ├ e2e/
 │ │ ├ env/
 │ │ │ └ index.html
 │ │ ├ SpecHelper.js|coffee (test setup stuff)
 │ │ └ *Spec.js|coffee (end to end test files)
 │ └ unit/
 │   └ *.js|coffee (test setup stuff)
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
    'angularToolbox': {
        /* specify the preconfigured tasks that 
         should be used in the project */
      tasks: [
        'build',
        'coverage',
        'demo',
        'demo:e2e',
        'release',
        'test'
      ],
      
      // whether or not the author in package.json should be set to the
      // contributor with the most commits
      dynamicAuthor: false,
      
      // customize the demo/test environment files
      envFilter: function(env) { return env; },

      // customize project structure
      files: {
        bower: 'bower.json',
        pkg: 'package.json',
        src: {
          js: [
            'src/js/**/helper*.js',
            'src/js/**/!(helper)*.js'
          ],
          less: [
            'src/less/**/!(_)*.less'
          ],
          sass: [
            'src/sass/**/!(_)*.scss'
          ]
        },
        test: {
          unit: [
            'test/unit/**/*.+(js|coffee)'
          ],
          e2e: [
            'test/e2e/SpecHelper.+(js|coffee)',
            'test/e2e/**/*Spec.+(js|coffee)'
          ]
        },
        styleCheck: [] // run through jshint and jscs
      },

      folder: {
        dist: 'dist/',
        demo: 'demo/',
        partials: 'src/partials/',
        e2eSandbox: 'test/e2e/env/',
        src: {
          js: 'src/js/',
          sass: 'src/sass/',
          less: 'src/less/',
        }
      },

      // how much commits make a maintainer?
      maintainersThreshold: 15,

      // custom middleware for e2e and demo
      // can be function or array of functions
      customMiddleware: false,

      // the angular module name in case it differs from project name 
      moduleName: 'camelCased "name" from package.json',

      // banners an wraps for generated dist files
      // see https://github.com/Jimdo/grunt-angular-toolbox/tree/master/lib/templates
      template: {
        banner: '/* ... */',
        bannerMin: '/* ... */',
        wrapTop: '/* ... */',
        wrapBottom: '/* ... *'
      },

      // disable coverage reports
      coverage: true,

      // disable jshint
      jshint: true,

      // default port for demo
      demoPort: 8000,

      // default port for coverage
      coveragePort: 7000,

      // default port for e2e
      e2eSandboxPort: 8765,

      // default browsers for karma
      unitBrowsers: ['Chrome', 'Firefox', 'PhantomJS'],

      // default browsers for protractor
      e2eBrowsers: ['Chrome'],

      // default reporters for karma
      unitReporters: ['progress'],

      // default reporter for protractor
      e2eReporter: 'spec'

      // default browsers for autoprefixer
      autoprefixerBrowsers: [
        'last 5 version',
        '> 1%',
        'ie 8'
      ],

      // execute e2e test on soucelabs if credentials are present
      saucelabs: true,

      hooks: {
        // manipulate e2e capabilities
        e2eCapabilities: function(caps) { return caps; }
      }
    }

    /* additional configuration ... */
  });

  /* rest of gruntfile ... */
};
```

Saucelabs
---------

e2e tests are being executed on saucelabs, given 
`SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` are available as environment variables

a tunnel to saucelabs needs to be available for this

see 
 - https://docs.saucelabs.com/reference/sauce-connect/
 - http://docs.travis-ci.com/user/sauce-connect/


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
 - runtest:before
 - runtest:unit:before
 - runtest:e2e:before
 - runtest:after
 - runtest:unit:after
 - runtest:e2e:after
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
 - [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
 - [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
 - [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)
 - [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
 - [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
 - [grunt-injector](https://github.com/klei/grunt-injector)
 - [grunt-istanbul](https://github.com/taichi/grunt-istanbul)
 - [grunt-karma](https://github.com/karma-runner/grunt-karma)
 - [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)
 - [grunt-protractor-coverage](https://github.com/r3b/grunt-protractor-coverage)
 - [grunt-protractor-webdriver](https://github.com/seckardt/grunt-protractor-webdriver)
 - [grunt-sass](https://github.com/sindresorhus/grunt-sass)
 - [grunt-shell](https://github.com/sindresorhus/grunt-shell)
 - [grunt-update-contributors](https://github.com/Xiphe/grunt-update-contributors)
 - [grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep)


DEPENDENCIES
-------

 * [Java](https://support.apple.com/kb/DL1572?viewlocale=en_US&locale=en_US)
 * Node & Npm
 
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
