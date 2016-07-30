// Shows the number of characters left when typing in a textarea
;(function( w ){
	var $ = w.jQuery;

	function CharacterCounter( el ) {
		var $el = $(el);

		if( $el.data("CharacterCounter") ){
			return;
		}
		$el.data( "CharacterCounter", this );

		var self = this;

		this.$el = $el;
		this.$label = $(
			"[data-maxlength-count='" + this.$el.attr("id") + "']," +
				"[data-minlength-count='" + this.$el.attr("id") + "']"
		);

		this.$parent = this.$label.parent().addClass( "character-counter plural" );
		this.max = parseFloat( this.$el.attr( "maxlength" ), 10 );
		this.min = parseFloat( this.$el.attr( "minlength" ), 10 );

		if ( this.$label.length ){
			this.$el
				.unbind( ".charcount")
				.bind( "input.charcount keyup.charcount", function(){
					self.characterCount();
				});
		}
	}

	// TODO duplication with maxlength input
	CharacterCounter.prototype.valueLength = function(){
		return this.$el[0].value.replace(/\r\n|\n/g, "__").length;
	};

	CharacterCounter.prototype.characterCount = function( $label ) {
		var newval = ( this.max || this.min ) - this.valueLength();

		this.$label.html( "" + newval );
		var add = [];
		var remove = [ "min max limit" ];
		if( newval !== 1 ) {
			remove.push( "singular" );
			add.push( "plural" );
		} else {
			add.push( "singular" );
			remove.push( "plural" );
		}

		var hitMax = this.max && newval === 0;
		var hitMin = this.min && newval <= 0;

		if( hitMax || hitMin ){
			add.push( "limit " + ( hitMax ? "max" : "min" ) );
			this.$label.html( "0" );
		}

		this.$parent.removeClass( remove.join( " " ) ).addClass( add.join( " " ) );
	};

	CharacterCounter.selectors = [
		"textarea[maxlength]",
		"textarea[minlength]"
	];

	$( w.document ).bind( "enhance", function( e ) {
		//textarea max-length counter
		$( e.target ).find( CharacterCounter.selectors.join(",") ).each(function(){
			new CharacterCounter( this );
		});
	});

}( typeof global !== "undefined" ? global : this ));
