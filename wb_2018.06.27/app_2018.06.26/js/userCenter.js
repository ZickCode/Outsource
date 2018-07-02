(function($, doc) {
	//个人中心跳转
	var mymsgBtn = document.getElementById('mymsg');
	
	mymsgBtn.addEventListener('tap', function(event) {
		$.openWindow({
			url: 'messageCenter.html',
			id: 'messagecenter',
			preload: true,
			show: {
				aniShow: 'pop-in'
			},
			styles: {
				popGesture: 'hide'
			},
			waiting: {
				autoShow: false
			}
		});
	});
}(mui, document));