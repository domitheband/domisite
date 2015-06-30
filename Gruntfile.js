module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		autoprefixer: {
			options: {

			},

			single_file: {
				options: {
					map: {
						sourceContent: true
					}
				},
				src: 'style/css/dev.css',
				dest: 'style/css/dev-prefixed.css'
			}
		},

		sass: {
			development: {
				options: {
					yuicompress: true,
					sourceMap: true,
					sourceMapFilename: "style/css/dev.min.css.map",
					sourceMapURL: "/style/css/dev.min.css.map",
					sourceMapRootPath: ""
				},
				files: {
					"style/css/dev.css": "style/scss/dev.scss"
				}
			},

			production: {
				options: {
					yuicompress: true,
					sourceMap: true,
					sourceMapFilename: "style/css/prod.min.css.map",
					sourceMapURL: "/style/css/prod.min.css.map",
					sourceMapRootPath: ""
				},
				files: {
					"style/css/prod.css": "style/scss/prod.scss"
				}
			}
		},

		watch: {
			dev: {
				files: "**/*.scss",
				tasks: ["sass:development", "autoprefixer"]
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: 'style/css/*.css',
					index: 'index.html'
				},
				options: {
					degubInfo: true,
					watchTask: true,
					proxy: 'domitheband/'
				}
			}
		}
	});

	//Require all tasks found in package.json
	require("load-grunt-tasks")(grunt);

	grunt.registerTask('default', ['browserSync', 'watch:dev']);

	grunt.registerTask('production', ['sass:production']);


};