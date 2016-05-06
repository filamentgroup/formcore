/*global jQuery:true*/
(function($, window){
	"use strict";

	$( window.document ).bind( "enhance", function( e ){
		// progressive disclosure -- works with checkboxes and radios
		$( e.target ).find( "[data-disclosure]" ).each(function(){
			var $t = $( this );
			if( $t.data( "disclosure" ) ) {
				return;
			}
			$t.data( "disclosure", true );

			var id = $t.attr( "data-disclosure" );
			var $content = $( "#" + id );
			if( $t.is( "input" ) || $t.is( "option" ) ) {
				$t.closest( "form" ).bind( "change", function(){
					var checked = false;
					$( this ).find( "[data-disclosure='" + id + "']" ).each(function() {
						checked = checked || this.checked || this.selected;
					});
					$content[ checked ? "removeClass" : "addClass" ]( "hidden" );
				});
			}
		});
	});

}(jQuery, this));
