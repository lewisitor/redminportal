/*!
 * RedminPortal's Gruntfile
 * https://github.com/redooor/redminportal
 * Copyright 2013-2015 Redooor LLP
 * Licensed under MIT
 */

module.exports = function (grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    var configBridge = grunt.file.readJSON('./bower_components/bootstrap/grunt/configBridge.json', {
        encoding: 'utf8'
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        builddir: '.',
        buildtheme: '',
        banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Homepage: <%= pkg.homepage %>\n' +
            ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            '*/\n',
        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'src/public/css/<%= pkg.name %>.css.map'
                },
                src: 'src/resources/assets/less/redminportal.less',
                dest: 'src/public/css/<%= pkg.name %>.css'
            },
            tinymce: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'redmin-tinymce.css.map',
                    sourceMapFilename: 'src/public/css/redmin-tinymce.css.map'
                },
                src: 'src/resources/assets/less/redmin-tinymce.less',
                dest: 'src/public/css/redmin-tinymce.css'
            }
        },
        autoprefixer: {
            options: {
                browsers: configBridge.config.autoprefixerBrowsers
            },
            core: {
                options: {
                    map: true
                },
                src: 'src/public/css/<%= pkg.name %>.css'
            }
        },
        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                noAdvanced: true
            },
            minifyCore: {
                src: 'src/public/css/<%= pkg.name %>.css',
                dest: 'src/public/css/<%= pkg.name %>.min.css'
            },
            minifyTinymce: {
                src: 'src/public/css/redmin-tinymce.css',
                dest: 'src/public/css/redmin-tinymce.min.css'
            }
        },
        uglify: {
            bootstrap_tagsinput: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'src/public/js/bootstrap-tagsinput.js.map'
                },
                files: {
                    'src/public/js/bootstrap-tagsinput.min.js': ['src/resources/assets/js/bootstrap-tagsinput.js']
                }
            }
        },
        usebanner: {
            options: {
                position: 'top',
                banner: '<%= banner %>'
            },
            files: {
                src: 'src/public/css/<%= pkg.name %>.css'
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: 'bower_components/bootstrap/fonts/',
                src: '**',
                dest: 'src/public/fonts/',
                flatten: true,
                filter: 'isFile'
            },
            jquery: {
                expand: true,
                cwd: 'bower_components/jquery/dist/',
                src: '**',
                dest: 'src/public/js/jquery/',
                flatten: true,
                filter: 'isFile'
            },
            bootstrapjs: {
                src: 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                dest: 'src/public/js/bootstrap.min.js'
            },
            bootstrapcss: {
                src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
                dest: 'src/public/css/bootstrap.min.css'
            },
            jqueryui: {
                expand: true,
                cwd: 'bower_components/jquery-ui/themes/blitzer/',
                src: '**',
                dest: 'src/public/css/jquery-ui/themes/blitzer/'
            },
            jqueryuijs: {
                src: 'bower_components/jquery-ui/jquery-ui.min.js',
                dest: 'src/public/js/jquery-ui/jquery-ui.min.js'
            },
            momentjs: {
                src: 'bower_components/moment/min/moment.min.js',
                dest: 'src/public/js/moment/moment.min.js'
            },
            datetimepickerjs: {
                src: 'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                dest: 'src/public/js/datetimepicker/bootstrap-datetimepicker.min.js'
            },
            datetimepickercss: {
                src: 'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                dest: 'src/public/css/datetimepicker/bootstrap-datetimepicker.min.css'
            },
            redmaterialsjs: {
                src: 'bower_components/redmaterials/dist/js/redmaterials.min.js',
                dest: 'src/public/js/redmaterials.min.js'
            },
            redmaterialscss: {
                src: 'bower_components/redmaterials/dist/css/redmaterials.min.css',
                dest: 'src/public/css/redmaterials.min.css'
            },
            fontawesomefonts: {
                expand: true,
                cwd: 'bower_components/font-awesome/fonts/',
                src: '**',
                dest: 'src/public/fonts/',
                flatten: true,
                filter: 'isFile'
            },
            fontawesomecss: {
                src: 'bower_components/font-awesome/css/font-awesome.min.css',
                dest: 'src/public/css/font-awesome.min.css'
            },
            typeaheadjs: {
                src: 'bower_components/typeahead.js/dist/typeahead.bundle.min.js',
                dest: 'src/public/js/typeahead.bundle.min.js'
            }
        },
        watch: {
            files: ['src/resources/assets/less/**/*.less'],
            tasks: 'default',
            options: {
                livereload: true,
                nospawn: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: '.'
                }
            }
        },
        exec: {
            publish_public: 'php ../../../artisan vendor:publish --provider="Redooor\\Redminportal\\RedminportalServiceProvider" --tag="public" --force'
        }
    });

    grunt.registerTask('none', function () {});
    
    // Copy Bootstrap less, compile and minify
    grunt.registerTask('less-compile', ['less', 'autoprefixer:core', 'usebanner', 'cssmin']);
    
    // Distribute all assets to public folder
    grunt.registerTask('dist-assets', ['copy', 'uglify']);
    
    // Publish to public
    grunt.registerTask('publish-assets', ['exec:publish_public']);
    
    // Default task, compile and distribute all assets to public folder
    grunt.registerTask('default', ['less-compile', 'dist-assets', 'publish-assets']);
};