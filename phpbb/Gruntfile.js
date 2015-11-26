module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
    	stylesheet: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "ukrgb-prosilver/theme/stylesheet.css": "less/stylesheet.less" // destination file and source file
        }
      },
      	responsive: {
          options: {
            compress: true,
            yuicompress: true,
            optimization: 2
          },
          files: {
            "ukrgb-prosilver/theme/responsive.css": "less/responsive.less" // destination file and source file
          }
        }
    },
    
    synchard: {
        remotedest: {
            options: {
                ssh: true,
                privateKey: "/home/mrfg/.ssh/Area51.pem"
            },
            files: {
                'ubuntu@area51.ukriversguidebook.co.uk:/var/www/ukrgb/phpbb/styles/': ['ukrgb-prosilver']
            }
        }
    },

    
    copy: { 
    	// make a copy of the prosilver theme to work with.
		prosilver: {
			expand : true,
			cwd : '../../phpbb/phpBB/styles/prosilver/theme/',
			src : ['**'],
			dest : 'prosilver/theme/',
			flatten : false
		},
    	images: {
			expand : true,
			src : 'prosilver/theme/images/*',
			dest : 'ukrgb-prosilver/theme/images/',
			flatten : true
		},
		en: {
			expand : true,
			src : 'prosilver/theme/en/*',
			dest : 'ukrgb-prosilver/theme/en/',
			flatten : true
		},
	},
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less','synchard'],
        options: {
          nospawn: true
        }
      }
    }
  });
  grunt.registerTask('sync', ['copy', 'less', 'synchard']);

  grunt.registerTask('default', ['copy', 'less', 'watch']);
};