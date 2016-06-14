/*global jQuery:true*/
/*global MaxlengthInput:true*/
/*
 * Create a maxlength attribute that actually works
 *
 * Copyright (c) 2015 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, MaxlengthInput, window ) {
	"use strict";

	var document = window.document;

	var pluginName = "maxlength-input",
			initSelector = "[data-" + pluginName + "]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var input = new MaxlengthInput( this );
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		var attr = "data-enhanced-" + pluginName;
		$( initSelector, e.target ).filter( function() {
			return !$( this ).is( "[" + attr + "]" );
		}).attr( attr, "" )[ pluginName ]();
	});

}( jQuery, MaxlengthInput, this ));
