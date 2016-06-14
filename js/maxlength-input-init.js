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
			initSelector = "textarea[maxlength]"

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var input = new MaxlengthInput( this );
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		var attr = "data-enhanced-" + pluginName;
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, MaxlengthInput, this ));
