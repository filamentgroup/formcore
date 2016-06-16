/*global jQuery:true*/
(function($, window){
	"use strict";

	var NumericInput = function( el ){
		this.el = el;
		this.$el = $( el );
		this.allowFloat = this.$el.is( '[data-float]' );

		var ua, isFirefoxDesktop, self = this;
		ua = navigator.userAgent.toLowerCase();

		// Issue #267 and #521
		// https://github.com/filamentgroup/lm-esales/issues/267
		// https://github.com/filamentgroup/lm-esales/issues/521
		// The goal is to target Firefox on Mac OS, Windows, and Linux (desktop)
		// UA ref from MDN for Firefox:
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Gecko_user_agent_string_reference
		// NOTE if they make one for windows mobile it may match "Windonws"
		isFirefoxDesktop = /Windows|Macintosh|Linux/.test(ua) && /Firefox/.test(ua);

		if( isFirefoxDesktop ){
			if( this.$el.attr( "type" ) === "number" ) {
				this.$el.attr( "type", "text" );
			}
		}

		this.isNavDisabled =
			(this.$el.attr("data-numeric-input-nav-disabled") !== null &&
			 this.$el.attr("data-numeric-input-nav-disabled") !== undefined) ||
			(this.$el.attr("class") || "").indexOf("formcore-disable-spinner") >= 0;

		this.$el.on( "focus", function( e ) {
			self.initMaxlength();
		}).on( "keydown", function( e ) {
			self.onKeydown.call( self, e );
		}).on( "paste", function( e ){
			self.onPaste( e );
		});
	};

	NumericInput.allowedKeys = [
		8, // Backspace
		9, // Tab
		13, // Enter
		27, // Escape
		33, // Pgup
		34, // Pgdown
		35, // End
		36, // Home
		37, // ArrowLeft
		38, // ArrowUp
		39, // ArrowRight
		40, // ArrowDown
		46 // Delete
	];

	NumericInput.prototype.initMaxlength = function(){
		// if maxLength isn't defined on `$el` then `parseInt` will return
		// `NaN` which is falsey meaning there is no max length. The max length
		// is then `Infinity`.

		// Will also accept the number of digits in max
		this.maxLength = parseInt( this.$el.attr( "maxlength" ), 10 ) ||
			( "" + ( Math.abs( parseInt( this.$el.attr( "max" ), 10 ) ) || "" ) ).length ||
			Infinity;
	};

	NumericInput.prototype.isCodeNumeric = function( code ){
		return code >= 48 && code <= 57 ||
			code >= 96 && code <= 105;
	};

	NumericInput.prototype.isCodeDecimalPoint = function( code ){
		return code === 110 || code === 190; // different keycodes for numpad
	};

	NumericInput.prototype.onKeydown = function( event ){
		var prevented = false;
		// The key pressed is allowed, no exceptions
		// modifier keys and keys listed in allowedKeys property

		if( this.isKeyAllowed( event ) ){
			return;
		}
		if (event.keyCode !== undefined) {
			var code = event.keyCode;

			prevented = !this.isCodeNumeric( code ) &&
				!this.isInputTextSelected() &&
				( !this.allowFloat || !this.isCodeDecimalPoint( code ) );

			if( this.allowFloat && this.isCodeDecimalPoint( code ) && this.el.value.length && this.el.value.indexOf( '.' ) > -1 ) {
				prevented = true;
			}
		}

		// Suppress "double action" if event prevented
		//
		// Kill keypress if the max length has been exceeded and the text
		// in the field isn't selected.
		//
		// Note that numeric inputs are not included in the types that
		// support the `maxlength` attribute. `max` support is failing in
		// our testing
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
		// (see `maxlength`)
		if((this.isMaxLengthExceeded() && !this.isInputTextSelected()) || prevented) {
			event.preventDefault();
		}
	};

	NumericInput.prototype.onPaste = function( e ){
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
		this.el.value = pastedText.replace(/[^0-9\.,]*/g, "");

		// prevent the original paste behavior
		event.preventDefault();
	};

	NumericInput.prototype.isKeyAllowed = function( event ) {
		var isAllowed = false, key = event.keyCode;

		// indexOf not supported everywhere for arrays
		$.each(NumericInput.allowedKeys, function(i, e){
			if( e === key ) {
				isAllowed = true;
			}
		});

		// the up/down arrow key numeric navigation of values may be disabled
		if( this.isNavDisabled && (key == 38 || key == 40) ){
			isAllowed = false;
		}

		return event.altKey || event.ctrlKey || event.metaKey || isAllowed;
	};

	NumericInput.prototype.isMaxLengthExceeded = function() {
		return this.maxLength && this.$el.val().length >= this.maxLength;
	};

	NumericInput.prototype.isInputTextSelected = function() {
		var selectionText;

		// if most browsers
		// else if ie8 or lower
		if (window.getSelection) {
			selectionText = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			selectionText = document.selection.createRange().text;
		}
		return selectionText ? this.$el.val().indexOf(selectionText) > -1 : false;
	};

	window.NumericInput = NumericInput;
}(jQuery, this));
