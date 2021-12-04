



define(["jquery"],function($){

    let key = 'cartList';


    function addCartStorage(nowDate,cb){
        console.log(nowDate);
        let cartList = getCartStorage();
        let flag = true;
        let index = 0;
        for(let i = 0 ; i<cartList.length;i++){
            if (cartList[i].goodsName === nowDate.goodsName && cartList[i].goodsColor === nowDate.goodsColor){
                flag = false;
                index = i
            }
        }
        if (flag) {
            cartList.push(nowDate);
            setCartStorage(cartList);
        }
        else{
           cartList[index].goodsNumber+= nowDate.goodsNumber;
            
        }
        setCartStorage(cartList);
        cb && cb();

    }
    function setCartStorage(cartList){
        localStorage.setItem(key ,JSON.stringify(cartList) )
        
    }
    function getCartStorage(){
        if (localStorage.getItem(key)) {
           return JSON.parse( localStorage.getItem(key)  ) 
        }
        else{
            return [];
        }
        
    }
    return {
        addCartStorage,
        setCartStorage,
        getCartStorage
    }

})











