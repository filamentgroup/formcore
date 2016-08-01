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

	module( "Methods", {
		setup: commonSetup
	});

	test("reveals disclosure target", function(){
		ok( $disclosed.is( ".hidden" ), "is hidden" );
		$simple[0].checked = true;
		$form.trigger( "change" );
		ok( !$disclosed.is( ".hidden" ), "is not hidden" );
	});

	test("hides undisclosed targets", function(){
		$disclosed.removeClass( "hidden" );
		ok( !$disclosed.is( ".hidden" ), "is not hidden" );
		$simple[0].checked = false;
		$form.trigger( "change" );
		ok( $disclosed.is( ".hidden" ), "is hidden" );
	});
})(window, shoestring);
