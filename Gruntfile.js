module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			temp: ['dist/scripts.js', 'dist/libs.min.js', 'dist/scripts.min.js'],
			all: ['dist/']
		},
		jshint: {
			dist: {
				src: ['public/js/**/*.js']
			}
		},
		concat: {
			scripts: {
				src: ['public/js/**/*.js'],
				dest: 'public/dist/scripts.js'
			},
			libs: {
				src: [
					'public/lib/angular/angular.min.js',
					'public/lib/angular-route/angular-route.min.js',
					'public/lib/bootstrap/dist/js/bootstrap.min.js',
					'public/lib/jquery/jquery.min.js'
				],
				dest: 'public/dist/libs.min.js'
			},
			all: {
				src: ['public/dist/scripts.min.js', 'public/dist/libs.min.js'],
				dest: 'public/dist/all.min.js'
			}
		},
		uglify: {
			scripts: {
				src: ['public/dist/scripts.js'],
				dest: 'public/dist/scripts.min.js'
			}
		},
		cssmin: {
			all: {
				scr: ['public/lib/bootstrap/dist/css/bootstrap.min.js'],
				scr: ['public/lib/bootstrap/dist/css/bootstrap-theme.min.js'],
				dest: 'public/dist/style.min.css'
			}
		},
		htmlmin: {
  			options: {
    			removeComments: true,
    			collapseWhitespace: true
  			},
  			views: {
  				expand: true,
  				cwd: 'public/partials/',
  				scr: ['*.html'],
  				dest: 'dist/views'
  			}
		},
		copy: {
			src: ['public/index_prod.html'],
			dest: 'public/dist/index.html'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('deploy', ['clean:all', 'jshint', 'concat:scripts', 'uglify', 'concat:libs', 'concat:all', 'cssmin', 'htmlmin', 'copy', 'clean:temp']);
}