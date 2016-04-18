/*global jQuery:true*/
(function($, window){
	"use strict";

	var NumericInput = function( el ){
		this.el = el;
		this.$el = $( el );
		this.allowFloat = this.$el.is( '[data-float]' );

		var ua, isFirefoxDesktop;
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

		// if maxLength isn't defined on `$el` then `parseInt` will return
		// `NaN` which is falsey meaning there is no max length. The max length
		// is then `Infinity`.
		this.maxLength = parseInt(this.$el.attr( "maxlength" ), 10) || Infinity;
		this.$el.on( "keypress", $.proxy(this.onKeypress, this));
	};

	NumericInput.allowedKeys = [
		"Tab",
		"Enter",
		"Escape",
		"Backspace",
		"ArrowRight",
		"ArrowLeft",
		"."
	];

	NumericInput.prototype.onKeypress = function( event ){
		var prevented = false;

		// The key pressed is allowed, no exceptions
		// modifier keys and keys listed in allowedKeys property
		if( this.isKeyAllowed( event ) ){
			return;
		}

		if (event.key !== undefined) {
			var key = event.key;
			// handle anything that's not a number
			prevented = isNaN(parseInt(key, 10));
		} else if (event.keyCode !== undefined) {
			var code = event.keyCode;
			// allow '.', return
			// disallow anything less than 48 or greater than 57
			prevented = (code < 48 || code > 57) &&
				code !== 13 &&
				( !this.allowFloat || code !== 46 );

			if( this.allowFloat && code === 46 && this.el.value.length && this.el.value.indexOf( '.' ) > -1 ) {
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

	NumericInput.prototype.isKeyAllowed = function( event ) {
		var isAllowed = false, key = event.key;

		// indexOf not supported everywhere for arrays
		$.each(NumericInput.allowedKeys, function(i, e){
			if( e === key ) { isAllowed = true;	 }
		});

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
