(function( w, $ ) {
	"use strict";
	var simple;

	function commonSetup(){
		$(document).trigger("enhance");
		simple = $( "#simple" ).data( "NumericInput" );
	}

	module( "Methods", {
		setup: commonSetup
	});

	test("initMaxlength", function(){
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

	test("isNumeric key range", function(){
		// first range from 48 to 57
		ok(!simple.isNumeric(47));
		ok(simple.isNumeric(48));
		ok(simple.isNumeric(57));
		ok(!simple.isNumeric(58));

		// second range from 96 to 105
		ok(!simple.isNumeric(95));
		ok(simple.isNumeric(96));
		ok(simple.isNumeric(105));
		ok(!simple.isNumeric(106));
	});

	test("isMetaKeyAllowed", function(){
		ok(simple.isMetaKeyAllowed(event = {
			keyCode: -1,
			altKey: true
		}));

		ok(simple.isMetaKeyAllowed(event = {
			keyCode: -1,
			ctrlKey: true
		}));

		ok(simple.isMetaKeyAllowed(event = {
			keyCode: -1,
			metaKey: true
		}));

		$.each(window.NumericInput.allowedKeys, function(i, k){
			ok(simple.isMetaKeyAllowed(event = {
				keyCode: k
			}));
		});

		ok(simple.isMetaKeyAllowed(event = {
			keyCode: 38
		}));

		simple.isNavDisabled = true;
		ok(!simple.isMetaKeyAllowed(event = {
			keyCode: 38
		}));
	});
})(window, shoestring);
