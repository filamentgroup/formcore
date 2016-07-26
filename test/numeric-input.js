(function( w, $ ) {
	"use strict";

	function commonSetup(){
		$(document).trigger("enhance");
	}

	module( "Constructor", {
		setup: commonSetup
	});

	test("initMaxLength", function(){
		var simple = $( "#simple" ).data( "NumericInput" );

		simple.initMaxlength();
		equal(simple.maxLength, Infinity);

		simple.$el.attr("maxlength", 10);
		simple.initMaxlength();
		equal(simple.maxLength, 10);

		simple.$el.removeAttr("maxlength");
		simple.$el.attr("max", 200);
		simple.initMaxlength();
		equal(simple.maxLength, 3);
	});
})(window, shoestring);
