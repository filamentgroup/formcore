/*! validator - v0.1.0 - 2014-04-15
* https://github.com/filamentgroup/validator
* Copyright (c) 2014 Filament Group; Licensed MIT */
/* global Validator:true */
/* global jQuery:true */
(function( $, window, undefined ) {

	var pluginName = "validator",
		dataKey = pluginName,
		formSubmitErrorEventName = 'error.validator',
		initSelector = "[required],[data-validate]";

	$.fn[ pluginName ] = function(){
		return this.each(function(){
			var $el = $( this );

			if( $el.data( dataKey ) ) {
				return;
			}

			var validator = new Validator( this, {
				applyElement: $el.closest( ".form-group" ),
				getErrorAnchor: function() {
					return this.$element.closest( "input:not([type=checkbox]), textarea, .btn, label.checkbox" );
				}
			});

			$el.data( dataKey, validator );

			$el.bind( "blur", function() {
				validator.validate();
				if( this.checkValidity ){
					this.checkValidity();
				}
			});

			$el.bind( "invalid", function(){
				if( !(this.validity && this.validity.patternMismatch) ){
					validator.invalidate();
				}
			});

			$el.closest( "form" ).bind( "submit", function( e ){
				if( !validator.validate() ){
					e.preventDefault();
					$( this ).trigger( formSubmitErrorEventName );
				}
			});
		});
	};

	// auto-init on enhance (which is called on domready)
	$( document ).bind( "enhance", function( e ){
		$( initSelector, e.target )[ pluginName ]();
	});

}( jQuery, this ));
