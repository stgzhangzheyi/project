$(function(){
	var topHeight=$('.top').height();
	$(".middle").on("scroll",function(){
	var scrollTop = $(".middle").scrollTop();
	if(scrollTop>topHeight){
		$('.top').css({background:"#e4393c"})
	}else{
		$('.top').css({background:"none"})
	}
	})

	$(".bottom-all").on("click",function(){

		var ind=$(this).index();
		if(ind>=0 && ind<=1){
		if ($(this).hasClass(".actives")) {
		return;
		}else{
		$(this).siblings().removeClass("actives");
		$(this).addClass("actives");
		if(ind==1){
			$('.bottom-all').eq(1).css({
			background:'url(jd/images/bottom7.png) no-repeat center center',
			backgroundSize: 55+"px "+ 45+"px"
		})
			$(".bottom-all").eq(0).css({
				background:'url(jd/images/bottom6.png) no-repeat center center',
				backgroundSize: 55+"px "+ 45+"px"
			})
		}else{
			$('.bottom-all').eq(1).css({
			background:'url(jd/images/bottom2.png) no-repeat center center',
			backgroundSize: 55+"px "+ 45+"px"
		})
			$(".bottom-all").eq(0).css({
				background:'url(jd/images/bottom1.png) no-repeat center center',
				backgroundSize: 55+"px "+ 45+"px"
			})
		}
	}
		}else{
			$(this).siblings().removeClass("actives");
			$(this).addClass("actives");
			$('.bottom-all').eq(1).css({
			background:'url(jd/images/bottom2.png) no-repeat center center',
			backgroundSize: 55+"px "+ 45+"px"
		})
			$(".bottom-all").eq(0).css({
				background:'url(jd/images/bottom6.png) no-repeat center center',
				backgroundSize: 55+"px "+ 45+"px"
			})

		}
	})
})