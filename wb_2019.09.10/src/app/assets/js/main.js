'use strict';

$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,
    loop: true,
    allowTouchMove: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
});