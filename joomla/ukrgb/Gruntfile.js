module.exports = function(grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	// Project configuration.
	grunt
			.initConfig({
				// Metadata.
				pkg : grunt.file.readJSON('package.json'),
				banner : '/*!\n'
						+ ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n'
						+ ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n'
						+ ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n'
						+ ' */\n',
				// NOTE: This jqueryCheck code is duplicated in customizer.js;
				// if making changes here, be sure to update the other copy too.
				jqueryCheck : 'if (typeof jQuery === \'undefined\') { throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\') }\n\n',

				// Task configuration.
				clean : {
					dist : [ 'fonts','js/bootstrap*.js','css/bootstrap*.css' ]
				},

				concat : {
					options : {
						banner : '<%= banner %>\n<%= jqueryCheck %>',
						stripBanners : false
					},
					bootstrap : {
						src : [ '../vendor/twbs/bootstrap/js/transition.js',
								'../vendor/twbs/bootstrap/js/alert.js',
								'../vendor/twbs/bootstrap/js/button.js',
								'../vendor/twbs/bootstrap/js/carousel.js',
								'../vendor/twbs/bootstrap/js/collapse.js',
								'../vendor/twbs/bootstrap/js/dropdown.js',
								'../vendor/twbs/bootstrap/js/modal.js',
								'../vendor/twbs/bootstrap/js/tooltip.js',
								'../vendor/twbs/bootstrap/js/popover.js',
								'../vendor/twbs/bootstrap/js/scrollspy.js',
								'../vendor/twbs/bootstrap/js/tab.js',
								'../vendor/twbs/bootstrap/js/affix.js' ],
						dest : 'js/<%= pkg.name %>.js'
					}
				},

				uglify : {
					options : {
						preserveComments : 'some'

					},
					bootstrap : {
						src : '<%= concat.bootstrap.dest %>',
						dest : 'js/<%= pkg.name %>.min.js'
					}
				},

				less : {
					compileCore : {
						options : {
							strictMath : true,
							sourceMap : true,
							outputSourceFiles : true,
							sourceMapURL : '<%= pkg.name %>.css.map',
							sourceMapFilename : 'css/<%= pkg.name %>.css.map'
						},
						files : {
							'css/<%= pkg.name %>.css' : 'less/bootstrap.less'
						}
					},
					compileTheme : {
						options : {
							strictMath : true,
							sourceMap : true,
							outputSourceFiles : true,
							sourceMapURL : '<%= pkg.name %>-theme.css.map',
							sourceMapFilename : 'css/<%= pkg.name %>-theme.css.map'
						},
						files : {
							'css/<%= pkg.name %>-theme.css' : '../vendor/twbs/bootstrap/less/theme.less'
						}
					}
				},
				autoprefixer : {
					options : {
						browsers : [ 'Android 2.3', 'Android >= 4',
								'Chrome >= 20', 'Firefox >= 24', // Firefox
																	// 24 is the
																	// latest
																	// ESR
								'Explorer >= 8', 'iOS >= 6', 'Opera >= 12',
								'Safari >= 6' ]
					},
					core : {
						options : {
							map : true
						},
						src : 'css/<%= pkg.name %>.css'
					},
					theme : {
						options : {
							map : true
						},
						src : 'css/<%= pkg.name %>-theme.css'
					}
				},
				cssmin : {
					options : {
						compatibility : 'ie8',
						keepSpecialComments : '*',
						noAdvanced : true
					},
					core : {
						files : {
							'css/<%= pkg.name %>.min.css' : 'css/<%= pkg.name %>.css',
							'css/<%= pkg.name %>-theme.min.css' : 'css/<%= pkg.name %>-theme.css'
						}
					}
				},

				usebanner : {
					options : {
						position : 'top',
						banner : '<%= banner %>'
					},
					files : {
						src : 'css/*.css'
					}
				},

				csscomb : {
					options : {
						config : 'less/.csscomb.json'
					},
					dist : {
						expand : true,
						cwd : 'css/',
						src : [ '*.css', '!*.min.css' ],
						dest : 'css/'
					}
				},
				copy : {
					fonts : {
						expand : true,
						src : '../vendor/twbs/bootstrap/fonts/*',
						dest : 'fonts/',
						flatten : true

					}
				}

			});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {
		scope : 'devDependencies'
	});
	require('time-grunt')(grunt);

	// JS distribution task.
	grunt.registerTask('dist-js', [ 'concat', 'uglify' ]);

	// CSS distribution task.
	grunt.registerTask('less-compile', [ 'less:compileCore',
			'less:compileTheme' ]);
	grunt.registerTask('dist-css', [ 'less-compile', 'autoprefixer',
			'usebanner', 'csscomb', 'cssmin' ]);

	// Full distribution task.
	grunt
			.registerTask('dist', [ 'clean', 'dist-css', 'copy:fonts',
					'dist-js' ]);
	grunt.registerTask('default', [ 'dist' ]);

};
