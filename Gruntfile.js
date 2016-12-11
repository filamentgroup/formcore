/*
 * formcore
 * https://github.com/filamentgroup/formcore
 *
 * Copyright (c) 2014 Filament Group
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		concat: {
			options: {},
			js: {
				src: [
					'node_modules/grunt-grunticon/example/output/grunticon.loader.js',
					'node_modules/shoestring/dist/shoestring.js',
					'node_modules/xrayhtml/dist/xrayhtml.js',
					'node_modules/creditable/creditablecardtype.js',
					'node_modules/creditable/creditablesecuritycode.js',
					// politespace should come before validator
					'node_modules/politespace/src/politespace.js',
					'node_modules/politespace/src/politespace-creditcard.js',
					'node_modules/politespace/src/politespace-init.js',
					'node_modules/validator/dist/validator.js',
					'node_modules/validator/dist/validator.config.js',
					'node_modules/validator/src/validator.page.js',
					'node_modules/validator/src/validator.page-init.js',
					'node_modules/validator/dist/validator-init.js',
				],
				dest: 'dist/dependencies.js'
			},
			css: {
				src: [
					'node_modules/xrayhtml/dist/xrayhtml.css',
					'node_modules/politespace/src/politespace.css',
					'node_modules/validator/dist/validator.css',
					'node_modules/fg-select-css/src/select-css.css',
					'node_modules/fg-select-css/src/select-css-compat.css',
				],
				dest: 'dist/dependencies.css'
			}
		},
		grunticon: {
			all: {
				files: [{
					expand: true,
					cwd: 'img/icons/',
					src: [ '*.svg' ],
					dest: "dist/grunticon/"
				}],
				options: {
					cssprefix: '.icon-',
					cssbasepath: "/",
					customselectors: {}
				}
			}
		},

		qunit: {
			all: ['test/**/*.html']
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-grunticon');

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'concat', 'grunticon']);
	grunt.registerTask('stage', ['default']);

  var compile = require('google-closure-compiler-js').compile;
  var path = require('path');
  var fs = require('fs');

  var flags = {
    languageIn: 'ECMASCRIPT6_STRICT',
    languageOut: 'ECMASCRIPT3',
    compilationLevel: 'ADVANCED',
    warningLevel: 'VERBOSE',
    jsCode: [{path: 'js/numeric-input.js'}]
      .map(file => {
        return {
          path: path.relative(process.cwd(), file.path),
          src: fs.readFileSync(path.relative(process.cwd(), file.path)).toString(),
          // TODO
          sourceMap: file.sourceMap ? JSON.stringify(file.sourceMap) : undefined
        };
      })
  };

  grunt.task.registerTask('closure', 'run the closure compiler', function(){
    const out = compile(flags);
    fs.writeFileSync('dist/numeric-input.es3.js', out.compiledCode);
  });
};
