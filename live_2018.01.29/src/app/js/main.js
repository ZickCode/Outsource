$(function(){
	//发布页类型选择
	$(document).on('click', '.j-choose-type-box li', function(){
		if(!$(this).hasClass('on')){
			$(this).addClass('on').siblings().removeClass('on');
		}
	});

	//送礼页礼品选择
	$(document).on('click', '.j-gift-choose-box li', function(){
		if(!$(this).hasClass('on')){
			$(this).addClass('on').siblings().removeClass('on');
		}
	});

	//视频页点击播放
	$('.j-btn-play').on('click', function(){
		$(this).hide();
		$('.video-box').find('video')[0].play();
	});
	$('.video-box').find('video').on('click', function(){
		$('.j-btn-play').css('display', 'block');
		$(this)[0].pause();
	});
});