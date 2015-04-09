/*global jQuery:true*/
(function($, window){
	"use strict";

	var NumericInput = function( el ){
		this.el = el;
		this.$el = $( el );
		this.pattern = this.$el.attr( "data-pattern" );
	};

	NumericInput.prototype.init = function(){
		this.el.pattern = this.pattern;

		this.$el.on( "keydown", function( event ){

			var handled = false;
			if (event.key !== undefined) {
				//Handle the event with KeyboardEvent.key and set handled true.
				console.log( "Key" );
				console.log( event.key );
			} else if (event.keyIdentifier !== undefined) {
				// Handle the event with KeyboardEvent.keyIdentifier and set handled true.
				console.log( "Key Identifier" );
				console.log( event.keyIdentifier );
			} else if (event.keyCode !== undefined) {
			// Handle the event with KeyboardEvent.keyCode and set handled true.
				console.log( "Key Code" );
				console.log( event.keyCode );
			}
			if (handled) {
				// Suppress "double action" if event handled
				event.preventDefault();
			}
		});
	};

	window.NumericInput = NumericInput;
}(jQuery, this));
