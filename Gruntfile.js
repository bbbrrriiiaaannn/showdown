const minify =  require('rollup-plugin-babel-minify');

/**
 * Created by Tivie on 12-11-2014.
 */

module.exports = function (grunt) {

  if (grunt.option('q') || grunt.option('quiet')) {
    require('quiet-grunt');
  }

  // Project configuration.
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        sourceMap: true,
        banner: ';/*! <%= pkg.name %> v <%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n(function(){\n',
        footer: '}).call(this);\n'
      },
      dist: {
        src: [
          'src/options.js',
          'src/showdown.js',
          'src/helpers.js',
          'src/subParsers/makehtml/*.js',
          'src/subParsers/makemarkdown/*.js',
          'src/converter.js',
          'src/loader.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      test: {
        src: '<%= concat.dist.src %>',
        dest: '.build/<%= pkg.name %>.js',
        options: {
          sourceMap: false
        }
      }
    },

    clean: ['.build/'],

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: ''
      },
      files: [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js'
      ]
    },

    eslint: {
      options: {
        config: '.eslintrc.json'
      },
      target: [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js'
      ]
    },

    rollup: {
      options: {
        format: 'umd',
        sourcemap: true,
        name: 'showdown'
      },
      dist: {
        files: [{
          src: 'src/showdown.js',
          dest: 'dist/showdown.js',
        }]
      },
      min: {
        options: {
          plugins: [minify({
            comments: false
          })]
        },
        files: [{
          src: 'src/showdown.js',
          dest: 'dist/showdown.min.js',
        }]
      },
      test: {
        options: {
          format: 'cjs',
        },
        files: [{
          src: 'src/showdown.js',
          dest: '.build/showdown.js'
        }]
      }
    },

    conventionalChangelog: {
      options: {
        changelogOpts: {
          preset: 'angular'
        }
      },
      release: {
        src: 'CHANGELOG.md'
      }
    },

    conventionalGithubReleaser: {
      release: {
        options: {
          auth: {
            type: 'oauth',
            token: process.env.GH_TOEKN
          },
          changelogOpts: {
            preset: 'angular'
          }
        }
      }
    },

    simplemocha: {
      functional: {
        src: 'test/functional/**/*.js',
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: true,
          reporter: 'spec',
          sourceMaps: true,
        }
      },
      unit: {
        src: 'test/unit/**/*.js',
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: true,
          reporter: 'spec',
          sourceMaps: true,

        }
      },
      single: {
        src: 'test/node/**/*.js',
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: false,
          reporter: 'spec',
          sourceMaps: true,
        }
      }
    }
  };

  grunt.initConfig(config);

  /**
   * Load common tasks for legacy and normal tests
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-simple-mocha');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-rollup');

  /**
   * Generate Changelog
   */
  grunt.registerTask('generate-changelog', function () {
    'use strict';
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-conventional-github-releaser');
    grunt.task.run('conventionalChangelog');
  });

  /**
   * Lint tasks
   */
  grunt.registerTask('lint', function () {
    'use strict';
    grunt.loadNpmTasks('grunt-eslint');
    grunt.task.run('jshint', 'eslint');
  });

  /**
   * Performance task
   */
  grunt.registerTask('performancejs', function () {
    'use strict';
    var perf = require('./test/performance/performance.js');
    perf.runTests();
    perf.generateLogs();
  });

  /**
   * Run a single test
   */
  grunt.registerTask('single-test', function (grep) {
    'use strict';
    grunt.config.merge({
      simplemocha: {
        single: {
          options: {
            grep: grep
          }
        }
      }
    });

    grunt.task.run(['lint', 'concat:test', 'simplemocha:single', 'clean']);
  });

  /**
   * Tasks
   */

  grunt.registerTask('test', ['clean', /*'lint',*/ 'rollup:test', 'simplemocha:unit', 'simplemocha:functional', 'clean']);
  grunt.registerTask('test-functional', ['rollup:test', 'simplemocha:functional', 'clean']);
  grunt.registerTask('test-unit', ['rollup:test', 'simplemocha:unit', 'clean']);
  grunt.registerTask('performance', ['rollup:test', 'performancejs', 'clean']);
  grunt.registerTask('build', ['test', 'rollup:dist', 'rollup:min']);
  grunt.registerTask('build-without-test', ['rollup:dist', 'rollup:min']);
  grunt.registerTask('prep-release', ['build', 'generate-changelog']);

  // Default task(s).
  grunt.registerTask('default', ['test']);
};
