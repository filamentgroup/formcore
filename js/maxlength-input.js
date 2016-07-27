/*global jQuery:true*/
(function($, window){
	"use strict";

	function MaxlengthInput( el ){
		var self = this;

		this.el = el;
		this.$el = $(el);

		// prevent double init
		if( this.$el.data( "MaxlengthInput" ) ){
			return;
		}

		this.$el.data( "MaxlengthInput", this);

		this.maxlength = this.$el.attr("maxlength");

		this.$el
			.bind("keydown", function(event){
				// prevent extra text entry based on the maxlength
				self.onKeydown(event);
			})
			.bind("paste", function(event){
				// prevent extra characters in the form element from pastes
				self.onPaste(event);
			});
	}

	MaxlengthInput.allowedKeys = [
		9,	// Tab
		27, // Escape
		8,	// Backspace
		39, // ArrowRight
		37, // ArrowLeft
		38, // ArrowUp
		40	// ArrowDown
	];

	MaxlengthInput.prototype.isKeyAllowed = function( event ) {
		var isAllowed = false, key = event.keyCode;

		// indexOf not supported everywhere for arrays
		$.each(MaxlengthInput.allowedKeys, function(i, e){
			if( e === key ) {
				isAllowed = true;
			}
		});

		return event.altKey || event.ctrlKey || event.metaKey || isAllowed;
	};


	MaxlengthInput.prototype.onKeydown = function( event ){
		var self = this;

		if( this.isKeyAllowed( event ) ){
			return;
		}

		// if any character would put us at the
		if(this.valueLength() >= this.maxlength){
			event.preventDefault();
			return;
		}

		// if the user hits return and that would put the length above
		// the max, prevent the return character addition
		if(event.keyCode == 13 && this.valueLength() + 2 > this.maxlength){
			event.preventDefault();
			return;
		}

		setTimeout(function(){
			self.alterValue();
		});
	};

	MaxlengthInput.prototype.alterValue = function(){
		var newValue = this.el
				.value
				.replace(/\r\n|\n/g, "\r\n")
				.slice(0, this.maxlength);

		this.el.value = newValue;
	};

	MaxlengthInput.prototype.onPaste = function( e ){
		var self = this;

		// force the text to look right after the paste has applied
		setTimeout(function(){
			self.alterValue();
		});
	};

	MaxlengthInput.prototype.valueLength = function(check){
		return (check || this.el.value).replace(/\r\n|\n/g, "__").length;
	};

	window.MaxlengthInput = MaxlengthInput;
}(jQuery, this));
