module.exports = {
  dist: {
    options: {
      singleQuotes: true
    },
    src: '<%= concat.dist.dest %>',
    dest: '<%= concat.dist.dest %>'
  }
};
