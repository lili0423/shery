
//首页的主模块

requirejs.config({
    paths: {
        "jquery": "/lib/jquery-3.4.1.min"
    }
});


define(['jquery','/api/sever.js','/js/moudule/banner.js'], function($,{ getBannerData , getGoodsData },initBanner){

    console.log($);
    getBannerData().then((res)=>{
        //console.log(res);
        initBanner(res);
    })

    let phone = 'phone';
    let pad = 'pad';
    let book = 'book';
    getGoodsData(phone).then((res)=>{
        initGoods( phone,res)
    })
    getGoodsData(pad).then((res)=>{
        initGoods( pad,res)
    })
    getGoodsData(book).then((res)=>{
        initGoods( book,res)
    })

    function initGoods(container,data){
        let $container = $('#'+container);
        $container.html(
            `
            <h2 class="goods_title">${data.title}</h2>
            <ul class="goods_list clearfix">
                ${
                    data.goods_list.map((v,i)=>{
                        return`
                        <li>
                    <a href="/views/detail.html?goodsId=${v.goodsId}&type=${data.type}" target = "_blank">
                        <div><img src="${v.goodsImg}" alt=""></div>
                        <h3>${v.goodsName}</h3>
                        <p>¥${v.goodsPrice}</p>
                    </a>
                
                    </li>
                        
                        
                        
                        
                        
                        `



                    }).join('')



                }
            </ul>
            
            
            `

        )

    }

   
});

