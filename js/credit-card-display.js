// Helper utility for credit cards to show an image of the card type
// Requires: politespace and creditable
;(function( w ){
	var $ = w.jQuery;
	var $doc = $( w.document );

	var classes = {
		all: "creditcarddisplay-active",
		AMEX: "creditcarddisplay-amex",
		VISA: "creditcarddisplay-visa",
		MASTERCARD: "creditcarddisplay-mastercard",
		DISCOVER: "creditcarddisplay-discover"
	};

	function setCardClass( event, value ){
		var $t = $( event.target );
		if( !$t.is( "[data-credit-card-display]" ) ) {
			return;
		}

		value = value ? value : $t.val();

		var cardType = w.CreditableCardType( value );
		var $container = $t.closest( ".group-form, .sect-group" );

		// remove previous
		var remove = [];
		for( var j in classes ) {
			remove.push( classes[ j ] );
		}

		$container.removeClass( remove.join( " " ) );

		$container.addClass( classes.all + " " + (classes[cardType] || "") );
	}

	$doc.on( "politespace-input", setCardClass );

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

		setCardClass(event, pastedText);
	});
}( typeof global !== "undefined" ? global : this ));
