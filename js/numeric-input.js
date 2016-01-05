/*global jQuery:true*/
(function($, window){
	"use strict";

	var NumericInput = function( el ){
		this.el = el;
		this.$el = $( el );
		this.pattern = this.$el.attr( "data-pattern" );
	};

	NumericInput.prototype.bindEvents = function(){

		this.$el.on( "keypress", function( event ){

			var handled = false;
			if (event.key !== undefined) {
				var key = event.key;
				handled = isNaN(parseInt(key, 10)) &&
					key !== "Tab" &&
					key !== "Enter" &&
					key !== "Escape";
			} else if (event.keyCode !== undefined) {
				var code = event.keyCode;
				handled = (code < 48 || code > 57) && code !== 13;
			}

			if (handled) {
				// Suppress "double action" if event handled
				event.preventDefault();
			}
		});
	};

	NumericInput.prototype.init = function(){
		this.el.pattern = this.pattern;
		this.bindEvents();
	};

	window.NumericInput = NumericInput;
}(jQuery, this));
