var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    express: {
      options: {
        port: 5000,
        hostname: '*'
      },
      app: {
        options: {
          server: path.resolve(__dirname, './express.js'),
          livereload: true,
          serverreload: false,
          bases: [path.resolve(__dirname, 'public'), path.resolve(__dirname, 'views')]
        }
      }
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss','bower_components/font-awesome/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/css/app.css': 'scss/app.scss'
        }        
      }
    },

    jade: {
      compile: {
        options: {
          client: false,
          data: function(dest, src) {
            // Return an object of data to pass to templates
            return require('./locals');
          }
          // grunt.file.readJSON("data.json")
        },
        files: [ {
          cwd: "views",
          src: ["**/*.jade","!includes/**/*.jade","!layout.jade"],
          dest: "views",
          expand: true,
          ext: ".html"
        } ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        compress: {
          drop_console: true
        },
        sourceMap: true,
        sourceMapName: 'public/js/app.min.js.map'
      },
      my_target: {
        files: {
          'public/js/app.min.js': ['public/js/app.js']
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass'],

        options: {
          livereload: true
        }
      },

      jade: {
        files: ['views/**/*.jade'],
        tasks: ['jade'],

        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('build', ['sass','jade','uglify']);
  grunt.registerTask('default', ['build','express','watch']);
  grunt.registerTask('heroku', ['build']);
}