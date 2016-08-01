(function( w, $ ) {
	"use strict";
	var $simple;

	function commonSetup(){
		$(document).trigger("enhance");
		$simple = $( "#simple" );
	}

	module( "Methods", {
		setup: commonSetup
	});

	test("truth", function(){
		ok($simple.length);
	});
})(window, shoestring);
