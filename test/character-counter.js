(function( w, $ ) {
	"use strict";
	var simple;

	function commonSetup(){
		$(document).trigger("enhance");
		simple = $( "#simple" ).data( "CharacterCounter" );
	}

	QUnit.module( "Character Counter", {
		beforeEach: commonSetup
	});

	QUnit.test( "label max counting", function(assert){
		var string = simple.$el[0].value = "123";
		simple.characterCount();
		assert.equal(simple.$label.html(), (simple.max - string.length).toString());
	});

	QUnit.test( "past max counting", function(assert){
		var string = simple.$el[0].value = "1234567890";
		simple.characterCount();
		assert.equal(simple.$label.html(), 0);
	});

	QUnit.test( "label min counting", function(assert){
		var string = simple.$el[0].value = "1";
		simple.max = undefined;
		simple.characterCount();
		assert.equal(simple.$label.html(), (simple.min - string.length).toString());
	});

	QUnit.test( "past min counting reports 0", function(assert){
		var string = simple.$el[0].value = "123";
		simple.max = undefined;
		simple.characterCount();
		assert.equal(simple.$label.html(), 0);
	});

	QUnit.test( "value length counts CR + LF or LF as two characters", function(assert){
		simple.$el[0].value = "a\r\nb\nc";

		assert.equal(simple.valueLength(), 7);
	});

	QUnit.test( "plural class add, singular class remove", function(assert){
		simple.$el[0].value = "123";
		simple.$parent.attr( "class", "" );

		simple.characterCount();
		assert.ok(simple.$parent.attr( "class" ).indexOf( "plural" ) >= 0);
		assert.ok(simple.$parent.attr( "class" ).indexOf( "singular" ) == -1);
	});

	QUnit.test( "singular class add, plural class remove", function(assert){
		simple.max = 2;
		simple.$el[0].value = "1";
		simple.$parent.attr( "class", "" );

		simple.characterCount();
		assert.ok(simple.$parent.attr( "class" ).indexOf( "singular" ) >= 0);
		assert.ok(simple.$parent.attr( "class" ).indexOf( "plural" ) == -1);
	});

	QUnit.test( "max limit hit adds classes", function(assert){
		simple.max = 2;
		simple.$el[0].value = "12";
		simple.$parent.attr( "class", "" );

		simple.characterCount();
		assert.ok(simple.$parent.attr( "class" ).indexOf( "limit" ) >= 0);
		assert.ok(simple.$parent.attr( "class" ).indexOf( "max" ) >= 0);
		assert.ok(simple.$parent.attr( "class" ).indexOf( "min" ) == -1);
	});

	QUnit.test( "below min limit adds classes", function(assert){
		simple.max = undefined;
		simple.min = 3;
		simple.$el[0].value = "1234";
		simple.$parent.attr( "class", "" );

		simple.characterCount();
		assert.ok(simple.$parent.attr( "class" ).indexOf( "limit" ) >= 0);
		assert.ok(simple.$parent.attr( "class" ).indexOf( "min" ) >= 0);
		assert.ok(simple.$parent.attr( "class" ).indexOf( "max" ) == -1);
	});
})(window, shoestring);
