/*! validator - v0.1.0 - 2014-04-15
* https://github.com/filamentgroup/validator
* Copyright (c) 2014 Filament Group; Licensed MIT */
(function( $, w ){
	"use strict";

	var Validator = function( element, opts ){
		if( !element ){
			throw new Error( "Element passed into Validator is not valid" );
		}
		opts = opts || {};
		opts.validatorClass = opts.validatorClass || "invalid";
		opts.$applyElement = $( opts.applyElement && opts.applyElement.length ? opts.applyElement : element );

		this.opts = opts;
		this.element = element;
		this.$element = $( element );

		this.type = this.$element.attr( "data-validate" );
		this.required = this.$element.is( "[required]" );
		this.invalidValue = this.$element.attr( "data-invalid-value" ) || "-1" ;
	};

	Validator.prototype.config = {};

	Validator.prototype.copy = {};

	Validator.prototype.validate = function(){
		var value = this.getValue(),
			result = this._isValid( value ),
			$error;

		this.opts.$applyElement[ result ? "removeClass" : "addClass" ]( "invalid" );

		$error = this.getErrorMessageElement();
		if( !result ) {
			$error.html( this.getErrorMessage( value ) );
		} else {
			$error.remove();
		}
		return result;
	};

	Validator.prototype.invalidate = function(){
		var $error;

		this.opts.$applyElement.addClass( "invalid" );
		$error = this.getErrorMessageElement();
		$error.html( this.getErrorMessage( "invalid" ) );
	};

	Validator.prototype._isSelect = function() {
		return this.element.tagName.toLowerCase() === "select";
	};

	Validator.prototype._isCheckboxRadio = function() {
		var type = this.$element.attr( 'type' );
		return type === 'radio' || type === 'checkbox';
	};

	Validator.prototype.getValue = function() {
		var $els, arr, self = this;

		if( this._isSelect() ) {
			$els = $( this.element.options[ this.element.selectedIndex ] );
		} else if( this._isCheckboxRadio() ) {
			$els = this.$element.closest( "form, body" ).find( '[name="' + this.$element.attr( 'name' ) + '"]:checked' );
		}

		if( $els ) {
			arr = [];
			$els.each(function(){
				if( this.value !== "" && this.value !== self.invalidValue ){
					arr.push(this.value !== "" ? this.value : null);
				}
			});
			return arr;
		}

		return this.element.value;
	};

	Validator.prototype._isValid = function( value ) {
		var result = false,
			method = this[ 'validate' + this.type ];
	
		if( typeof value === "undefined" || value === null ) {
			return !this.required;
		}

		if( value.length ) {//string or array
			if( !this.type ){
				result = true;
			} else if( this.type && method ){
				result = method.call( this, value );
			}
		} else {
			result = !this.required;
		}

		return result;
	};

	Validator.prototype.getErrorMessageElement = function() {
		var callback = this.opts.getErrorAnchor,
			$anchor = callback ? callback.call( this ) : this.opts.$applyElement,
			isPlaceBefore = $anchor.is( '[data-validate-before]' ),
			$existingError = $anchor[ isPlaceBefore ? 'prev' : 'next' ]().filter( '.error-msg' );

		return $existingError.length ? $existingError : $( '<div>' ).addClass( 'error-msg' )[ isPlaceBefore ? 'insertBefore' : 'insertAfter' ]( $anchor );
	};

	/*
		Order of message selection, if they exist:

		{TYPE} is `required` or the key from `data-validate`:
			this.message{TYPE}()
			data-message
			data-{TYPE}-message
			this.copy.{TYPE}.message
	 */
	Validator.prototype.getErrorMessage = function( value ) {
		var key, msg;
		if( !(value && value.length) ){
			key = "required";
		} else {
			key = this.type;
		}
		msg = this.$element.attr( "data-message" ) ||
			this.$element.attr( "data-" + key + "-message" ) ||
			this.copy[ key ].message;

		return this[ "message" + key ] ?
			this[ "message" + key ].call( this, value, msg ) :
			msg;
	};

	w.Validator = Validator;

}( jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validatebirthday = function( val ){
    var result = false;

    if ( new RegExp( this.config.birthday.pattern ).test( val ) ) {
      result = val;
    }

    return result;
  };

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validateminlength = function( val ){
    var result = false,
        pattern = "^[0-9]{"+ this.$element.attr( "minlength" ) +"}$";

    if ( new RegExp( pattern ).test( val ) ) {
      result = val;
    }

    return result;
  };

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validateccexpiration = function( value ){
    var result = false;

    if ( new RegExp( this.config.ccexpiration.pattern ).test( value ) ) {
      result = true;
    }

    return result;
  };

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype._getCreditType = function( value ) {
    var card,
      cards = this.config.credit;

    for ( var i = 0; i < cards.length; i++ ) {
      card = cards[ i ];

      if ( new RegExp( card.regex ).test( value ) ) {
        return card;
      }
    }
  };

  Validator.prototype._findCreditField = function() {
    return this.$element.closest( "form" ).find( "[data-validate=credit]" );
  };

  Validator.prototype._findCvvField = function() {
    return this.$element.closest( "form" ).find( "[data-validate=cvv]" );
  };

  Validator.prototype.validatecvv = function( number ){
    if( isNaN( parseInt( number, 10 ) ) || parseInt( number, 10 ) < 0 ){
      return;
    }

    var cc = this._findCreditField(),
      result = false,
      card = this._getCreditType( cc[ 0 ].value );

    if( card && card.id ){
      result = number.toString().length === parseInt( card.cvvlength, 10 );
    }

    return result;
  };

  Validator.prototype.messagecvv = function(){
    var cc = this._findCreditField(),
      card = this._getCreditType( cc[ 0 ].value );

    return card && this.copy.cvv[ card.id ].message || this.copy.cvv.message;
  };

  Validator.prototype.validatecredit = function( value ){
    var number = value.replace( /\s/g , '').replace( /-/g, ''),
      card = this._getCreditType( number ),
      cvv = card && this.copy.cvv;

    if( card && cvv ) {
      this._findCvvField().attr( 'placeholder', cvv[ card.id ].placeholder );
    }

    return card && new RegExp( card.fullRegex ).test( number ) || false;
  };

  Validator.prototype.messagecredit = function( value ) {
    var card = this._getCreditType( value );

    return card && this.copy.credit[ card.id ].message || this.copy.credit.message;
  };

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validateemail = function( address ){
    var result = false;

    if ( new RegExp( this.config.email.pattern ).test( address ) ) {
      result = address;
    }

    return result;
  };
}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype._getValueLength = function( value ){
    if( this.$element.is( "[data-words]" ) ) {
      return value.match(/[^\s]+/g).length;
    }

    return value.length;
  };

  Validator.prototype._getMaxLength = function(){
    return this.$element.attr( "maxlength" ) || this.$element.attr( "data-maxlength" );
  };

  Validator.prototype.validatelength = function( value ){
    var result = false,
      min = this.$element.attr( "minlength" ),
      max = this._getMaxLength(),
      len = this._getValueLength( value );

    if( ( !min || len >= min ) && ( !max || len <= max ) ) {
      result = true;
    }

    return result;
  };

  Validator.prototype.messagelength = function( value, msg ){
    var min = this.$element.attr( "minlength" ),
      max = this._getMaxLength(),
      len = this._getValueLength( value ),
      msgType;

    if( this._isSelect() || this._isCheckboxRadio() ) {
      msgType = msg.options;
    } else if( this.$element.is( "[data-words]" ) ) {
      msgType = msg.words;
    } else {
      msgType = msg.characters;
    }

    if( min && len < min ) {
      return ( ( min !== 1 ? msgType.plural.minlength : msgType.singular.minlength ) || msg ).replace( /\{\d\}/g, min );
    } else if( max && len > max ) {
      return ( ( max !== 1 ? msgType.plural.maxlength : msgType.singular.maxlength ) || msg ).replace( /\{\d\}/g, max );
    }
  };

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validatenumeric = function( value ){
    var result = false;

    if ( new RegExp( this.config.numeric.pattern ).test( value ) ) {
      result = true;
    }

    return result;
  };

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validatepassword = function( val ){
    // TODO move functions out to methods
    var result = false,
      isCorrectLength = function( pw ){
        if( typeof pw === "string" && pw.length > 5 && pw.length < 16 ){
          return true;
        }
      },
      hasNumber = function( pw ){
        if( typeof pw === "string" && pw.match( /\d/ ) ){
          return true;
        }
      },
      hasLowerCase = function( pw ){
        if( typeof pw === "string" && pw.match( /[a-z]/ ) ){
          return true;
        }
      },
      hasUpperCase = function( pw ){
        if( typeof pw === "string" && pw.match( /[A-Z]/ ) ){
          return true;
        }
      };

      if( isCorrectLength( val ) && hasUpperCase( val ) && hasLowerCase( val ) && hasNumber( val ) ){
        result = val;
      }

    return result;
  };


}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {

  Validator.prototype.validatepasswordconfirm = function( val ){
    var $form = this.$element.closest( "form" ),
      passwords = $form.find( "[data-validate=password]" ),
      result = false,
      pw;

    if( passwords.length !== 1 ) {
      passwords = $form.find( "[data-passwordconfirm]");
    }

    if( passwords.length ){
      pw = passwords[0].value;
      if( pw === val ){
        result = val;
      }
    }

    return result;
  };

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {
  Validator.prototype.validatephone = function( val ){
    var result = false;

    if ( new RegExp( this.config.phone.pattern ).test( val ) ) {
      result = val;
    }

    return result;
  };

}( Validator, jQuery, this ));

/* global Validator:true */
/* global jQuery:true */
(function( Validator, $, window, undefined ) {
  Validator.prototype.validatezip = function( number ){
    // TODO move the data.validator reference to parameter of the constructor
    var result = false;

    if ( new RegExp( this.config.zip.pattern ).test( number ) ) {
      result = number;
    }

    return result;
  };
}( Validator, jQuery, this ));
