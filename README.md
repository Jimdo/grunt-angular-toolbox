peons-angular
=============

_A mob of little green minions to help you with daily angular work_

Or: An opinionated, preconfigured and extendible selection of super awesome grunt tasks


Install
-------

```sh
npm install peons-angular --save-dev
```

and once:

```sh
npm install -g peons-cli
```


Tasks
-----

### `peons test[:(unit|e2e)]` - default

Run both or the specified test suite.

__Environment Variables__:  
 - `E2E_SANDBOX_PORT` change port (default: 8765)
 - `KARMA_BROWSERS` overwrite browsers for unit tests (default: PhantomJs,Chrome,Firefox)
 - `KARMA_REPORTERS` overwrite reporters for unit tests (default: progress)
 - `PROTRACTOR_BROWSERS` overwrite browsers for unit tests (default: Chrome)
 - `PROTRACTOR_REPORTERS` overwrite reporters for unit tests (default: dots)

__Options__:  
 - `--browsers` change browsers for current suite(s)
 - `--reporters` change reporters for current suite(s)

### `peons tdd[:(unit|e2e)]`
Start watchers on src and test files and run specified suites on every file change.

Same __Environment Variables__ and __Options__ as the test task.

### `peons demo[:e2e]`
Serve the demo or e2e sandbox.

__Environment Variables__:  
 - `DEMO_PORT` change port (default: 8000)
 - `E2E_SANDBOX_PORT` change port (default: 8765)

__Options__:  
 - `--port` change port of current task

### `peons coverage`
Serve coverage report, requires `peons test:unit` to have been run once.

Right now we only support coverage of unit tests

__Environment Variables__:  
 - `COVERAGE_PORT` change port (default: 7000)

__Options__:  
 - `--port` change port

### `peons build`
Concatenate, annotate and minify JavaScript and less files

### `peons release`
Run tests, (if successful) bump version build project, commit changes and push to origin


Assumed project structure
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
 └ peonsfile.js|coffee
```


Peonsfile
---------

Can be js or coffe, has to be in your project root.

If you do not want to add custom tasks, use hooks or change config
this file is still needed in order to find the root of your project.

```js
// peonsfile.js

// register custom tasks or hooks here see hooks
var peons = function(grunt) {};

// customize project structure, see config
peons.config = {};

module.exports = peons;
```


Config
------

Values are defaults or explanations. 

```js
// peonsfile.js
var peons = function(grunt) {};

peons.config = {
  // whether or not the author in package.json should be set to the
  // contributor with the most commits
  dynamicAuthor: false,
  
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
    vendor: {
      js: [],
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
  jshintrc: '.jshintrc of your project or default from peons-angular',

  // how much commits make a maintainer?
  maintainersThreshold: 15,

  // the angular module name in case it differs from project name 
  moduleName: '"name" from package.json',

  // banners an wraps for generated dist files (can be paths or strings)
  templates: {
    banner: 'see lib/templates',
    bannerMin: 'see lib/templates',
    wrapTop: '(function(angular, undefined) {\n\  'use strict\';\n',
    wrapBottom: '\n})(window.angular);',
  }
}

module.exports = peons;
```


Custom tasks and hooks
----------------------

In case your project needs custom tasks and or setup before tasks done by peons
you can register them here. It's all just grunt.

```js
// peonsfile.js

var peons = function(grunt) {
  // add any custom tasks (peons sayYolo is now available)
  grunt.registerTask('sayYolo', function() {
    console.log('YOLO!');
  });

  // hook it into existing ones.
  grunt.registerTask('release:before', ['sayYolo']);
};

module.exports = peons;
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
