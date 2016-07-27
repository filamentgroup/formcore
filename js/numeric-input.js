/*global jQuery:true*/
(function($, window){
	"use strict";

	function NumericInput( el ){
		this.el = el;
		this.$el = $( el );

		// prevent double init
		if( this.$el.data( "NumericInput" ) ){
			return;
		}

		this.$el.data( "NumericInput", this);

		this.allowFloat =
			this.$el.is( '[data-float]' ) || this.$el.is( '[data-numeric-input-float]' );
		this.allowNegative = this.$el.is( '[data-numeric-input-negative]' );

		var ua, isFirefoxDesktop, isSafari6, self = this;
		ua = navigator.userAgent.toLowerCase();

		// Issue #267 and #521
		// https://github.com/filamentgroup/lm-esales/issues/267
		// https://github.com/filamentgroup/lm-esales/issues/521
		// The goal is to target Firefox on Mac OS, Windows, and Linux (desktop)
		// UA ref from MDN for Firefox:
		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Gecko_user_agent_string_reference
		// NOTE if they make one for windows mobile it may match "Windonws"
		isFirefoxDesktop = /windows|macintosh|linux/.test(ua) && /firefox/.test(ua);

		// Safari 6 removes leading zeros with type="number"
		// This is a bad user agent sniff but is limited to an outdated version
		// of Safari (this bug is fixed in 7+). This behavior cannot be feature
		// tested due to the bug not exhibiting when setting the .value property.
		isSafari6 = !!ua.match( /safari/i ) && !!ua.match( /version\/6\./i ) && !window.chrome;

		if( isFirefoxDesktop || isSafari6 ){
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

	// Reference: https://github.com/wesbos/keycodes/blob/gh-pages/scripts.js
	NumericInput.prototype.isNumeric = function( code ){
		return code >= 48 && code <= 57 ||
			code >= 96 && code <= 105;
	};

	NumericInput.prototype.isCodeDecimalPoint = function( code ){
		return code === 110 || code === 190;
	};

	NumericInput.prototype.isCodeNegativeSign = function( code ){
		return code === 109 || code === 173 || code === 189;
	};

	NumericInput.prototype.onKeydown = function( event ){
		var allowed = false;
		var code = event.keyCode;

		// modifier keys and keys listed in allowedKeys property
		if( !code || this.isMetaKeyAllowed( event ) ){
			allowed = true;
		} else if( this.isNumeric( code ) && !event.shiftKey ) {
			allowed = true;
		// typing when maxlength exceeded only if text selected
		} else if( this.isMaxLengthExceeded() && this.isInputTextSelected() ) {
			allowed = true;
		// allow negative signs
		} else if( this.allowNegative && this.isCodeNegativeSign( code ) && ( !this.el.value.length || this.el.value.indexOf( '-' ) === -1 ) ) {
			allowed = true;
		// allow decimal points
		} else if( this.allowFloat && this.isCodeDecimalPoint( code ) && ( !this.el.value.length || this.el.value.indexOf( '.' ) === -1 ) ) {
			allowed = true;
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
		if( !allowed ) {
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
		this.el.value = pastedText
			// remove signs that appear inside the string
			.replace(/(.+)\-(.+)/g, "$1$2")

			// remove all decimals beside the first
			.replace(/(.+[\.,].+)\.(.+)/g, "$1$2")

			// remove any non float/integer characters left
			.replace(/[^0-9\.\-,]*/g, "");

		// prevent the original paste behavior
		event.preventDefault();
	};

	NumericInput.prototype.isMetaKeyAllowed = function( event ) {
		var isAllowed = false, key = event.keyCode;

		// indexOf not supported everywhere for arrays
		$.each(NumericInput.allowedKeys, function(i, e){
			if( e === key ) {
				isAllowed = true;
			}
		});

		// the up/down arrow key numeric navigation of values may be disabled
		if( this.isNavDisabled && ( key == 38 || key == 40 ) ){
			isAllowed = false;
		}

		return event.altKey || event.ctrlKey || event.metaKey || isAllowed;
	};

	NumericInput.prototype.isMaxLengthExceeded = function() {
		return this.maxLength && this.$el.val().length >= this.maxLength;
	};

	NumericInput.prototype.isInputTextSelected = function() {
		var selectionText;

		// if firefox
		// use try-catch otherwise we get InvalidStateError when using selectionStart on type="number" in Chrome
		try {
			if( !isNaN( this.el.selectionStart ) || !isNaN( this.el.selectionEnd ) ) {
				return Math.abs( this.el.selectionStart - this.el.selectionEnd ) > 0;
			}
		} catch(e) {}

		// else if most browsers
		// else if ie8 or lower
		if( window.getSelection ) {
			selectionText = window.getSelection().toString();
		} else if( document.selection && document.selection.type != "Control" ) {
			selectionText = document.selection.createRange().text;
		}

		return selectionText ? this.$el.val().indexOf(selectionText) > -1 : false;
	};

	window.NumericInput = NumericInput;
}(jQuery, this));
