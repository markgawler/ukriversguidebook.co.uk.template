module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "ukrgb-prosilver/theme/stylesheet.css": "less/stylesheet.less" // destination file and source file
        }
      }
    },
    copy: { 
    	images: {
			expand : true,
			src : '../../phpbb/phpBB/styles/prosilver/theme/images/*',
			dest : 'ukrgb-prosilver/theme/images/',
			flatten : true
		},
		// make a copy of the prosilver theme to work with.
		css: {
			expand : true,
			cwd : '../../phpbb/phpBB/styles/prosilver/theme/',
			src : ['**'],
			dest : 'prosilver/theme/',
			flatten : false
		},
	},
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['copy', 'less', 'watch']);
};