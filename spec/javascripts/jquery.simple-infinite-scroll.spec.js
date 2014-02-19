window = require('jsdom').jsdom().createWindow();
document = window.document;
jQuery = require('jquery');
$ = jQuery;
jqueryJasmine = require('jasmine-jquery');

require('../../src/jquery.simple-infinite-scroll');

describe('jQuery Simple Infinite Scroll', function () {
  beforeEach(function () {
    setFixtures(
      '<div id="jasmine-fixtures">' +
        '<div class="fixture" style="height: 2000px; border: 2px solid #000;"></div>' +
      '</div>'
    );

    spyOn($.prototype, 'height').andCallFake(function () {
      var original = $.prototype.height;
      if (this[0] === window) {
        return 1;
      } else if (this[0] === document) {
        return 0
      } else {
        return original.apply(this, arguments);
      }
    });

    spyOn($, 'ajax').andCallFake(function (params) {
      params.success('success');
    });
  });

  it('should be able to be instantiated onto a DOM element', function () {
    expect($(window).simpleInfiniteScroll()).toBeTruthy();
    expect($('#jasmine-fixtures').simpleInfiniteScroll()).toBeTruthy();
  });

  it('should be able to override its default options', function () {
    expect(
      $(window).simpleInfiniteScroll({
        offset: 1,
        ajaxOptions: {
          url: '/foo/1/bar',
          async: true,
          type: 'POST',
          dataType: 'json',
          data: {},
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
          },
        },
        callback: function (data, textStatus, jqXHR) { console.log('foo'); }
      })
    ).toBeTruthy();
  });

  it('should send an ajax request once scrolled near the bottom of the page', function () {
    $(window).simpleInfiniteScroll();
    $(window).scroll();
    expect($.ajax).toHaveBeenCalled();
  });
});
