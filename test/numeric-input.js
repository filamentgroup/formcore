(function( w, $ ) {
	"use strict";
	var simple;

	function commonSetup(){
		$(document).trigger("enhance");
		simple = $( "#simple" ).data( "NumericInput" );
	}

	QUnit.module( "Methods", {
		beforeEach: commonSetup
	});

	QUnit.test("updateMaxlength", function(assert){
		simple.updateMaxlength();
		assert.equal(simple.maxLength, Infinity);

		simple.$el.attr("maxlength", 10);
		simple.updateMaxlength();
		assert.equal(simple.maxLength, 10);

		simple.$el.removeAttr("maxlength");
		simple.$el.attr("max", 200);
		simple.updateMaxlength();
		assert.equal(simple.maxLength, 3);
	});

	QUnit.test("isNumeric key range", function(assert){
		// first range from 48 to 57
		assert.ok(!simple.isNumeric(47));
		assert.ok(simple.isNumeric(48));
		assert.ok(simple.isNumeric(57));
		assert.ok(!simple.isNumeric(58));

		// second range from 96 to 105
		assert.ok(!simple.isNumeric(95));
		assert.ok(simple.isNumeric(96));
		assert.ok(simple.isNumeric(105));
		assert.ok(!simple.isNumeric(106));
	});

	QUnit.test("isMetaKeyAllowed", function(assert){
		assert.ok(simple.isMetaKeyAllowed(event = {
			keyCode: -1,
			altKey: true
		}));

		assert.ok(simple.isMetaKeyAllowed(event = {
			keyCode: -1,
			ctrlKey: true
		}));

		assert.ok(simple.isMetaKeyAllowed(event = {
			keyCode: -1,
			metaKey: true
		}));

		$.each(window.NumericInput.allowedKeys, function(i, k){
			assert.ok(simple.isMetaKeyAllowed(event = {
				keyCode: k
			}));
		});

		assert.ok(simple.isMetaKeyAllowed(event = {
			keyCode: 38
		}));

		simple.isNavDisabled = true;
		assert.ok(!simple.isMetaKeyAllowed(event = {
			keyCode: 38
		}));
	});

	QUnit.test("onKeydown prevented", function(assert){
		assert.expect(6);

		simple.maxLength = 0;

		simple.onKeydown({
			preventDefault: function(){
				assert.ok(true, "preventDefault called");
			},

			// space
			keyCode: 32
		});

		// prevents extra decimal points
		simple.$el.val( "1." );
		simple.onKeydown({
			preventDefault: function(){
				assert.ok(true, "preventDefault called");
			},

			// `.`
			keyCode: 190
		});

		// prevents extra minus
		simple.$el.val( "-1" );
		simple.allowNegative = true;
		simple.onKeydown({
			preventDefault: function(){
				assert.ok(true, "preventDefault called");
			},

			// `-`
			keyCode: 189
		});

		// prevents extra minus
		simple.el.value = "-1";
		simple.allowNegative = true;
		simple.onKeydown({
			preventDefault: function(){
				assert.ok(true, "preventDefault called");
			},

			// `-`
			keyCode: 189
		});

		simple.onKeydown({
			preventDefault: function(){
				assert.ok(true, "preventDefault called");
			},

			// `1`
			keyCode: 49,
			shiftKey: true
		});

		simple.maxLength = 0;
		simple.el.value = "";
		simple.onKeydown({
			preventDefault: function(){
				assert.ok(true, "preventDefault called");
			},

			// `1`
			keyCode: 49
		});
});

	QUnit.test("onKeydown not prevented", function(assert){
		assert.expect(0);

		simple.onKeydown({
			preventDefault: function(){
				assert.ok(false, "preventDefault called");
			},
			metaKey: true
		});

		// allows decimals
		simple.allowFloat = true;
		simple.$el.val( "1" );
		simple.onKeydown({
			preventDefault: function(){
				assert.ok(false, "preventDefault called");
			},

			// `.`
			keyCode: 190
		});

		// prevents extra minus
		simple.$el.val( "" );
		simple.allowNegative = true;
		simple.onKeydown({
			preventDefault: function(){
				assert.ok(false, "preventDefault called");
			},

			// `-`
			keyCode: 189
		});

		simple.onKeydown({
			preventDefault: function(){
				assert.ok(false, "preventDefault called");
			},

			// `1`
			keyCode: 49
		});

		simple.maxLength = 1;
		simple.el.value = "";
		simple.onKeydown({
			preventDefault: function(){
				assert.ok(false, "preventDefault called");
			},

			// `1`
			keyCode: 49
		});
	});

	function testOnPaste(pasted, value, assert){
		simple.onPaste({
			preventDefault: function(){
				assert.ok(true, "preventDefault called");
			},
			clipboardData: {
				getData: function(){
					return pasted;
				}
			}
		});

		assert.equal(simple.el.value, value);
	}

	QUnit.test("onPaste", function(assert){
		// one for prevent default, one for the check
		// the final test doesn't prevent default
		assert.expect(15);
		testOnPaste("123", "123", assert);
		testOnPaste("-1.23", "-1.23", assert);
		testOnPaste("12a3", "123", assert);
		testOnPaste("-123", "-123", assert);
		testOnPaste("-1-23", "-123", assert);
		testOnPaste("-1.2.-3", "-1.23", assert);
		testOnPaste("-.2.-3", "-.23", assert);

		// empty paste values will be ignored
		simple.el.value = "123";
		testOnPaste("", "123", assert);
	});

	QUnit.test("onPaste truncates values longer than maxlength", function(assert){
		assert.expect(2);
		var value = "01234567890";

		simple.maxLength = 10;
		testOnPaste(value, "0123456789", assert);
	});

	QUnit.test("onPaste does not truncate value when maxlength is not defined on element", function(assert){
		assert.expect(2);
		var value = "01234567890";

		// remove the maxlength
		simple.el.removeAttribute("maxlength");
		// reset the maxlength
		simple.updateMaxlength();

		// should preserve the value
		testOnPaste(value, value, assert);
	});
})(window, shoestring);
