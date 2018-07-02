(function($, doc) {
	//底部跳转-暂时
	var homeBtn = document.getElementById('home'),
		listBtn = document.getElementById('list'),
		loanBtn = document.getElementById('loan'),
		regBtn = document.getElementById('reg'),
		machinedetailBtn = document.getElementById('machinedetail')
		userCenterBtn = document.getElementById('usercenter');
	
	homeBtn.addEventListener('tap', function(event) {
		$.openWindow({
			url: 'missionList.html',
			id: 'missionlist',
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
	listBtn.addEventListener('tap', function(event) {
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
	loanBtn.addEventListener('tap', function(event) {
		$.openWindow({
			url: 'loan.html',
			id: 'loan',
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
	regBtn.addEventListener('tap', function(event) {
		$.openWindow({
			url: 'reg.html',
			id: 'reg',
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
	machinedetailBtn.addEventListener('tap', function(event) {
		$.openWindow({
			url: 'machineDetail.html',
			id: 'machinedetail',
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
	userCenterBtn.addEventListener('tap', function(event) {
		$.openWindow({
			url: 'userCenter.html',
			id: 'usercenter',
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