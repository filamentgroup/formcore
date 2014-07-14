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
    opts.title = opts.title || "L’annuncio è incompleta!";
    opts.message = opts.message || "Si prega di ricontrollare il modulo sottostante e completare le informazioni richieste evidenziato in rosso."

    this.opts = opts;
    this.element = element;
  };

  ValidatorForm.prototype._createMarkup = function(){
    return $( "<div class='validator-form'><div class='title ki-icon-status-error'>" + this.opts.title + "</div><p>" + this.opts.message + "</p></div>" );
  };

  ValidatorForm.prototype._bindEvents = function(){
    var self = this;
    $( w.document ).bind( 'error.validator', function( e ) {
      self._createMarkup().prependTo( e.target );
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
