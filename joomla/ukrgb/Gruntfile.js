module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//uglify: {
		//options: {
		//	banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		//},
		//build: {
		//	src: 'src/<%= pkg.name %>.js',
		//	dest: 'build/<%= pkg.name %>.min.js'
		//},
		// Task configuration.
		
		concat : {
			options : {
				banner : '<%= banner %>\n<%= jqueryCheck %>',
				stripBanners : false
			},
			ukrgb : {
				src : [ 'airbox/js/airbox.js',
						'slimbox2/src/slimbox2.js',
						'slimbox2/src/autoload.js'],
				dest : 'js/<%= pkg.name %>.js'
			}
		},

		uglify : {
			options : {
				preserveComments : 'some'

			},
			ukrgb : {
				src : '<%= concat.ukrgb.dest %>',
				dest : 'js/<%= pkg.name %>.min.js'
			}
		},

		copy : {
			slimboxImages : {
				expand : true,
				src : 'slimbox2/css/*.gif',
				dest : 'css/',
				flatten : true
			},
			slimboxcss : {
				expand : true,
				src : 'slimbox2/css/slimbox2.css',
				dest : 'less/',
				flatten : true
			}
		},
		rename: {
			renameToLess: {
				src: 'less/slimbox2.css',
				dest: 'less/slimbox2.less'
			}
		},
		
		
		
		clean : {
			dist : ['css/template*.css','css/template*.map', 'ukrgb.zip','js/template*.js','css/*.gif','less/slimbox2.less']
			},
		less : {
			compileCore : {
				options : {
					strictMath : false,
					sourceMap : true,
					outputSourceFiles : true,
					sourceMapURL : '<%= pkg.name %>.css.map',
					sourceMapFilename : 'css/<%= pkg.name %>.css.map'
				},
				files : {
					'css/<%= pkg.name %>.css' : 'less/template.less'
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
					'css/<%= pkg.name %>.min.css' : 'css/<%= pkg.name %>.css'//,
				}
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
		
		compress: {
			main: {
				options: {
					archive: 'ukrgb.zip'
				},
				files: [
				        {src: ['**', '!less/**', '!node_modules/**','!*.zip','!airbox/**','!slimbox2/**'],	  dest: '.'}
				        ]
			}
		},

		rsync: {
			options: {
				args: ["--verbose"],
				exclude: [".git*","node_modules","less",'Gruntfile.js','package.json','ukrgb.zip'],
				recursive: true
			},
			dist: {
				options: {
					src: ".",
					dest: "/http/ukrgb/joomla/templates/ukrgb/", 
					host: "ukrgb-joomla3.homedomain"
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {
		scope : 'devDependencies'
	});
	require('time-grunt')(grunt);

	// Load the plugin that provides the "uglify" task.
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// CSS distribution task.
	grunt.registerTask('less-compile', [ 'less:compileCore' ]);
	grunt.registerTask('copy-sb', [ 'copy:slimboxImages','copy:slimboxcss','rename']);

	grunt.registerTask('dist-css', [ 'copy-sb','less-compile', 'autoprefixer', 'csscomb', 'cssmin' ]);
	
	grunt.registerTask('dist-js', [ 'concat','uglify' ]);


	// Default task(s).
	grunt.registerTask('dist', ['clean','dist-css','dist-js','compress']);
	grunt.registerTask('default', ['clean','dist-css','rsync']);

};