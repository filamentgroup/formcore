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

	test("onKeydown always allowed keycode", function(){
		expect(0);

		// mock alter value to signal that the method has completed, for these tests
		// it should never complete
		simple.alterValue = function(){
			ok(false, "alterValue called");
		};

		simple.onKeydown({
			keyCode: MaxlengthInput.allowedKeys[0]
		});
	});

	test("onKeydown should prevent default for single non return char", function(){
		expect(1);

		function preventDefault(){
			ok(true, "default prevented");
		}

		// mock alter value to signal that the method has completed, for these tests
		// it should never complete
		simple.alterValue = function(){
			ok(false, "alterValue called");
		};

		// max length for this text area is one, set a value that matches
		simple.$el.val("1");

		// with a value for the text area that matches the max length the
		// default behavior for an additional character should be to prevent
		// the default
		simple.onKeydown({
			keyCode: 48,
			preventDefault: preventDefault
		});
	});

	test("onKeydown should prevent default for return char", function(){
		expect(1);

		function preventDefault(){
			ok(true, "default prevented");
		}

		// mock alter value to signal that the method has completed, for these tests
		// it should never complete
		simple.alterValue = function(){
			ok(false, "alterValue called");
		};

		// max length for this text area is one, make sure it's empty
		// then the addition of a return character should exceed one
		// since we treat returns as two characters
		simple.$el.val("");

		// with a value for the text area that matches the max length the
		// default behavior for an additional character should be to prevent
		// the default
		simple.onKeydown({
			// 13 = return
			keyCode: 13,
			preventDefault: preventDefault
		});
	});

	asyncTest("onKeydown should call alter value", function(){
		expect(1);

		function preventDefault(){
			ok(false, "default prevented");
		}

		// mock alter value to signal that the method has completed, for these tests
		// it should never complete
		simple.alterValue = function(){
			ok(true, "alterValue called");
			start();
		};

		// max length for this text area is one empty it to accept the char
		simple.$el.val("");

		// with a value for the text area that is empty the behavior for an
		// additional character should be to allow it and alter the value
		simple.onKeydown({
			keyCode: 48,
			preventDefault: preventDefault
		});
	});
})(window, shoestring);
