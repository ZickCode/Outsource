$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,
    loop: true,
    allowTouchMove: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  });

  $('.not-open').on('click', function(){
    alert('敬请期待');
  })

  $('.j-news-nav').find('a').on('click', function(){
    $(this).addClass('on').siblings().removeClass('on');
  })
});