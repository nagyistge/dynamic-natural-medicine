var dnm = dnm || {};

dnm.preload = function()
{
  $(window).load(function() {
    $('.loading-image').hide();
    $('body').addClass('animated');
    $('.add-animated').addClass('animated');
  });
};

dnm.navigation = function()
{
  var mobileNav = $('.mobile-nav');
  var mainNav = $('.main-nav');

  function init()
  {
    mobileNav.click(openNav);
  }

  function openNav()
  {
    if (mainNav.hasClass('active'))
    {
      mainNav.removeClass('active');
      mobileNav.removeClass('open');
    }
    else
    {
      mainNav.addClass('active');
      mobileNav.addClass('open');
    }
  }

  function functionTwo()
  {
    // JS CODE
    window.hide();
  }

  init();
};

dnm.pageMoveAction = function()
{
  var $document = $(document);
  var bg = $('.bg-pic');
  var pleaseScrollText = $('.please-scroll');

  function init()
  {
    $(window).scroll(function(e){
      parallax();
      pleaseScroll();
    });

  }

  function parallax()
  {
    if ($(window).width() > 768)
    {
      var scrolled = $(window).scrollTop();
      //bg.css('top', -(scrolled * 0.2) + 'px');
      bg.css('top', -(scrolled * 1) + 'px');
    }
  }

  function pleaseScroll()
  {
    if ($(window).width() > 768) {

      if ($document.scrollTop() >= 350)
      {
        pleaseScrollText.fadeOut();
      }
      if ($document.scrollTop() >= 50)
      {
        pleaseScrollText.text("Keep going!");
      }
      else
      {
        pleaseScrollText.text("Please scroll");
        pleaseScrollText.fadeIn();
      }

    }
  }

  init();
};

dnm.showMoreWork = function()
{
  var showWork = $('.show-work');
  var whiteBox = $('.white-box');
  var closeWork = $('.close-work');
  var workDiv = $('.work-div');
  var $document = $(document);

  function init()
  {
    showWork.hover(showIt);
    closeWork.hover(normalState);
    showOnDesktop();
  }

  function showIt()
  {
    $(this).parent('.work-div').addClass('active');
    showAll();
  }

  function normalState()
  {
    $(this).closest('.work-div').removeClass('active');
  }

  function showOnDesktop()
  {
    $(window).resize(function()
    {
      if ($(window).width() < 1170)
      {
        workDiv.removeClass('active');
      }

    });
  }

  init();
};

dnm.animations = function()
{
  var showWork = $('.show-work');

  function init()
  {
    showInView();
  }

  function showInView()
  {
    $('.myclass').bind('inview', function (event, visible) {
      if (visible == true) {
        // element is now visible in the viewport
        $(this).removeClass('myclass');
        alert('found h2!')
      } else {
        // element has gone out of viewport
        $(this).addClass('myclass');
      }
    });
  }

  init();
};

dnm.retinaDetect = function()
{
  var retina = window.devicePixelRatio > 1;
  var retinaImage = $('.detect-retina');
  var retinaImageLazy = $('.detect-retina-lazy');

  function init()
  {
    detect();
  }

  function detect()
  {
    if (retina) {

      retinaImage.each(function(index, element) {
        var img = $(this);
        img.addClass('retina-detected');
        img.attr('src', img.attr('src').replace('.jpg', '@2x.jpg'));
        img.attr('src', img.attr('src').replace('.png', '@2x.png'));
      });

      retinaImageLazy.each(function(index, element) {
        var img = $(this);
        img.addClass('retina-detected');
        img.attr('data-original', img.attr('data-original').replace('.jpg', '@2x.jpg'));
        img.attr('data-original', img.attr('data-original').replace('.png', '@2x.png'));
      });
    }
    else {
      retinaImage.addClass('retina-not-detected');
    }
  }

  init();
};

dnm.trackOutboundLink = function() {
  var $this = $(this);
  console.log($this);

  var url = $this.attr("href");
  console.log(url);

  setTimeout(function() {

  ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
    function () {
      //document.location = url;
    }
  });
  }, 5000);

}

$(function()
{
  $(document).foundation({ "magellan-expedition": { destination_threshold: 85 } });

  //new dnm.preload();
  //new dnm.navigation();
  //new dnm.pageMoveAction();
  //new dnm.showMoreWork();
  //new dnm.animations();
  //new dnm.retinaDetect();

  // TODO: move into functions on object

  $("#extend-intro").on("click.dnm.more", function() {
    $("#extended-intro").show();
    $(this).hide(); // TODO: toggle, Read Less
    // TODO: google analytics
  });


  function checkIfExternalLink(href) {
    return href.charAt(0) != '.' && href.charAt(0) != '#' && (href.charAt(0) != '/' || (href.indexOf("//") == 0 ));
  }

  // TODO: setup testing...
  console.log(checkIfExternalLink("/about"));
  console.log(checkIfExternalLink("./doug"));
  console.log(checkIfExternalLink("#about"));
  console.log(checkIfExternalLink("//"));
  console.log(checkIfExternalLink("http://www"));
  console.log(checkIfExternalLink("https://www"));

  $('a:not([href*="' + document.domain + '"])').mousedown(function(event){
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
        'hitCallback': function() {
          //console.log("tracked external link click");
        }
      });
    }
  });

  var navigation_scroll_speed = 600;
  // Animate internal links
  //
  $('a[href^="#"]:not(.mobile-menu)').on('click',function (e) {
    e.preventDefault();



    var target = this.hash,
      $target = $(target);

    console.log(":hh", $target.css('padding-top'));
      var target_padding_top = parseInt( $target.css('padding-top')||0, 10);

    //if ($target.parent().hasClass(".toggle-topbar")) {
    //  return;
    //}

      $("section.slide-section").removeClass("active");
      $target.addClass("active");

      console.log("1",target_padding_top);
      console.log("2",$target.offset().top);
      console.log("3",$target.css('padding-top'));
      //target_padding_top += 85;
      //target_padding_top += 34;
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - target_padding_top
    //}, parseInt(navigation_scroll_speed, 10), 'easeInOutExpo');
    //}, parseInt(navigation_scroll_speed, 10), 'easeOutQuart');
      //TODO: fix jquery ui reference
    }, parseInt(navigation_scroll_speed, 10), 'swing');
  });

});
