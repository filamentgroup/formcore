/*global jQuery:true*/
/*global Toggler:true*/
/*
 * Toggle visibility of auto-updating spans that show input values
 *
 * Copyright (c) 2015 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, Toggler, window ) {
	"use strict";

	var document = window.document;

	var pluginName = "input-val-toggle",
			initSelector = "[data-" + pluginName + "]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var formGroups = $( ".form-group" );
			var togglers = [];
			$.each( formGroups, function( idx, el ){
				var t = new Toggler( el );
				t.input.bind( "keyup", function( e ){
					t.update();
				});
				togglers.push( t );
			});

			var label = $( "<label/>" )
									.html( "Check here to toggle visibility of values" );
			$( "<input/>" )
			.attr( "type", "checkbox" )
			.attr( "id", "val-toggle" )
			.bind( "change", function(e){
				var i = 0, l = togglers.length;
				if( this.checked ){
					for( ; i < l; i++ ){
						togglers[i].show();
					}
				} else {
					for( ; i < l; i++ ){
						togglers[i].hide();
					}
				}
			})
			.appendTo( label );

			label.prependTo( ".docs-main" );
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, Toggler, this ));
