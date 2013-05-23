# Simple Infinite Scroll

[![Build Status](https://travis-ci.org/jeffchao/simple-infinite-scroll.png?branch=master)](https://travis-ci.org/jeffchao/simple-infinite-scroll)

A simple jQuery plugin to be used for handling pagination on vertical scroll.

The interface is as follows:

```javascript
$(element).simpleInfiniteScroll({
  offset: 1,        // Integer representing offset from bottom page.

  ajaxOptions: {
    // The same exact options provided by jQuery.ajax.
    // e.g., data, dataType, async, the various callbacks, etc.
  },

  callback: null    // Callback to be called once the ajax function succeeds.
});
```

Examples
----------

The most simple use case is to apply this plugin to the window object with
related ajax options. You may supply a callback to perform some action
once the ajax call succeeds such as updating the DOM.

```javascript
$(window).simpleInfiniteScroll({
  offset: 0,

  ajaxOptions: {
    url: '/foo',
    async: true,
    type: 'POST',
    dataType: 'json',
    data: { foo: 'bar' },
    beforeSend: function (xhr) {
      xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
    }
  },

  callback: methodToUpdateDOM
});
```

The `callback` can take the same 3 parameters as jQuery ajax, `data`, `textStatus`, and `jqXHR`. These parameters are used in the same exact way.

Support
----------

- Browser tested on Chrome 26, Firefox 16, Internet Explorer 9/10
- Specs tested using jasmine and jasmine-jquery on node

Author
----------

Jeff Chao, @thejeffchao, http://thejeffchao.com
