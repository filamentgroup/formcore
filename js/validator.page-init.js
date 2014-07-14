/*
 * page validator component init
 *
 * Copyright (c) 2014 Filament Group, Inc.
 * Licensed under MIT
 */
(function( $ ) {

  var pluginName = "validatorform",
    initSelector = "[data-" + pluginName + "]";

  $.fn[ pluginName ] = function(){
    return this.each(function(){
      var $t = $( this );
      new window.componentNamespace.ValidatorForm( this, {
        title: $t.attr( "data-error-title" ),
        message: $t.attr( "data-error-message" )
      }).init();
    });
  };

  // auto-init on enhance (which is called on domready)
  $( document ).bind( "enhance", function( e ){
    $( initSelector, e.target )[ pluginName ]();
  });

}( jQuery, this ));
