/*
* @since 2020/05
*/

//function stopMove(e){
//	document.addEventListener('touchmove', function(e) {
//	 e.preventDefault()}
//	,{ passive: false }
//	)
//}

function docScroll(e){
	e.preventDefault()//阻止默认事件函数
}

//===========分类二级下拉菜单（应用在 网课目录、章节练习及有二级分类菜单的页面）
$(".collase-menu .list-item .item").click(function(){
	$(this).parent().toggleClass("open");
	$(this).parent().siblings().removeClass("open");
	$(this).parent().siblings().children(".sub").slideUp("fast");
	$(this).next(".sub").slideToggle("fast")
});

//==========layer关闭当前层（弹出嵌套时先关闭最上层）
$(document).on('click','.layer-close',function(){
	layer.close(layer.index)
})
//layer关闭所有弹出层
$(document).on('click','.layer-closeAll',function(){
	layer.closeAll()
});

//===========大题干多个小题滑杆

//题干touch拖动
$(".paper-body").each(function(){
	var start_y,end_y,handle_y,offset_y,offset_min,offset_max;
	var tit_h=$(this).find(".tit-slide").height()+20;
	var con_h=$(this).height()-$(".dragHandler").height()-$(".ques-intab").height();
	$(".dragHandler").on("touchstart", function(e) {
		start_y=e.originalEvent.targetTouches[0].pageY - $(".main-tit").height() - $(".paper-state").height();//手指开始相对位置
		handle_y=$(this).position().top;//把手初始位置
		$("paper-body").css("overflow","hidden");
	});
	
	$(".dragHandler").on("touchmove", function(e) {
		end_y=e.originalEvent.targetTouches[0].pageY - $(".main-tit").height() - $(".paper-state").height();//手指结束相对位置
		offset_y=handle_y+(end_y-start_y);//计算结果=初始位置+偏移量
		offset_min=0;
		offset_max=tit_h>con_h?con_h:tit_h;
		//到顶限制
		offset_y<offset_min?offset_y=offset_min:offset_y=offset_y;
		//到底限制
		offset_y>offset_max?offset_y=offset_max:offset_y=offset_y;
		$(this).css("top",offset_y);
		$(this).prev().css("height",offset_y);
		document.addEventListener('touchmove',docScroll,{passive: false});//阻止document的touchmove
		$("paper-body").css("overflow","hidden");
	});
	
	$(".dragHandler").on("touchend", function(e) {
		document.removeEventListener('touchmove',docScroll,{passive: false});//解绑 阻止document的touchmove
		$("paper-body").css("overflow","auto");
	});
})

//===========swiper轮播图

//首页频道-banner广告轮播
var swiper = new Swiper('.main-slide .swiper-container', {
	pagination: {
      el: '.main-slide .swiper-pagination2',
      type : 'fraction'
    },
	loop:true,
	autoplay: {
	    delay: 3000,
	    stopOnLastSlide: false,
	    disableOnInteraction: false
    },
	resistanceRatio:0
});

//首页频道-通知公告
var swiper = new Swiper('.main-notice .swiper-container', {
	autoplay: {
	    delay: 5000,
	    stopOnLastSlide: false,
	    disableOnInteraction: false
    },
	direction : 'vertical',
	loop : true
});

//题库频道-广告轮播
var swiper = new Swiper('.tiku-slide .swiper-container', {
	pagination: {
      el: '.tiku-slide .swiper-pagination2',
      type : 'fraction'
    },
	loop:false,
	autoplay: 3000,
	autoplayDisableOnInteraction: false,
	resistanceRatio:0
});


//=============输入域字数提示
$(".limit-con").each(function(){
	var _this=this;
	var limitNum=$(this).data("max");
	$(this).next().find(".limit-max").text(limitNum);
	$(_this).keyup(function(){
		var len=$(this).val().length;
		if(len>limitNum){
			len=limitNum;
			$(this).val($(this).val().slice(0,len))
		}
		$(this).next().find(".limit-num").text(len);
		$(this).next().find(".limit-num-rest").text(limitNum-len);
	})	
});

//=============环形统计
$(".cirle").each(function(){
	var rotate = $(this).find(".num").data("percent");
	if(rotate > 100){
	    rotate = 0;
	    $(this).find('.right').addClass('width-none');
	    $(this).find('.clip').removeClass('auto');
	} else if(rotate > 50){
	    $(this).find('.right').removeClass('width-none');
	    $(this).find('.clip').addClass('auto');
	}
	$(this).find('.left').css('transform',"rotate("+3.6*rotate+"deg)");
});

//============悬浮按钮可拖动(自执行匿名函数)

$(".iconCanMove").each(function(){
	var icon_startY,icon_endY,icon_positionY,minY,maxY;
	var _this=this;
	$(this).on("touchstart",function(e){
		icon_positionY=$(_this).position().top;
		icon_startY=e.originalEvent.targetTouches[0].pageY
	})
	$(this).on("touchmove",function(e){
		icon_endY=e.originalEvent.targetTouches[0].pageY;
		var offsetY=icon_positionY+icon_endY-icon_startY;
		maxY=$(window).height()-110;//下限
		minY=$(window).height()/2;//上限
		offsetY>maxY?offsetY=maxY:offsetY=offsetY;
		offsetY<minY?offsetY=minY:offsetY=offsetY;
		$(_this).css("top",offsetY);
		console.log($(window).height())
	})
	$(this).on("touchend",function(e){
		
	})
})

//===========loading提示框
function loadingShow(txt){
	var text=txt||'加载中...';
	$('body').append('<div class="loading-wrap">\
			<div class="loading-con">\
				<div class="loading">\
					<div class="shape shape-1"></div>\
				    <div class="shape shape-2"></div>\
				    <div class="shape shape-3"></div>\
				    <div class="shape shape-4"></div>\
				</div>\
				<div class="text">'+text+'</div>\
			</div>\
		</div>');
};
function loadingHide(){
	$(".loading-wrap").remove()
};



