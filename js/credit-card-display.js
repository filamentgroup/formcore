// Helper utility for credit cards to show an image of the card type
// Requires: politespace and creditable
;(function( w ){
	var $ = w.jQuery;
	var update;
	var $doc = $( w.document );

	$doc.on( "politespace-input", update = function( event, value ) {
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

		value = value ? value : $t.val();

		var cardType = w.CreditableCardType( value );
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

	$doc.on("paste", function(e){
		var event = e.originalEvent || e;

		// http://stackoverflow.com/questions/6035071/intercept-paste-event-in-javascript
		var pastedText;

		if (window.clipboardData && window.clipboardData.getData) { // IE
			pastedText = window.clipboardData.getData('Text');
		} else if (event.clipboardData && event.clipboardData.getData) {
			pastedText = event.clipboardData.getData('text/plain');
		}

		// if we were unable to get the pasted text avoid doing anything
		if( !pastedText ){
			return;
		}

		update(event, pastedText);
	});
}( typeof global !== "undefined" ? global : this ));
