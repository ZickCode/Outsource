var startX,endX,lis,size,width,dots,timer,count=0;
        var index=0,locked=false;
        var firstChild = $('.item li:eq(0)');
        var lastChild = $('.item li:eq(8)');

        function init(){
             // 克隆首末元素
            $('.item').append(firstChild.clone());
            lastChild.clone().insertBefore(firstChild);

            // 获取所有li
            lis = $('.item>li');
            size = lis.length;
            width = parseInt($('.wrapper').css('width'));

            // 设置ul宽度
            $('.item').css({'width':size * width});
            lis.each(function(index,element){
               $(this).css('width',width);
            });

            index--;
            $('.item').css({'left':index*width});

            setup();
            auto();
        }
 
        // jQ绑定touch事件?

        function setup(){
        		if(document.querySelector('.wrapper')==null){
        			return false;
        		}
            var wrap = document.querySelector('.wrapper');
            wrap.addEventListener('touchstart', function(e){
                var touches = e.changedTouches;
                startX = touches[0].clientX;
                clearInterval(timer);
            });

            wrap.addEventListener('touchend', function(e){
                var touches = e.changedTouches;
                endX = touches[0].clientX;

                if(locked) return;
                if(endX == startX) return;
                if(endX > startX){
                    index++;
                    if(count == 0){count=9};
                    count--;
                }else{
                    index--;
                    if(count == 8){count=-1};
                    count++;
                }
                
                $('.item').css('transition','all 1s ease-in-out');
                $('.item').css('left',index*width); 

                // 获取所有点
                dots = $('.dot li');

                dots.each(function(index,element){
                    $(this).removeClass('active');
                });

                $('.dot li:eq('+count+')').addClass('active');

                locked = true;

                auto();
            });

            wrap.addEventListener('webkitTransitionEnd', function(){
                $('.item').css('transition','none');
                if(index == 0){
                    index = 2 - size;
                    $('.item').css('left',index*width);
                }else if(index == 1-size){
                    index = -1;
                    $('.item').css('left',index*width);
                }
                locked = false;
            });
        }


        function auto(){
            timer = setInterval(function(){
                index--;
                $('.item').css('transition','all 1s ease-in-out');
                $('.item').css('left',index*width);
                if(count == 8){count=-1};
                count++;
                $('.dot li').each(function(index,element){
                    $(this).removeClass('active');   
                });

                $('.dot li:eq('+count+')').addClass('active');
            }, 2000);
        }
        
        init();
// index.html
        $(function(){
					$(".y_qianggouAll").on("click","li",function(){
						$(".y_qianggouAll a").css("color","#000");
		                $(this).find("a").css("color","#fb5756");
		                var index = $(this).index();
		                $('.qiangou li').hide();
		                $('.qiangou li').eq(index).show();
					});
				
		        $(".Foot").on("click","li",function(){
		            $(".Foot span").css("color","#000");
		            $(this).find("span").css("color","#fb5756")
		        })
        })
// home.html
        $(function(){
            $(".y_qianggouAll").on("click","li",function(){
                $(".y_qianggouAll a").css("color","#000");
                $(this).find("a").css("color","#fb5756");
                var index = $(this).index();
                console.log(index);
                $('.tabshow').find('li').hide(); 
                $('.y_kadian li').css({'display':'inline-block'});
                $('.tabshow li').eq(index).show();
            });
        })
//倒计时
        $(function(){
            var time = parseInt(60*60*2);
            $.extend({
                showtime:function(){
                    if(time>0){
                      var hour = parseInt(time / 60 / 60 % 24, 10);
                      var minute = parseInt(time / 60 % 60, 10);
                      var second = parseInt(time % 60, 10);
                      if (minute < 10) {
                        minute = '0' + minute;
                      }
                      if (second<10){
                        second = '0' + second;
                      }
                      if (hour == 0) {
                          $(".y_robbery-dotimes").html(minute + ":" + second);
                      } else {
                        if (hour < 10) {
                          hour = '0' + hour;
                        }
                        $(".y_robbery-dotimes").html(hour + ":" + minute + ":" + second);
                      }
                      time --;
                      setTimeout(function(){
                          $.showtime();
                      },1000);
                    }else{
                         $(".y_robbery-dotimes").html("00:00");
                    }
                }
            });
           if($(".y_robbery-dotimes").html()!= null){
            		$.showtime();
           }
            
        })
        




