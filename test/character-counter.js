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

	test( "label max counting", function(){
		var string = simple.$el[0].value = "123";
		simple.characterCount();
		equal(simple.$label.html(), (simple.max - string.length).toString());
	});

	test( "past max counting", function(){
		var string = simple.$el[0].value = "1234567890";
		simple.characterCount();
		equal(simple.$label.html(), 0);
	});

	test( "label min counting", function(){
		var string = simple.$el[0].value = "1";
		simple.max = undefined;
		simple.characterCount();
		equal(simple.$label.html(), (simple.min - string.length).toString());
	});

	test( "past min counting reports 0", function(){
		var string = simple.$el[0].value = "123";
		simple.max = undefined;
		simple.characterCount();
		equal(simple.$label.html(), 0);
	});
})(window, shoestring);
