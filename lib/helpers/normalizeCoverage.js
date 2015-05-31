module.exports = function normalizeCoverageFactory(grunt, glob, fs, path) {
  'use strict';

  return function() {
    var done = this.async();
    var coverageFileGlob = path.join(
      grunt.config('angularToolbox._.folder.coverage'),
      'unit/**/*.json'
    );

    /* sometimes karma takes a little time to write the report */
    setTimeout(function() {
      glob(coverageFileGlob, function(err, coverageFiles) {
        if (err) {
          done(err);
          return;
        }

        coverageFiles.forEach(function(coverageFile) {
          var normalizedCoverage = {};
          var coverage = require(coverageFile);
          var srcFile;

          for (srcFile in coverage) {
            if (coverage[srcFile]) {
              var key = srcFile.replace('./src/js', 'src/js');
              normalizedCoverage[key] = coverage[srcFile];
            }
          }

          fs.writeFileSync(coverageFile, JSON.stringify(normalizedCoverage));
        });

        done();
      });

    }, 100);
  };
};
