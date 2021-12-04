//详情页的主模块

requirejs.config({
    paths: {
        "jquery": "/lib/jquery-3.4.1.min"
    }
});


define(['jquery','/api/sever.js','/js/moudule/banner.js','/js/moudule/cartStorage.js'], function($,{getBanner2Data , getDetailData},initBanner,{ addCartStorage }){

    console.log($);

    getBanner2Data().then((res)=>{
       // console.log(res);
       initBanner(res);
    })

    //拿url传过来的数据
    
  let goodsId = location.href.match(/goodsId=([^&]+)/)[1]
  let type = location.href.match(/type=([^&]+)/)[1]
   console.log( goodsId , type);
   getDetailData(goodsId,type).then((data)=>{
       console.log(data);
       initDetail(data);
   })

   let $detail_gallery = $('.detail_gallery');
   let $detail_message = $('.detail_message');
   let $detailGoods = $('#detailGoods')

    //初始化详情页
    function initDetail(data){
       $detail_gallery.html(
        `
        <div class="detail_gallery_normal">
                <img src="${data.photoNormal}" alt="">
                <span></span>
            </div>
            <div class="detail_gallery_large">
                <img src="${data.photoLarge}" alt="">
            </div>
        
        `
       )
       $detail_message.html(
        `
        <h2>${data.goodsName}</h2>
            <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}.00</span></p>
            <p>选择颜色 
               ${
                   data.chooseColor.map((v)=>{
                       return `
                       <span class="detail_message_box">${v}</span>
                       `
                   }).join('')
               }
            </p>
            <div class="detail_message_btn clearfix">
                <div class="detail_message_num l">
                    <input class="detail_message_number" type="text" value="1">
                    <span class="detail_message_addbtn">+</span>
                    <span class="detail_message_removebtn">-</span>
                </div>
                <div class="detail_message_cart l"><a href="javascript:;">加入购物车</a></div>
                <div class="detail_message_computed l"><a href="/views/cart.html">立即下单</a></div>
            </div>
        
        `
       

       )
       $detailGoods.html(`
       <h3>-- 商品详情 --</h3>
       ${
        data.goodsInfo.map((v)=>{
            return `<img src="${v}" alt=""></img>`
        }).join('')
       }
        `);
        bindGallery();
        bindMessage(data);
    }
    //放大镜功能
    function bindGallery(){
        $detail_gallery.on('mouseover','.detail_gallery_normal',function(){
           // console.log(213);
            let $span = $(this).find('span');
            $span.show()
            let $big = $(this).next();
            $big.show()
        })
        $detail_gallery.on('mouseout','.detail_gallery_normal',function(){
           // console.log(213);
            let $span = $(this).find('span');
            $span.hide()
            let $big = $(this).next();
            $big.hide()
        })
        $detail_gallery.on('mousemove','.detail_gallery_normal',function(ev){
            
            let $span = $(this).find('span');
            let $big = $(this).next();
            let L = ev.pageX-$(this).offset().left - $span.width()/2;
            let T =ev.pageY-$(this).offset().top - $span.height()/2;
            if (L<0) {
                L=0;
            }
            else if(L>$(this).width()-$span.width()){
                L=$(this).width()-$span.width();
            }
            if (T<0) {
                T=0;
            }
            else if(T>$(this).height()-$span.height()){
                T=$(this).height()-$span.height();
            }
            $span.css({
                left:L,
                top:T
            })
            let scalX = L / ($(this).width()-$span.width());
            let scalY = T / ($(this).height()-$span.height());
            $big.children().css({
                left : -scalX * ($big.children().width()-$big.width()),
                top : -scalY * ($big.children().height()-$big.height())
            })
        })
    }
    //完成商品详情功能
    function bindMessage(data){
        let nowColor;
        let nowNumber;
        $detail_message.on('click','.detail_message_box',function(){
            $(this).addClass('active').siblings().removeClass('active')
            nowColor = $(this).html();
            console.log(nowColor);
        }) 
        let detail_message_number =  $detail_message.find('.detail_message_number')
        $detail_message.on('click','.detail_message_addbtn',function(){
            let newNumber =  Number(detail_message_number.val())+1;
            detail_message_number.val(newNumber)
            
        })
        $detail_message.on('click','.detail_message_removebtn',function(){
            let newNumber =  Number(detail_message_number.val())-1;
            if (newNumber>0) {
                detail_message_number.val(newNumber)
            }
 
        })
        detail_message_number.on('input',function(){
            console.log(1);
            if ($(this).val() !=='' && !Number($(this).val())) {
                $(this).val(1);
                
            }
        })
        $detail_message.on('click','.detail_message_cart',function(){


            let nowData = {
                goodsName : data.goodsName  ,
                goodsColor : nowColor ,
                goodsPrice : data.goodsPrice  ,
                goodsNumber : Number( detail_message_number.val()) ,
                isChecked :  true ,
                
            }
            addCartStorage(nowData,function(){
                alert('添加成功');
            })
        })
    }

});
    