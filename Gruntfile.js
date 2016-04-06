module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        ,compress: true
        ,mangle: true
        // ,sourceMap: true
      },
      all: {
            files: [{
                expand: true,
                cwd: './dist',
                src: ['*.js', '!*.min.js', '!Gruntfile.js'],
                dest: './dist',
                ext: '.min.js'
            }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
};