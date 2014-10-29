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
					dist : ['joomla/ukrgb/js/bootstrap*.js','joomla/ukrgb/css/bootstrap*.css','joomla/ukrgb/css/bootstrap*.map', 'joomla/ukrgb.zip']
					},

				concat : {
					options : {
						banner : '<%= banner %>\n<%= jqueryCheck %>',
						stripBanners : false
					},
					bootstrap : {
						src : [ 'vendor/twbs/bootstrap/js/transition.js',
								'vendor/twbs/bootstrap/js/alert.js',
								'vendor/twbs/bootstrap/js/button.js',
								'vendor/twbs/bootstrap/js/carousel.js',
								'vendor/twbs/bootstrap/js/collapse.js',
								'vendor/twbs/bootstrap/js/dropdown.js',
								'vendor/twbs/bootstrap/js/modal.js',
								'vendor/twbs/bootstrap/js/tooltip.js',
								'vendor/twbs/bootstrap/js/popover.js',
								'vendor/twbs/bootstrap/js/scrollspy.js',
								'vendor/twbs/bootstrap/js/tab.js',
								'vendor/twbs/bootstrap/js/affix.js' ],
						dest : 'joomla/ukrgb/js/<%= pkg.name %>.js'
					}
				},

				uglify : {
					options : {
						preserveComments : 'some'

					},
					bootstrap : {
						src : '<%= concat.bootstrap.dest %>',
						dest : 'joomla/ukrgb/js/<%= pkg.name %>.min.js'
					}
				},

				less : {
					compileCore : {
						options : {
							strictMath : true,
							sourceMap : true,
							outputSourceFiles : true,
							sourceMapURL : '<%= pkg.name %>.css.map',
							sourceMapFilename : 'joomla/ukrgb/css/<%= pkg.name %>.css.map'
						},
						files : {
							'joomla/ukrgb/css/<%= pkg.name %>.css' : 'joomla/ukrgb/less/bootstrap.less'
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
						src : 'joomla/ukrgb/css/<%= pkg.name %>.css'
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
							'joomla/ukrgb/css/<%= pkg.name %>.min.css' : 'joomla/ukrgb/css/<%= pkg.name %>.css'//,
						}
					}
				},

				usebanner : {
					options : {
						position : 'top',
						banner : '<%= banner %>'
					},
					files : {
						src : 'joomla/ukrgb/css/*.css'
					}
				},

				csscomb : {
					options : {
						config : 'joomla/ukrgb/less/.csscomb.json'
					},
					dist : {
						expand : true,
						cwd : 'joomla/ukrgb/css/',
						src : [ '*.css', '!*.min.css' ],
						dest : 'joomla/ukrgb/css/'
					}
				},
				copy : {
					/*fonts : {
						expand : true,
						src : 'vendor/twbs/bootstrap/fonts/*',
						dest : 'ukrgb/fonts/',
						flatten : true

					}*/
					jquery : {
						expand : true,
						src : 'vendor/components/jquery/jquery.min.js',
						dest : 'joomla/ukrgb/js/',
						flatten : true
					}
				},
								
				compress: {
					  main: {
					    options: {
					      archive: 'joomla/ukrgb.zip'
					    },
					    files: [
					      {src: ['joomla/ukrgb/**', '!joomla/ukrgb/less/**'],	  dest: '.'}
					    ]
					  }
					},
				
				rsync: {
				    options: {
				        args: ["--verbose"],
				        exclude: [".git*","node_modules","less"],
				        recursive: true
				    },
				    dist: {
				        options: {
				            src: "joomla/ukrgb/",
				            dest: "/http/ukrgb/joomla/templates/ukrgb/", 
				            //dest: "ukrgb/", 
				            host: "mrfg@ukrgb-joomla3.homedomain"
				        }
				    },
				    phpbb: {
				        options: {
				            src: "phpbb/prosilver/",
				            dest: "/http/ukrgb/phpbb/styles/prosilver", 
				            //dest: "ukrgb/",
				            host: "mrfg@ukrgb-joomla3.homedomain"
				        }
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
	grunt.registerTask('less-compile', [ 'less:compileCore' ]);
	grunt.registerTask('dist-css', [ 'less-compile', 'autoprefixer',
			'usebanner', 'csscomb', 'cssmin' ]);

	// Full distribution task.
	grunt.registerTask('dist', [ 'clean', 'dist-css', 'dist-js', 'copy' ]);
	grunt.registerTask('stage', ['dist','rsync']);
	grunt.registerTask('rsync-only', ['rsync']);
	grunt.registerTask('release', ['dist','compress']);
	grunt.registerTask('default', [ 'stage' ]);

};