$(function(){
	      //皮肤切换
		  var $label=$(".header_p2>label");
		  var $header_nav=$(".header_nav");
		  var $goods_category_top=$(".goods_category_top");
		  var arr=["#4869ae","#b0d40f","#fba70e","#17bfcf","#e11556","#c152da"];
		  $label.click(function(){
		  	var _index = $(this).index();
		  	$(this).css("background-position-y","-15px").siblings().css("background-position-y","0px")
		  	 $header_nav.css("background",arr[_index]);
		  	 $goods_category_top.css("background",arr[_index]);
		  })
 
         //商品搜索弹起
          var $header_search=$(".header_p1>input[type=text]");
          $header_search.keyup(function(event){
          	  var e = event || window.event || arguments.callee.caller.arguments[0];
          	  if(e && e.keyCode == 13) {
                var $header_search_val=$header_search.val(); 
          	  	alert("您搜索的商品是"+$header_search_val);
          	  }
          })
          
          //导航栏数据渲染
          var dataList = null;   //定义一个全局变量
	    $.ajax({
		type:"get",
		url:"all.json",
		async:true,
		dataType:"json",
		data:{},
		success:function(datas){
			dataList = datas;
			//首页
			$.each(dataList.list, function(i,v) {
				var str = "<li>"+v+"<b></b></li>";
				$(".header_nav>ul").append(str);
				var str2="<ul><p class='goods_category_title'>"+v+"</p></ul>"
				$(".goods_category").append(str2);
				
			});
			list = dataList.brand;
			//品牌
			$.each(list.brands, function(i,v) {
				$(".header_nav>ul li:eq(1) b").append("<a>"+v+"</a>");
				$(".goods_category ul:eq(0)").append("<li>"+v+"</li>");
			});
			//装
			$.each(list.brandboy, function(i,v) {
				$(".header_nav>ul li:eq(2) b").append("<a>"+v+"</a>");
					$(".goods_category ul:eq(1)").append("<li>"+v+"</li>");
			});
			//装
			$.each(list.brandgirl, function(i,v) {
				$(".header_nav>ul li:eq(3) b").append("<a>"+v+"</a>");
					$(".goods_category ul:eq(2)").append("<li>"+v+"</li>");
			});
			//鞋包配饰
			$.each(list.shoe, function(i,v) {
				$(".header_nav>ul li:eq(4) b").append("<a>"+v+"</a>");
					$(".goods_category ul:eq(3)").append("<li>"+v+"</li>");
			});
		}
	});
      //轮播图
      var $mrt_left_img=$(".mrt_left img");
      var $mrt_left_span=$(".mrt_left_btn span");
      var $mrt_left=$(".mrt_left");
      var timer=null;

      var lb_index=0;
      function lunbo(){
      	lb_index++;
      	if(lb_index==5){
      		lb_index=0;
      	}
      	$mrt_left_img.eq(lb_index).fadeIn("slow").parent().siblings().children().fadeOut("slow");
      	$mrt_left_span.eq(lb_index).addClass("span_opcity").siblings().removeClass("span_opcity");
      }
       timer=setInterval(lunbo,2000);
       $mrt_left.mouseover(function(){
       	  clearTimeout(timer);
       })
        $mrt_left.mouseout(function(){
          timer=setInterval(lunbo,2000);
       })
      $mrt_left_span.mouseover(function(){
       	lb_index=$(this).index();
      	$mrt_left_img.eq(lb_index).fadeIn("slow").parent().siblings().children().fadeOut("slow");
      	$mrt_left_span.eq(lb_index).addClass("span_opcity").siblings().removeClass("span_opcity");
      });
      
      //文字无缝滚动

      var $recent_news_div =$(".recent_news_div");
      var $recent_news =$(".recent_news");
      var scroll_i=0;
			var wz_timer=null;
		  $.ajax({
    	type:"get",
    	url:"all.json",
    	async:false,
    	dataType:"json",
    	success:function(datas){
    		$.each(datas.recent_news, function(i,v){
    			var str="<li><span>"+v+"</span></li>";
    			$recent_news.prepend(str);
    		});
    	}
    });
		$recent_news[0].innerHTML += $recent_news[0].innerHTML;
		function wz_roll(){
				if($recent_news_div.scrollTop()  >=$recent_news_div.height()) {
				$recent_news_div.scrollTop(0);
			} else {
				$recent_news_div.scrollTop($recent_news_div.scrollTop()+1);
			}
		}
		wz_timer=setInterval(wz_roll, 25)
		$recent_news_div.mouseover(function(){
			clearInterval(wz_timer);
		})
		$recent_news_div.mouseout(function(){
			wz_timer=setInterval(wz_roll, 25)
		})
		//文字跟随
		$(".recent_news").on("mouseover","li",function(){
			   	 var txt = $(this).find("span").html();
			     $(this).append("<div class='mo'></div>")
			   
			   $(".mo").html("");
			   $(".mo").html(txt);			   
			   $(".recent_news li").mousemove(function(e){
			   			var movex = e.pageX - $(this).offset().left;
			   			var movey = e.pageY - $(this).offset().top;
			   			 $(".mo").css({
			   			 		"left":movex,
			   			 		"top": movey
			   			 })
			   })
			   $(this).mouseout(function(){
			   		$(".recent_news li div").detach();
			   })
		 
		})
		
		
		//鞋子tab切换
		var $mrb_img_all=$(".mrb_img_all2");
		var $mrb_img=$(".mrb_img");
		var $mrb_tab=$(".mrb_tab li");
		var $mrb_img_all_ul=$(".mrb_img_all2 ul:first");
		var $mrb_img_all_ul_width=$(".mrb_img_all2 ul:first").width();
		var $mrb_img_all_ul_length=$(".mrb_img_all2 ul").length;
		$mrb_img_all.width($mrb_img_all_ul_width*$mrb_img_all_ul_length);
		  
    		  var _indexxx=0;

		  $mrb_tab.click(function(){
		  	  _indexxx=$(this).index();
		  		$mrb_img_all.animate({"left":-(_indexxx*$mrb_img_all_ul_width)},400);
		     	$(this).addClass("mrb_tab_img_active").siblings().removeClass("mrb_tab_img_active");
		  })
		 
		 
		 //文字滚动鼠标放上显示文字
//		 $(".recent_news li").mouseover(function(){
//		 	  $(this).attr("title",$(this).html())
//		 })

		
		 //tab图片切换上搜索的图片
		 
		 
		  $(".mrb_img_all2 li").append("<b></b>");
		  $(".mrb_img_all2 li img").mousemove(function(e){
		    	var ev = e || event;
			    var _left = ev.pageX - $(this).parent().parent().offset().left -  $(this).parent().siblings("b").width() / 2;
		    	var _top = ev.pageY - $(this).parent().parent().offset().top - $(this).parent().siblings("b").height() / 2;
				  if(_left < 0) {
						_left = 0;
					}
					if(_left > $(this).parent().parent().width() - $(this).parent().siblings("b").width()) {
						_left = $(this).parent().parent().width() - $(this).parent().siblings("b").width();
					}
					if(_top < 0) {
						_top = 0;
					}
					if(_top > $(this).parent().parent().height() - $(this).parent().siblings("b").height()) {
						_top = $(this).parent().parent().height() - $(this).parent().siblings("b").height();
					}
//			$(".Clothes_show p").css({
//				left: _left + "px",
//				top: _top + "px"
//			});
		  	  $(this).parent().siblings("b").css("display","block");
		  	  $(this).parent().siblings("b").css({"left":_left+15+"px","top":_top+"px"});
		  })
		   $(".mrb_img_all2 li img").mouseout(function(){
		   	$(this).parent().siblings("b").css("display","none");
		   })
})
	 
 




 
 
