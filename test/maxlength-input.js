(function( w, $ ) {
	"use strict";
	var simple;

	function commonSetup(){
		$(document).trigger("enhance");
		simple = $( "#simple" ).data( "MaxlengthInput" );
	}

	module( "Methods", {
		setup: commonSetup
	});

	test("truth", function(){
		ok(true);
	});
})(window, shoestring);
