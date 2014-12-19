var helpers = require('../helpers');
var config = {};

var maintainersThreshold = helpers.getProjectConfig('maintainersThreshold', 15);
var dynamicAuthor = helpers.getProjectConfig('dynamicAuthor', false);

if (helpers.hasBower()) {
  config.bower = {
    file: helpers.getFolder('project', 'bower.json'),
    commitMessage: 'update bower authors',
    filter: false,
    as: 'authors'
  };
}

config.contributors = {
  options: {
    commit: false,
    filter: function(contributors) {
      var filteredContributors = contributors.filter(function(contributor) {
        return contributor.commitCount < maintainersThreshold;
      });

      if (dynamicAuthor && filteredContributors.length === contributors.length) {
        filteredContributors.shift();
      }

      return filteredContributors;
    }
  }
};

config.maintainers = {
  options: {
    commit: !dynamicAuthor,
    filter: function(contributors) {
      var filteredContributors = contributors.filter(function(contributor) {
        return contributor.commitCount >= maintainersThreshold;
      });

      if (dynamicAuthor && filteredContributors.length) {
        filteredContributors.shift();
      }

      return filteredContributors;
    },
    as: 'maintainers'
  }
};

if (dynamicAuthor) {
  config.author = {
    options: {
      commit: true,
      filter: function(contributors) {
        return contributors[0].name;
      },
      as: 'author'
    }
  };
}

module.exports = config;
