(function($, doc) {
	//底部跳转-暂时
	var homeBtn = document.getElementById('home'),
		listBtn = document.getElementById('list'),
		loanBtn = document.getElementById('loan'),
		machinelistBtn = document.getElementById('machinelist'),
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
	machinelistBtn.addEventListener('tap', function(event) {
		$.openWindow({
			url: 'machineList.html',
			id: 'machinelist',
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