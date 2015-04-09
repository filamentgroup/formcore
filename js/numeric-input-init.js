/*global jQuery:true*/
/*global NumericInput:true*/
/*
 * Create a numeric input that actually works
 *
 * Copyright (c) 2015 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, NumericInput, window ) {
	"use strict";

	var document = window.document;

	var pluginName = "numeric-input",
			initSelector = "[data-" + pluginName + "]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var input = new NumericInput( this );
			input.init();
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, NumericInput, this ));
