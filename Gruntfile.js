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
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-grunticon');

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'concat', 'grunticon']);
	grunt.registerTask('stage', ['default']);

};
