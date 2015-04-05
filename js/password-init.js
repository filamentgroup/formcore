/*
 * Password-input functions
 *
 * Copyright (c) 2014 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, window ) {

	var pluginName = "mask-pw",
			initSelector = "[data-" + pluginName + "]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
				var el = this,
						$el = $( this ),
						$tog = $( "<b class='button btn-small btn-mask-pw'>"),
						$newinp;
					
				function toggleMask() {
					var $inp = $el.find( "input" ),
							type = $inp.attr( "type" );

					$newinp = $inp.clone();
					$newinp[ 0 ].value = $inp.val();
					$newinp[ 0 ].type = type === "text" ? "password" : "text";
					$tog.html( ( type === "text" ? "show" : "hide" ) + " password" );
					$inp.replaceWith( $newinp );
				}
					
				var $inp = $el.find( "input" ),
						type = $inp.attr( "type" );

				$tog.html( ( type === "text" ? "hide" : "show" ) + " password" );
				$tog.insertBefore( $inp );

				$tog.bind( "click", toggleMask );
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, this ));
