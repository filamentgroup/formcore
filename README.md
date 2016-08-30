formcore
========

[![Build Status](https://img.shields.io/travis/filamentgroup/formcore/master.svg)](https://travis-ci.org/filamentgroup/formcore)

A set of forms.

* [Demo](http://master.origin.formcore.fgview.com/)

## Maxlength

The Maxlength component currently watches inputs and replaces returns with
`\r\n` to normalize behavior across browsers which count returns differently.

Credit to Keith Wood for his implementation which acted as inspiration:
http://keith-wood.name/maxlength.html

## Numeric Input

A number of features around normalizing the behavior of `<input type="number">` form fields. To start, add the `data-numeric-input` attribute to your `<input type="number">` element:

```html
<input type="number" data-numeric-input>
```

Next, include the `js/numeric-input.js` and `js/numeric-input-init.js` files.

### Features

1. Suppresses non-numeric input into the form field, similar to how Chrome desktop behaves with `<input type="number">`. This will also prevent scientific or E notation from being entered into the form field (since `E` and `e` are alphabetic).
1. Works to enforce the `maxlength` attribute (also works with the number of digits on `max`)
1. Works around bugs with `<input type="number">` in Safari 6 and Firefox desktop (large numbers may be rounded or leading zeros may be truncated). In these browsers, the type is toggled to `text`.
1. `data-numeric-input-nav-disabled` attribute option: Prevent the up and down arrow keys from incrementing and decrementing the number value.

#### Manual Initialization

* Alternatively, if you don’t want to use our auto-initialization code (the `numeric-input-init.js` file, which relies on a global `enhance` event), you can manually initialize with `new NumericInput( element );` You’re on the hook to prevent duplicate initialization when doing this manually.
