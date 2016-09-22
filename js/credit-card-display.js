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

		var prefixes = {
			topLevelClass: "creditcarddisplay-",
			labels: "creditcarddisplay_type-"
		}

		var keys = {
			amex: "amex",
			visa: "visa",
			mastercard: "mastercard",
			discover: "discover"
		};

		var activeClass = prefixes.topLevelClass + "active";
		var cardType = w.CreditableCardType( $t.val() );
		var $container = $t.closest( ".group-form, .sect-group" );

		// remove previous
		var remove = [ activeClass ];
		for( var j in keys ) {
			remove.push( prefixes.topLevelClass + keys[ j ] );
		}
		$container.removeClass( remove.join( " " ) );

		// add new
		if( cardType === "AMEX" ||
			cardType === "VISA" ||
			cardType === "MASTERCARD" ||
			cardType === "DISCOVER" ) {
			if( $container.find( "." + prefixes.labels + keys[ cardType.toLowerCase() ] ).length ) {
				$container.addClass( activeClass + " " + prefixes.topLevelClass + keys[ cardType.toLowerCase() ] );
			}
		}
	});
}( typeof global !== "undefined" ? global : this ));
