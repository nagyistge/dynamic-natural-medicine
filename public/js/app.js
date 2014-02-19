var webknit = webknit || {};

webknit.preload = function()
{
  $(window).load(function() {
    $('.loading-image').hide();
    $('body').addClass('animated');
    $('.add-animated').addClass('animated');
  });
};

webknit.navigation = function()
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

webknit.pageMoveAction = function()
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

webknit.showMoreWork = function()
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

webknit.animations = function()
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

webknit.retinaDetect = function()
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

$(function()
{
  //$(document).foundation({ "magellan-expedition": { destination_threshold: 85 } });
  $(document).foundation({ "magellan-expedition": { destination_threshold: 100 } });

  //new webknit.preload();
  //new webknit.navigation();
  new webknit.pageMoveAction();
  //new webknit.showMoreWork();
  //new webknit.animations();
  //new webknit.retinaDetect();

});
