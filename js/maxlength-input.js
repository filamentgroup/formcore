/*global jQuery:true*/
(function($, window){
	"use strict";

	function MaxlengthInput( el ){
		var self = this;

		this.el = el;
		this.$el = $(el);
		this.maxlength = this.$el.attr("maxlength");

		this.$el
			.bind("keydown", function(event){
				self.onKeydown(event);
			})
			.bind("paste", function(event){
				self.onPaste(event);
			})

		this.el.removeAttribute("maxlength");
		this.el.setAttribute("data-formcore-maxlength", this.maxlength);
	}

	MaxlengthInput.allowedKeys = [
		9, // Tab
		13, // Enter
		27, //Escape
		8, // Backspace
		39, // ArrowRight
		37, // ArrowLeft
		38, // ArrowUp
		40 // ArrowDown
	];

	MaxlengthInput.prototype.isKeyAllowed = function( event ) {
		var isAllowed = false, key = event.keyCode;

		// indexOf not supported everywhere for arrays
		$.each(NumericInput.allowedKeys, function(i, e){
			if( e === key ) {
				isAllowed = true;
			}
		});

		return event.altKey || event.ctrlKey || event.metaKey || isAllowed;
	};


	MaxlengthInput.prototype.onKeydown = function( event ){
		if( this.isKeyAllowed( event ) ){
			return;
		}

		if(this.el.value.length >= this.maxlength){
			event.preventDefault();
		}
	};

	MaxlengthInput.prototype.onPaste = function( e ){
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

		// otherwise force the text to look right
		this.el.value = pastedText.slice(0, this.maxlength);

		// prevent the original paste behavior
		event.preventDefault();
	};

	window.MaxlengthInput = MaxlengthInput;
}(jQuery, this));
