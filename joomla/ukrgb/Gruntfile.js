module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		RemoteHost: process.env.ukrgbRemoteHost,
		RemoteUser: process.env.ukrgbRemoteUser,
		privateKeyFile: process.env.ukrgbPrivateKeyFile,
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',

		// Task configuration.

		
		clean : {
			dist : ['css/template*.css','css/template*.map', 'ukrgb.zip','css/*.gif']
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
				files: [{src: ['**', '!less/**', '!node_modules/**','!*.zip'], dest: '.'}]
			}
		},

		synchard: {
	        remotedest: {
	            options: {
	            	args: ['-av','--delete'],
	                ssh: true,
	                privateKey: "<%=privateKeyFile%>",
	                exclude: [".git*","node_modules","less",'Gruntfile.js','package.json']
	            },
	            files: {
	            	'<%=RemoteUser%>@<%=RemoteHost%>:/var/www/ukrgb/joomla/templates/ukrgb/': ['.']
	            }
	        }
	    },
	    watch: {
	        styles: {
	          files: ['index.php','less/**/*','html/**/*','font/**/*','images/**/*','language/**/*'], // which files to watch
	          tasks: ['less-compile', 'autoprefixer', 'csscomb', 'cssmin', 'synchard'],
	          options: {
	            nospawn: true
	          }
	        }
	      },
	});

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt, {
		scope : 'devDependencies'
	});
	
	// CSS distribution task.
	grunt.registerTask('less-compile', [ 'less:compileCore' ]);

	grunt.registerTask('dist-css', [ 'less-compile', 'autoprefixer', 'csscomb', 'cssmin' ]);

	// Default task(s).
	grunt.registerTask('dist', ['clean','dist-css','compress']);
	grunt.registerTask('default', ['clean','dist-css','synchard','watch']);
};