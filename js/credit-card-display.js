// Helper utility for credit cards to show an image of the card type
// Requires: politespace and creditable
;(function( w ){
	var $ = w.jQuery;

	var $doc = $( w.document );

	$doc.on( "politespace-input", function( event ) {
		var $t = $( event.target );
		if( !$t.is( "[data-credit-card-display]" ) ) {
			return;
		}

		var classes = {
			all: "creditcarddisplay-active",
			amex: "creditcarddisplay-amex",
			visa: "creditcarddisplay-visa",
			mastercard: "creditcarddisplay-mastercard",
			discover: "creditcarddisplay-discover"
		};

		var cardType = w.CreditableCardType( $t.val() );
		var $container = $t.closest( ".group-form, .sect-group" );

		// remove previous
		var remove = [];
		for( var j in classes ) {
			remove.push( classes[ j ] );
		}
		$container.removeClass( remove.join( " " ) );

		// add new
		if( cardType === "AMEX" ) {
			$container.addClass( classes.all + " " + classes.amex );
		} else if( cardType === "VISA" ) {
			$container.addClass( classes.all + " " + classes.visa );
		} else if( cardType === "MASTERCARD" ) {
			$container.addClass( classes.all + " " + classes.mastercard );
		} else if( cardType === "DISCOVER" ) {
			$container.addClass( classes.all + " " + classes.discover );
		}
	});
}( typeof global !== "undefined" ? global : this ));
