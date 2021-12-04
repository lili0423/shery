define(['jquery'], function($){

    function getBannerData(){
        // return出去的是promise对象，所以外面就可以 .then()的方式进行调用
        return $.ajax('/api/mock/banner.json');
    }

    function getBanner2Data(){
        return $.ajax('/api/mock/banner2.json');
    }

    //获取商品列表
    function getGoodsData(type){
        return $.ajax(`/api/mock/${type}.json`);
    }

    //获取商品详情数据
    function getDetailData(goodsId, type){
        let promise = new Promise(function(resolve, reject){
            $.ajax(`/api/mock/${type}.json`).then((res)=>{
                for(let i=0;i<res.goods_list.length;i++){
                    if( res.goods_list[i].goodsId === goodsId ){
                        // 找到了指定的数据   res.goods_list[i]
                        resolve(res.goods_list[i]);
                    }
                }
            });
        });
        return promise;
    }

    return {
        getBannerData,
        getBanner2Data,
        getGoodsData,
        getDetailData
    };

});