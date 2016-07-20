formcore
========

A set of forms.

* [Demo](http://master.origin.formcore.fgview.com/)

## Maxlength

The Maxlength component currently watches inputs and replaces returns with
`\r\n` to normalize behavior across browsers which count returns differently.

Credit to Keith Wood for his implementation which acted as inspiration:
http://keith-wood.name/maxlength.html

## Numeric Input

A number of features around normalizing the behavior of `<input type="number">` form fields.

1. Suppresses non-numeric input into the form field, similar to how Chrome desktop behaves with `<input type="number">`. This will also prevent scientific or E notation from being entered into the form field (since `E` and `e` are alphabetic).
1. Works to enforce the `maxlength` attribute (also works with the number of digits on `max`)
1. Works around bugs with `<input type="number">` in Safari 6 and Firefox desktop (large numbers may be rounded or leading zeros may be truncated). In these browsers, the type is toggled to `text`.

### Getting Started

Include `src/numeric-input.js` and optionally `src/numeric-input-init.js`.

#### Initialization

* When using `numeric-input-init.js` simply add the `data-numeric-input` attribute to your `<input type="number">` element:  `<input type="number" data-numeric-input">`
* Otherwise, manually initialize with `new NumericInput( element );`. You’re on the hook to prevent duplicate initialization when doing this manually.

### Options

* `data-float`: Allow one decimal point
* `data-numeric-input-nav-disabled`: Prevent the up and down arrow keys from incrementing and decrementing the number value.
