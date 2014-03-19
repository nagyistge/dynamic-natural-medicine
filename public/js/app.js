var Doctor = Doctor || (function($) {

  var Utils   = {}, // Your Toolbox
    Ajax    = {}, // Your Ajax Wrapper
    Events  = {}, // Event-based Actions
    App     = {}, // Your Global Logic and Initializer
    Public  = {}; // Your Public Functions

  Utils = {
    settings: {
      debug: true,
      meta: {
        homeURL: ''
      },
      init: function() {
        _log('Initializing Settings');
        $('meta[name^="app-"]').each(function(){
          Utils.settings.meta[ this.name.replace('app-','') ] = this.content;
        });
        _log('Initialized Settings');
      }
    },
    cache: {
      window: window,
      document: document
    },
    home_url: function(path){
      if(typeof path=="undefined"){
        path = '';
      }
      return Utils.settings.meta.homeURL+path+'/';
    },
    log: function() {
      if (Utils.settings.debug) {
        console.log.apply(console, arguments);
      }
    },
    checkIfExternalLink: function(href) {
      return href.charAt(0) != '.' && href.charAt(0) != '#' && (href.charAt(0) != '/' || (href.indexOf("//") == 0 ));
    },
    parseRoute: function(input) {

      var delimiter = input.delimiter || '/',
        paths = input.path.split(delimiter),
        check = input.target[paths.shift()],
        exists = typeof check != 'undefined',
        isLast = paths.length == 0;
      input.inits = input.inits || [];

      if (exists) {
        if(typeof check.init == 'function'){
          input.inits.push(check.init);
        }
        if (isLast) {
          input.parsed.call(undefined, {
            exists: true,
            type: typeof check,
            obj: check,
            inits: input.inits
          });
        } else {
          Utils.parseRoute({
            path: paths.join(delimiter),
            target: check,
            delimiter: delimiter,
            parsed: input.parsed,
            inits: input.inits
          });
        }
      } else {
        input.parsed.call(undefined, {
          exists: false
        });
      }
    }
  };
  var _log = Utils.log;

  Ajax = {
    ajaxUrl: Utils.home_url(''),
    send: function(type, method, data, returnFunc){
      console.log(type, Ajax.ajaxUrl, method, data);
      $.ajax({
        type:'POST',
        url: Ajax.ajaxUrl+method,
        dataType:'json',
        data: data,
        success: returnFunc
      });
    },
    call: function(method, data, returnFunc){
      Ajax.send('POST', method, data, returnFunc);
    },
    get: function(method, data, returnFunc){
      Ajax.send('GET', method, data, returnFunc);
    }
  };

  Events = {
    endpoints: {
      contact: {
        send: function(e) {
          // TODO: client side validate
          var $this = $(this);
          var thank_you = $(".thank-you").hide();
          var form = $("#contact-form");
          var error = $(".alert", form).hide();
          var name = $("input[name=name]", form).val();
          var email = $("input[name=email]", form).val();
          var message = $("textarea[name=message]", form).val();

          if (!form[0].checkValidity()) {
            return;
          }

          _log("form", $("#contact-form").serialize());

          var data = { name: name, email: email, message: message };
          console.log("data", data);

          var url = "/contact";

          // TODO: turn into promise
          $.post(url, data, function(result) {
            _log("here", result);
            if (result && result.error) {
              error.show().text(result.message);
            } else {
              _log("success", result);

              //savingIndicator.delay(1000).fadeOut(300, function() {
              //  $(this).removeClass().addClass(resultText).fadeIn(300).delay(2000).fadeOut();
              //});

              _log("animating");
              form.fadeOut(500, function() {
                _log("form fade out");

                thank_you.text(result.message);
                form.remove();

                thank_you.fadeIn(1000, function() {
                  _log("thank_you fade in");

                  thank_you.delay(3000).fadeOut(2000, function() {
                    thank_you.remove();
                  });
                });
              });

              //$("#contact-form").remove();
              //thank_you.text(result.message).show();
            }
          })
          .done(function() {
              _log( "second success" );
          })
          .fail(function(error) {
              _log( "error", error );
              _log("error", error.status);
          })
          .always(function() {
              _log( "finished" );

          });
          //Ajax.call("contact", data, function(result) {
          //  console.log("got result", result);
          //});

          // stop the form from submitting and refreshing
          e.preventDefault();
        }
      },
      read: {
        more: function(e) {
          var $this = $(this);
          var target = $($this.data("target"));
          target.show();
          $this.hide();
          // TODO: google analytics
        }
      }
    },
    bindEvents: function(){
      _log('Binding Events');
      $('[data-event]').each(function(){
        var _this = this,
          method = _this.dataset.method || 'click',
          name = _this.dataset.event,
          bound = _this.dataset.bound;

        if(!bound){
          Utils.parseRoute({
            path: name,
            target: Events.endpoints,
            delimiter: '.',
            parsed: function(res) {
              if(res.exists){
                _this.dataset.bound = true;
                $(_this).on(method, function(e){
                  res.obj.call(_this, e);
                });
              }
            }
          });
        }
      });
      _log('Events Bound');
    },
    bindTrackingEvents: function() {
      $('a:not([href*="' + document.domain + '"])').mousedown(function (event) {
        // Just in case, be safe and don't do anything
        if (typeof ga == 'undefined') {
          return;
        }

        var link = $(this);
        var href = link.attr('href');
        if (checkIfExternalLink(href)) {
          var noProtocol = href.replace(/http[s]?:\/\//, '');

          // Track the event
          //_gat._getTrackerByName()._trackEvent('Outbound Links', noProtocol);
          ga('send', 'event', 'outbound', 'click', noProtocol, {
            'hitCallback': function () {
              //console.log("tracked external link click");
            }
          });
        }
      });
    },
    bindReadMoreEvents: function() {
      $("")
      $("#extend-intro").on("click.dnm.more", function() {
        $("#extended-intro").show();
        $(this).hide(); // TODO: toggle, Read Less
        // TODO: google analytics
      });
    },
    init: function(){
      Events.bindEvents();
    }
  };
  App = {
    logic: {},
    init: function() {
      _log('Initializing Foundation');
      $(document).foundation({ "magellan-expedition": { destination_threshold: 85 } });
      _log('Initialized Foundation');

      _log('Initializing App');
      Utils.settings.init();
      Events.init();
      _log('Initialized App');
    }
  };

  Public = {
    init: App.init
  };

  return Public;

})(window.jQuery);

jQuery(document).ready(Doctor.init);