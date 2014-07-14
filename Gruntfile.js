/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['js/app/**/*.js']
      }
    },
    blanket_qunit: {
      all: {
        options: {
          urls: ['test/spec.html?coverage=true&gruntReport'],
          threshold: 70
        }
      }
    },
    plato: {
      main: {
        files: {
          'reports': ['js/app/**/*.js']
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-blanket-qunit');

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['jshint', 'blanket_qunit']);

};
