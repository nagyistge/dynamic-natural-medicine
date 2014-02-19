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
          pretty: true
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


  // TODO: Use jade and compile into html with https://www.npmjs.org/package/grunt-contrib-jade


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



  grunt.registerTask('build', ['sass','jade']);
  grunt.registerTask('default', ['build','express','watch']);
}