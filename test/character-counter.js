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

	test( "value length counts CR + LF or LF as two characters", function(){
		simple.$el[0].value = "a\r\nb\nc";

		equal(simple.valueLength(), 7);
	});

	test( "plural class add, singular class remove", function(){
		simple.$el[0].value = "123";
		simple.$parent.attr( "class", "" );

		simple.characterCount();
		ok(simple.$parent.attr( "class" ).indexOf( "plural" ) >= 0);
		ok(simple.$parent.attr( "class" ).indexOf( "singular" ) == -1);
	});

	test( "singular class add, plural class remove", function(){
		simple.max = 2;
		simple.$el[0].value = "1";
		simple.$parent.attr( "class", "" );

		simple.characterCount();
		ok(simple.$parent.attr( "class" ).indexOf( "singular" ) >= 0);
		ok(simple.$parent.attr( "class" ).indexOf( "plural" ) == -1);
	});

	test( "max limit hit adds classes", function(){
		simple.max = 2;
		simple.$el[0].value = "12";
		simple.$parent.attr( "class", "" );

		simple.characterCount();
		ok(simple.$parent.attr( "class" ).indexOf( "limit" ) >= 0);
		ok(simple.$parent.attr( "class" ).indexOf( "max" ) >= 0);
		ok(simple.$parent.attr( "class" ).indexOf( "min" ) == -1);
	});

	test( "below min limit adds classes", function(){
		simple.max = undefined;
		simple.min = 3;
		simple.$el[0].value = "1234";
		simple.$parent.attr( "class", "" );

		simple.characterCount();
		ok(simple.$parent.attr( "class" ).indexOf( "limit" ) >= 0);
		ok(simple.$parent.attr( "class" ).indexOf( "min" ) >= 0);
		ok(simple.$parent.attr( "class" ).indexOf( "max" ) == -1);
	});
})(window, shoestring);
