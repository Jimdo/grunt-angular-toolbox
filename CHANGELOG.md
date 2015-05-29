Changelog
=========



1.0.0
-----

Rework everything in order to use [grunt-thrall](https://github.com/Xiphe/Thrall)
Feature-Set is mostly the same.

### Breaking Changes

 - ### removed included bower components
   In order to NOT tie actual dependencies to the tooling,
   toolbox does not include angular bower components anymore.

   __Migration:__
   - add a `bower.json` to the project root.
   - call `bower install angular --save && bower install angular-mocks jasmine-moar-matchers --save-dev`
 
 - ### `tdd` task removed
   In order to keep the test definition D.R.Y.

   __Migration:__
   - use `grunt test --watch` instead

 - ### configuration api has been changed massively
   
   - key is now `angularToolbox` instead of `angular-toolbox`
   - see [config](https://github.com/Jimdo/grunt-angular-toolbox#config) for details

 - ## grunt coveralls removed
   in order to not be fixed on one specific "coverage badge provider"

   __Migration:__

   `npm install grunt-coveralls --save-dev`

   ```js
   // Gruntfile.js
   grunt.initConfig({
     /* ... */
     coveralls: {
     	src: '<%= angularToolbox.folder.coverageReport %>/lcov.info')
     }
   });
   ```
 - ### jshintrc option removed
   in order to encourage use of `.jshintrc` files

   __Migration:__

    - use `.jshintrc` files


 - ### envFilter removed
   need a new concept here

 - ### default moduleName value (from package.json) will now be camelCased
   in order to need less configuration

   package `grunt-angular-toolbox-sample` will now use `gruntAngularToolboxSample` 
   as module for ngTemplates

   __Migration:__

    when you previously didn't had to set moduleName in config,
    you probably need to do so now.

    ```js
    // Gruntfile.js
    grunt.initConfig({
      /* ... */
      angularToolbox: {
      	moduleName: 'my-module'
      }
    });
    ```
 - ### same middleware for demo and e2e-env
    in order to have the same behaviour for both environments

    __Migration:__

    - none
