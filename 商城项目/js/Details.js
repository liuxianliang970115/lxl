$(function() {
	//皮肤切换
	var $label = $(".header_p2>label");
	var $header_nav = $(".header_nav");
	var $goods_category_top = $(".goods_category_top");
	var arr = ["#4869ae", "#b0d40f", "#fba70e", "#17bfcf", "#e11556", "#c152da"];

	$label.click(function() {
		var _index = $(this).index();
		$(this).css("background-position-y", "-15px").siblings().css("background-position-y", "0px")
		$header_nav.css("background", arr[_index]);
		$goods_category_top.css("background", arr[_index]);
	})

	//商品搜索弹起
	var $header_search = $(".header_p1>input[type=text]");
	if($header_search) {}
	$header_search.keyup(function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode == 13) {
			var $header_search_val = $header_search.val();
			alert("您搜索的商品是" + $header_search_val);
		}
	})

	//导航栏数据渲染
	var dataList = null; //定义一个全局变量
	$.ajax({
		type: "get",
		url: "all.json",
		async: true,
		dataType: "json",
		data: {},
		success: function(datas) {
			dataList = datas;
			//首页
			$.each(dataList.list, function(i, v) {
				var str = "<li>" + v + "<b></b></li>";
				$(".header_nav>ul").append(str);
				var str2 = "<ul><p class='goods_category_title'>" + v + "</p></ul>"
				$(".goods_category").append(str2);

			});
			list = dataList.brand;
			//品牌
			$.each(list.brands, function(i, v) {
				$(".header_nav>ul li:eq(1) b").append("<a>" + v + "</a>");
				$(".goods_category ul:eq(0)").append("<li>" + v + "</li>");
			});
			//装
			$.each(list.brandboy, function(i, v) {
				$(".header_nav>ul li:eq(2) b").append("<a>" + v + "</a>");
				$(".goods_category ul:eq(1)").append("<li>" + v + "</li>");
			});
			//装
			$.each(list.brandgirl, function(i, v) {
				$(".header_nav>ul li:eq(3) b").append("<a>" + v + "</a>");
				$(".goods_category ul:eq(2)").append("<li>" + v + "</li>");
			});
			//鞋包配饰
			$.each(list.shoe, function(i, v) {
				$(".header_nav>ul li:eq(4) b").append("<a>" + v + "</a>");
				$(".goods_category ul:eq(3)").append("<li>" + v + "</li>");
			});
		}
	});
	//详情页面

	//衣服介绍tab切换
	var $product_tab = $(".product_tab");
	var $product_tab_content = $(".product_tab_content p");
	var $product_tab_btn = $(".product_tab ul:first li");
	$product_tab_btn.eq(0).addClass("product_tab_active");
	$product_tab_btn.click(function() {
			$product_tab_content.eq($(this).index()).show().siblings().hide();
			$(this).addClass("product_tab_active").siblings().removeClass("product_tab_active");
		})
		//点击切换衣服颜色
		//			var $shop_attribute_color=$(".shop_attribute_color b a img");
		//			var $Clothes_show_img=$(".Clothes_show img");
		//			var $small_Clothes_show_img=$(".small_Clothes_show img");
		//			var $Clothes_show_img=$(".Clothes_show img");
		//			$shop_attribute_color.click(function(){
		//				var _src=$(this).attr("src");
		//				var _start=_src.lastIndexOf("/")+1;
		//				var _end=_src.lastIndexOf(".");
		//				var _color=_src.slice(_start,_end);
		//				 $(".shop_attribute_color span").html(_color);
		//			    $(".big_Clothes_show img").attr("src","./img/pro_img/"+_color+"_one_big.jpg");
		//			    $Clothes_show_img.eq(0).attr("src","./img/pro_img/"+_color+"_one_small.jpg");
		//			    $small_Clothes_show_img.eq(0).attr("src","./img/pro_img/"+_color+"_one.jpg");
		//				$small_Clothes_show_img.eq(1).attr("src","./img/pro_img/"+_color+"_two.jpg");
		//				$small_Clothes_show_img.eq(2).attr("src","./img/pro_img/"+_color+"_three.jpg");
		////				var _start2=_src2.lastIndexOf("/")+1;
		////				var _end2=_src2.lastIndexOf("_one");
		////				var _color2=_src2.slice(_start);
		////				console.log(_color2);
		//			})

	//选择尺寸
	$shop_attribute_size = $(".shop_attribute_size b a");
	$shop_attribute_size.click(function() {
			$(this).addClass("shop_attribute_size_active").siblings().removeClass("shop_attribute_size_active");
			$(".shop_attribute_size span").html($(this).html());
		})
		//总价格
	$(".shop_attribute_num select").change(function() {
		var num = $(this).val();
		$(".shop_attribute_allprice span a").html($(".shop_attribute_sale span a").html() * num);
	})

	//衣服大图
	//			 $(".small_Clothes_show li img").click(function(){
	//			 	var _src=$(this).attr("src");
	//				var _start=_src.lastIndexOf("/")+1;
	//				var _end=_src.lastIndexOf("_");
	//				var _color=_src.slice(_start,_end);
	//				 
	//				var _start2=_src.lastIndexOf("_");
	//				var _end2=_src.lastIndexOf(".");
	//				var _color2=_src.slice(_start2,_end2); 
	//				$(".Clothes_show img").attr("src","./img/pro_img/"+_color+_color2+"_small.jpg");
	//				$(".big_Clothes_show img").attr("src","./img/pro_img/"+_color+_color2+"_big.jpg");
	//			 })

	//放大镜效果
	$(function(){
		function agnifying(obj1,obj2,obj3,obj4,obj5){
			obj2.mouseover(function() {
				obj1.show();
				obj3.show();
			})
			obj2.mouseout(function() {
				obj1.hide();
				obj3.hide();
			})
			obj2.mousemove(function(e){
				var ev=e||event;
				var _left=ev.pageX-obj2.offset().left-obj1.width()/2;
				var _top=ev.pageY-obj2.offset().top-obj1.height()/2;
				if(_left<0){
					_left=0;
				}
				if(_left>obj2.width()-obj1.width()){
					_left=obj2.width()-obj1.width()
				}
				if(_top<0){
					_top=0;
				}
				if(_top>obj2.height()-obj1.height()){
					_top=obj2.height()-obj1.height()
				}
				obj1.css({
					left: _left + "px",
					top: _top + "px"
		     	});
		     	var rate=obj5.width()/obj4.width();
		     	obj5.css({
					left: -_left * rate + "px",
					top: -_top * rate + "px"
			    });
			})
		}
		agnifying($(".Clothes_show p"),$(".Clothes_show"),$(".big_Clothes_show"),$(".Clothes_show img"),$(".big_Clothes_show img"))
	})
	var $Clothes_show_filter = $(".Clothes_show p");
	var $Clothes_show = $(".Clothes_show");
	var $big_Clothes_show = $(".big_Clothes_show");
	$Clothes_show.mouseover(function() {
		$(".Clothes_show p").show();
		$big_Clothes_show.show();
	})
	$Clothes_show.mouseout(function() {
		$(".Clothes_show p").hide();
		$big_Clothes_show.hide();
	})
	$Clothes_show.mousemove(function(e) {

			var ev = e || event;
			var _left = ev.pageX - $Clothes_show.offset().left - $(".Clothes_show p").width() / 2;
			var _top = ev.pageY - $Clothes_show.offset().top - $(".Clothes_show p").height() / 2;

			if(_left < 0) {
				_left = 0;
			}
			if(_left > $Clothes_show.width() - $(".Clothes_show p").width()) {
				_left = $Clothes_show.width() - $(".Clothes_show p").width();
			}
			if(_top < 0) {
				_top = 0;
			}
			if(_top > $Clothes_show.height() - $(".Clothes_show p").height()) {
				_top = $Clothes_show.height() - $(".Clothes_show p").height();
			}
			$(".Clothes_show p").css({
				left: _left + "px",
				top: _top + "px"
			});

			var rate = $(".big_Clothes_show img").width() / $(".Clothes_show img").width();
			$(".big_Clothes_show img").css({
				left: -_left * rate + "px",
				top: -_top * rate + "px"
			});
		})
		//收货地址
	var $select1 = $("#select1");
	var $select2 = $("#select2");
	var $select3 = $("#select3");
	var datajson;
	$.ajax({
		type: "get",
		url: "all.json",
		async: true,
		success: function(data) {
			datajson = data.address;
			$.each(data.address, function(i, v) {
				$select1.append("<option>" + v.name + "</option>");
			})
		}
	});
	$select1.change(function() {
		$select2.show();
		$select3.hide();
		$select2.children().remove();
		$select3.children().remove();
		$val = $(this).val();
		$.each(datajson, function(i, v) {
			if($val == v.name) {
				$.each(v.sub, function(j, k) {
					$select2.append("<option>" + k.name + "</option>");
				})
			}

		})

	})

	$select2.change(function() {
		$select3.show();
		$select3.children().remove();
		$val = $select1.val();
		$.each(datajson, function(i, v) {

			if($val == v.name) {
				$val2 = $select2.val();

				$.each(v.sub, function(j, k) {
					if($val2 == k.name) {
                      if(k.sub){
						$.each(k.sub, function(n, m) {
							 $select3.append("<option>" + m.name + "</option>");
						})
						}else{
							 $select3.hide();
						}
					}
				})
			}
		})

	})

	//数据渲染图片
	$.ajax({
		type: "get",
		url: "all.json",
		async: false,
		success: function(datas) {
			dataList = datas;
			//				 	console.log(dataList);

			$.each(dataList.clothes, function(i, k) {
				$(".shop_attribute_color b").append("<a><img src='" + k.img + "' alt='" + k.color + "' ></a>");

				$.each(k.smallimg, function(i, v) {
					$(".Clothes_show").append("<img src='" + v.img + "'/>");
					$(".Clothes_show img:gt(0)").hide();
                    
                   $(".see_clear_div_img").append("<img src='" + v.img + "'/>");
				   $(".see_clear_div_img img:gt(0)").hide();
				})

				$.each(k.normalimg, function(i, v) {
					$(".small_Clothes_show").append("<li><img src=" + v.img + "></li>");
					$(".small_Clothes_show li:gt(2)").hide();
				})

				$.each(k.bigimg, function(i, v) {
					$(".big_Clothes_show").append("<img src=" + v.img + ">");
					$(".big_Clothes_show img:gt(0)").hide();
				})
				$(document).on("click", ".shop_attribute_color b img", function() {  //点击切换不同颜色的衣服
					var $alt = $(this).attr("alt");
					$(this).css("border", "1px solid red").parent().siblings().children().css("border", "none");
					if($alt == k.color) {
						$(".shop_attribute_color span").html(k.color);
						$(".Clothes_show").html("");
						$(".see_clear_div_img").html("");
						$(".Clothes_show").append("<p></p>");
						$.each(k.smallimg, function(i, v) {
							$(".Clothes_show").append("<img src='" + v.img + "'/>");
							$(".Clothes_show img:gt(0)").hide();
						 
							$(".see_clear_div_img").append("<img src='" + v.img + "'/>");
							$(".see_clear_div_img img:gt(0)").hide();
							
						})
						$(".small_Clothes_show").html("");
						$.each(k.normalimg, function(i, v) {
							$(".small_Clothes_show").append("<li><img src=" + v.img + "></li>");
							$(".small_Clothes_show li:gt(2)").hide();
						})
						$(".big_Clothes_show").html("");

						$.each(k.bigimg, function(i, v) {
							$(".big_Clothes_show").append("<img src=" + v.img + ">");
							$(".big_Clothes_show img:gt(0)").hide();
						})
					}
				})
				
				$(document).on("click", ".small_Clothes_show li", function() {  //点击切换不同大小的衣服
				      $(".Clothes_show img").eq($(this).index()).show().siblings().hide();
				      $(".big_Clothes_show img").eq($(this).index()).show().siblings().hide();
					  $(".see_clear_div_img img").eq($(this).index()).show().siblings().hide();
				      
        })
			})

		}
	});
	
	//评分
	var _flag=true;
	$(".shop_attribute_score b a").mouseover(function(){
		if(_flag){
		      var _index=$(this).index()+1;
		      $(".shop_attribute_score b").css("background-position-y",-_index*16-80+"px");
		     
		}
	})
	$(".shop_attribute_score b a").mouseout(function(){
		if(_flag){
		var _index=$(this).index();
		if(_index==0){
		   $(".shop_attribute_score b").css("background-position-y",0);
		}
         }

	})
	
	 $(".shop_attribute_score b a").click(function(){
	 	 _flag=false;
      var _index=$(this).index()+1;
		$(".shop_attribute_score b").css("background-position-y",-_index*16+"px");
	})
  //遮罩层
  $(".shopping_cart img").click(function(){
  	$("#mask_layer").css("display","block");
  	$(".mask_box").css("display","block");
  	var shop_name=$(".shop_introduce strong").html();
  	var shop_size=$(".shop_attribute_size span").html();
  	var shop_color=$(".shop_attribute_color span").html();
  	var shop_num=$(".shop_attribute_num select").val();
  	var shop_price=$(".shop_attribute_allprice span").html();
  	var shop_address1=$(".shop_attribute_address #select1").val();
  	var shop_address2=$(".shop_attribute_address #select2").val();
  	var shop_address3=$(".shop_attribute_address #select3").val();
  	var str="您将加入购物车的物品是: "+shop_name+"<br/>尺寸为: "+shop_size+"<br/>颜色为: "+shop_color+"<br/>数量为: "+shop_num+"<br/>地址为: "+shop_address1+"-"+shop_address2+"-"+shop_address3+"<br />总价为: "+shop_price;
  	$(".mask_messages").html("");
  	$(".mask_messages").append(str);
  	conPosition("mask_box");
  
  })
  function conPosition(obj) {
    var oContent = document.getElementsByClassName(obj)[0];
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;   //网页中获取滚动条卷去部分的高度
	var l = (document.documentElement.clientWidth - oContent.offsetWidth) / 2;
	var t = ((document.documentElement.clientHeight - oContent.offsetHeight) / 2) + scrollTop;
  	oContent.style.left = l + 'px';
	oContent.style.top = t + 'px';
  }
  //点击黑色背景隐藏弹出层，当然可以绑定在任意一个按钮上
			$(window).resize(function() {
				conPosition("mask_box");
				conPosition("see_clear_div");
			});
			$(window).scroll(function() {
				conPosition("mask_box");
				conPosition("see_clear_div");
			});
			//开启内容跟随垂直滚动条（水平滚动条需要处理的问题更多，暂时没有考虑）
  $(".mask_true").click(function(){
  	$("#mask_layer").css("display","none");
  	$(".mask_box").css("display","none");
  })
      //关闭购物车
      $(".mask_title span").click(function(){
      		$("#mask_layer").css("display","none");
  	        $(".mask_box").css("display","none");
      })
  //查看清晰图片
  $(".see_clear img").click(function(){
  	$("#mask_layer").css("display","block");
  	$(".see_clear_div").css("display","block");
  	conPosition("see_clear_div");
//	var _img=$("Clothes_show img").attr("src");
//	console.log(_img);
//	$(".see_clear_div_img").html("");
//	$(".see_clear_div_img").append("<img src="+_img+">");
  })
  $(".see_clear_div_title span").click(function(){
  	$("#mask_layer").css("display","none");
  	$(".see_clear_div").css("display","none");
  })
  //拖拽遮罩
  function drag(obj1,obj2){
	  $(obj1).mousedown(function(e){
	  	var startX=$(obj2).offset().left;
	  	var startY=$(obj2).offset().top;
	  	var clickX=X=e.pageX;
	  	var clickY=X=e.pageY;
	  	document.onmousemove=function(e){
	  		var nowX=e.pageX;
	  		var nowY=e.pageY;
	  		var clientX=nowX-clickX;
	  		var clientY=nowY-clickY;
	  		$(obj2).css("left",startX+clientX);
	  		$(obj2).css("top",startY+clientY);
	  }
	  })
	  document.onmouseup=function(){
		  document.onmousemove=null;
	   }
   }
  drag(".see_clear_div_title",".see_clear_div");
  drag(".mask_title",".mask_box");
})