/*jslint node: true*/
/*jslint nomen: true*/

/* Grunt File
 *
 * To Do:
 *   - Combine JS
 *   - Minify JS
 *   - Compile SASS (compass)
 *   - Minify CSS
 *   - HTML Minify
 *   - Copy other assets (images, fonts, etc)
 */

module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            production: {
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'public/index.html' // 'destination': 'source'
                }
            },
            dev: { // Another target
                files: {
                    'dist/index.html': 'public/index.html' // 'destination': 'source'
                }
            }
        },
        compass: {
            dev: { // Another target
                options: {
                    sassDir: 'public/sass',
                    cssDir: 'dist/css'
                }
            }
        },
        watch: {
            src: {
                files: ['lib/**/*.js',
                        'public/js/*.js',
                        'public/sass/*.scss',
                       'public/**/*.html'],
                tasks: ['htmlmin:dev', 'compass', 'uglify:dev']
            }
        },
        concurrent: {
            dev: {
                tasks: ['watch', 'serve', 'uglify:dev'],
                options: {
                    logConcurrentOutput: true
                }
            },
            production: {
                tasks: ['watch', 'serve', 'uglify:production'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        uglify: {
            dev: {
                options: {
                    beautify: true,
                    mangle: false
                },
                files: {
                    'dist/js/library.js': ['public/bower_components/jquery/dist/jquery.js',
                                       'public/bower_components/bootstrap/dist/js/bootstrap.js'],
                    'dist/js/main.js': ['public/js/main.js']
                }
            },
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'dist/js/library.js': ['public/bower_components/jquery/dist/jquery.js',
                                       'public/bower_components/bootstrap/dist/js/bootstrap.js'],
                    'dist/js/main.js': ['public/js/main.js']
                }
            }
        },
        concat: {
            all: {
                src: ['public/bower_components/bootstrap/dist/css/bootstrap.css'],
                dest: 'dist/css/library.css'
            }
        }
    });

    grunt.registerTask('serve', "Start application", function () {
        this.async();
        var app = require('./lib');

        app.start();
    });

    /* tasks */
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    /* register commands */
    grunt.registerTask('default', ['htmlmin:dev', 'compass', 'concat', 'concurrent:dev']);
    grunt.registerTask('prod', ['htmlmin:production', 'compass', 'concat', 'concurrent:production']);
    grunt.registerTask('deploy', ['htmlmin:production', 'compass', 'concat', 'uglify:production']);
};