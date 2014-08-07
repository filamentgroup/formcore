/*
 * ValidatorForm (page validation) component
 *
 * Copyright (c) 2014 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $, w, undefined ){
  "use strict";

  var ValidatorForm = function( element, opts ){
    if( !element ){
      throw new Error( "Element passed into ValidatorForm is not defined" );
    }
    opts = opts || {};
    opts.title = opts.title || "The form is invalid";
    opts.message = opts.message || "Please review the form below and complete the required information.";

    this.opts = opts;
    this.element = element;
		this.errorShowing = false;
  };

  ValidatorForm.prototype._createMarkup = function(){
    return $( "<div class='validator-form'><div class='title ki-icon-status-error'>" + this.opts.title + "</div><p>" + this.opts.message + "</p></div>" );
  };

  ValidatorForm.prototype._bindEvents = function(){
    var self = this;
    $( self.element ).bind( 'error.validator', function( e ) {
			if( !self.errorShowing ){
				self._createMarkup().prependTo( e.target );
				self.errorShowing = true;
			}
    });
  };

  ValidatorForm.prototype.init = function(){
    if( $( this.element ).data( "validatorform" ) ){
      return;
    }
    this._bindEvents();
    $( this.element ).data( "validatorform", this );
  };

  ( w.componentNamespace = w.componentNamespace || w ).ValidatorForm = ValidatorForm;

}( jQuery, this ));
