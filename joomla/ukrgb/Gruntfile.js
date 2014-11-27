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
		clean : {
			dist : ['css/template*.css','css/template*.map', 'ukrgb.zip']
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
				        {src: ['**', '!less/**', '!node_modules/**','!*.zip'],	  dest: '.'}
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
					//dest: "ukrgb/", 
					host: "ukrgb-joomla3.homedomain"
				}
			//},
			//phpbb: {
			//	options: {
			//		src: "phpbb/prosilver/",
			//		dest: "/http/ukrgb/phpbb/styles/prosilver", 
			//		//dest: "ukrgb/",
			//		host: "mrfg@ukrgb-joomla3.homedomain"
			//	}
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
	grunt.registerTask('dist-css', [ 'less-compile', 'autoprefixer', 'csscomb', 'cssmin' ]);

	// Default task(s).
	grunt.registerTask('dist', ['clean','dist-css','compress']);
	grunt.registerTask('default', ['clean','dist-css','rsync']);

};