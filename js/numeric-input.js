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
	};

	window.NumericInput = NumericInput;
}(jQuery, this));
