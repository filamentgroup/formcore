(function( w, $ ) {
	"use strict";
	var $simple;
	var $disclosed;
	var $form;

	function commonSetup(){
		$(document).trigger("enhance");
		$simple = $( "#simple" );
		$disclosed = $( "#disclosed" );
		$form = $( "form" );
	}

	QUnit.module( "Methods", {
		beforeEach: commonSetup
	});

	QUnit.test("reveals disclosure target", function(assert){
		assert.ok( $disclosed.is( ".hidden" ), "is hidden" );
		$simple[0].checked = true;
		$form.trigger( "change" );
		assert.ok( !$disclosed.is( ".hidden" ), "is not hidden" );
	});

	QUnit.test("hides undisclosed targets", function(assert){
		$disclosed.removeClass( "hidden" );
		assert.ok( !$disclosed.is( ".hidden" ), "is not hidden" );
		$simple[0].checked = false;
		$form.trigger( "change" );
		assert.ok( $disclosed.is( ".hidden" ), "is hidden" );
	});
})(window, shoestring);
