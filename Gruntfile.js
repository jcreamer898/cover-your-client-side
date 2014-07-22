/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            options: {
                jshintrc: true
            },
            all: {
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
            qunit: {
                files: ['test/*.js', 'js/app/**/*.js'],
                tasks: ['jshint', 'blanket_qunit']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-blanket-qunit');

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['blanket_qunit']);
};