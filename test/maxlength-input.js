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

	test("isKeyAllowed", function(){
		ok(simple.isKeyAllowed(event = {
			keyCode: -1,
			altKey: true
		}));

		ok(simple.isKeyAllowed(event = {
			keyCode: -1,
			ctrlKey: true
		}));

		ok(simple.isKeyAllowed(event = {
			keyCode: -1,
			metaKey: true
		}));

		$.each(window.MaxlengthInput.allowedKeys, function(i, k){
			ok(simple.isKeyAllowed(event = {
				keyCode: k
			}));
		});

		ok(simple.isKeyAllowed(event = {
			keyCode: 38
		}));
	});
})(window, shoestring);
