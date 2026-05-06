(function ($) {
  'use strict';

  AOS.init({ once: true });

  $(window).on('scroll', function () {
    var scrollToTop = $('.scroll-top-to'),
      scroll = $(window).scrollTop();
    if (scroll >= 200) {
      scrollToTop.fadeIn(200);
    } else {
      scrollToTop.fadeOut(100);
    }
  });

  $('.scroll-top-to').on('click', function () {
    $('body,html').animate({ scrollTop: 0 }, 500);
    return false;
  });

  $(document).ready(function() {

    if ($(window).width() < 992) {
      $('.main-nav .dropdown-toggle').on('click', function () {
        $(this).siblings('.dropdown-menu').animate({ height: 'toggle' }, 300);
      });
    }

    $('.testimonial-slider').slick({
      slidesToShow: 2,
      infinite: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      responsive: [{ breakpoint: 991, settings: { slidesToShow: 1, slidesToScroll: 1 } }]
    });

    $('.video-box i').click(function () {
      var video = '<iframe class="border-0" allowfullscreen src="' + $(this).attr('data-video') + '"></iframe>';
      $(this).replaceWith(video);
    });

    var syoTimer = $('#simple-timer');
    if (syoTimer.length) {
      $('#simple-timer').syotimer({ year: 2023, month: 9, day: 1, hour: 0, minute: 0 });
    }

    $('.about-slider').slick({
      slidesToShow: 1, infinite: true, arrows: false, autoplay: true, autoplaySpeed: 2000, dots: true
    });

    $('.quote-slider').slick({
      slidesToShow: 1, infinite: true, arrows: false, autoplay: true, autoplaySpeed: 2000, dots: true
    });

    $('.client-slider').slick({
      slidesToShow: 4,
      infinite: true,
      arrows: false,
      autoplaySpeed: 2000,
      dots: true,
      responsive: [
        { breakpoint: 0,   settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 575, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 2 } }
      ]
    });

  });

})(jQuery);

/* ── Media Carousel — 3-card rotated platter effect ── */
(function() {
  var stage = document.getElementById('mediaStage');
  if (!stage) return;

  var cards   = Array.from(stage.querySelectorAll('.media-card'));
  var total   = cards.length;
  var current = 1; // start: card index 1 is centre

  var POSITIONS = ['pos-left', 'pos-center', 'pos-right', 'pos-hidden'];

  function update() {
    cards.forEach(function(card, i) {
      card.classList.remove('pos-left', 'pos-center', 'pos-right', 'pos-hidden');

      // position relative to current centre
      var diff = i - current;

      // wrap
      if (diff > total / 2)  diff -= total;
      if (diff < -total / 2) diff += total;

      if      (diff === 0)  card.classList.add('pos-center');
      else if (diff === -1) card.classList.add('pos-left');
      else if (diff === 1)  card.classList.add('pos-right');
      else                  card.classList.add('pos-hidden');
    });
  }

  var nextBtn = document.getElementById('mediaNext');
  var prevBtn = document.getElementById('mediaPrev');

  if (nextBtn) nextBtn.addEventListener('click', function() {
    current = (current + 1) % total;
    update();
  });
  if (prevBtn) prevBtn.addEventListener('click', function() {
    current = (current - 1 + total) % total;
    update();
  });

  // click side cards to navigate
  cards.forEach(function(card, i) {
    card.addEventListener('click', function() {
      if (card.classList.contains('pos-left'))  { current = (current - 1 + total) % total; update(); }
      if (card.classList.contains('pos-right')) { current = (current + 1) % total; update(); }
    });
  });

  update();
})();

/* ── Ticker clone (homepage customer logos) ── */
(function() {
  var track = document.getElementById('tickerTrack');
  if (!track) return;
  track.innerHTML = track.innerHTML + track.innerHTML;
})();
