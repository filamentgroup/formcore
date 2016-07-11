// Shows the number of characters left when typing in a textarea
;(function( w ){
	var $ = w.jQuery;

	function CharacterCounter( el ) {
		this.characterCounter.call( el );
	}

	CharacterCounter.prototype.characterCounter = function() {
		var $label = $( "[data-maxlength-count='" + this.id + "'],[data-minlength-count='" + this.id + "']" ),
			$parent = $label.parent().addClass( "character-counter plural" ),
			max = parseFloat( $( this ).attr( "maxlength" ) ),
			min = parseFloat( $( this ).attr( "minlength" ) ),
			newval;

		if ( $label.length ){
			$( this ).unbind( ".charcount") .bind( "input.charcount keyup.charcount", function(){
				newval = ( max || min ) - this.value.replace(/\r\n|\n/g, "__").length;
				$label.html( "" + newval );
				var add = [];
				var remove = [ "min max limit" ];
				if( newval !== 1 ) {
					remove.push( "singular" );
					add.push( "plural" );
				} else {
					add.push( "singular" );
					remove.push( "plural" );
				}
				var hitMax = max && newval === 0;
				var hitMin = min && newval <= 0;
				if( hitMax || hitMin ){
					add.push( "limit " + ( hitMax ? "max" : "min" ) );
					$label.html( "0" );
				}
				$parent.removeClass( remove.join( " " ) ).addClass( add.join( " " ) );
			});
		}
	};

	CharacterCounter.selectors = [
		"textarea[maxlength]",
		"textarea[minlength]"
	]

	$( w.document ).bind( "enhance", function( e ) {
		//textarea max-length counter
		$( e.target ).find( CharacterCounter.selectors.join(",") ).each(function(){
			new CharacterCounter( this );
		});
	});

}( typeof global !== "undefined" ? global : this ));
