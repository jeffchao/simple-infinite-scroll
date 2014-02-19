/*
  Simple Infinite Scroll

  + https://github.com/jnaru/simple-infinite-scroll
  + version 0.1.4
  + Copyright 2013/14 Jeff Chao
  + Licensed under the MIT license
*/

;(function ($, undefined) {
  'use strict';

  var pluginName = 'simpleInfiniteScroll';
  var defaults = {
    offset: 0,
    ajaxOptions: {},
    callback: null
  };

  function Plugin (element, options) {
    this.element = element;
    this.options = $.extend(
      {},
      defaults,
      options
    );
    this._defaults = defaults;
    this._name = pluginName;
    this.loading = false;

    this.init();
  }

  Plugin.prototype = {
    init: function () {
      $(this.element).scroll(this.checkPage(this.element, this.options));
    },

    checkPage: function (element, options) {
      return function () {
        var that = this;

        if (!that.loading) {
          var e = $(element);

          if (e.scrollTop() > $(document).height() - e.height() - options.offset) {
            that.loading = true;

            var ajaxSuccess = {
              success: function (data, textStatus, jqXHR) {
                if (typeof options.callback === 'function') {
                  options.callback.call(that, data, textStatus, jqXHR);
                }
                that.loading = false;
              }
            };

            $.extend(options.ajaxOptions, ajaxSuccess);

            $.ajax(options.ajaxOptions);
          }
        }
      }
    }
  };

  $.fn[pluginName] = function (options, callback) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery);
