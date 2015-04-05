/*global jQuery:true*/
(function($, window){
	"use strict";

	var Toggler = function( groupEl ){
		this.groupEl = groupEl;
		this.$groupEl = $( groupEl );
		this.input = this.$groupEl.find( "input, textarea" );

		this.viewerContainer = $( "<span>" )
														.addClass( "toggle-container" )
														.appendTo( this.$groupEl );
		this.viewer = $( "<span>" )
									.addClass( "toggleval" )
									.addClass( "hidden" )
									.appendTo( this.viewerContainer );

		this.$groupEl.data( "Toggler", this );
	};

	Toggler.prototype.hide = function(){
		this.viewer.addClass( "hidden" );
	};

	Toggler.prototype.show = function(){
		this.update();
		this.viewer.removeClass( "hidden" );
	};

	Toggler.prototype.update = function(){
		if( this.input.length ){
			this.viewer[0].innerHTML = this.input.val() || "None";
		}
	};

	window.Toggler = Toggler;
}(jQuery, this));
