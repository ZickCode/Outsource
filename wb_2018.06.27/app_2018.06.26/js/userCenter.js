(function($, doc) {
	//个人中心跳转
	var mymsgBtn = document.getElementById('mymsg'),
		noticelistBtn = document.getElementById('noticelist');
	
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
	
	noticelistBtn.addEventListener('tap', function(event) {
		$.openWindow({
			url: 'noticeList.html',
			id: 'noticelist',
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