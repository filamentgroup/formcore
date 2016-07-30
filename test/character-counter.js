(function( w, $ ) {
	"use strict";
	var simple;

	function commonSetup(){
		$(document).trigger("enhance");
		simple = $( "#simple" ).data( "CharacterCounter" );
	}

	module( "Character Counter", {
		setup: commonSetup
	});

	test( "label counting", function(){
		var string = simple.$el[0].value = "123";
		simple.$el.trigger( "keyup" );
		equal(simple.$label.html(), (10 - string.length).toString());
	});
})(window, shoestring);
