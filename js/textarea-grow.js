(function( $, window ){

	var initForm = function(){

		// auto-expand textarea height
		$( "textarea" ).bind( "input", function(){
			if( this.scrollHeight > this.clientHeight ){
				$( this ).height( this.scrollHeight + "px" );
			}
		});

	};

	$( document ).bind( "enhance", initForm );

}( jQuery, window ));