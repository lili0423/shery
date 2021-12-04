define(["jquery"], function($){

    let $bannerList = $('.banner-list');
    
    function initBanner(data){
        $bannerList.html(`
            <ul>
                ${
                    data.banner_list.map((v,i)=>{
                        return `<li class="${i===0 ? 'show': ''}"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>`;
                    }).join('')
                }
            </ul>
            <ol>
                ${
                    data.banner_list.map((v,i)=>{
                        return `<li class="${i===0 ? 'active': ''}"></li>`;
                    }).join('')
                }
            </ol>
        `);
        bindBanner();
        autoBanner();
    }

    function bindBanner(){
        let $bannerUlList = $bannerList.find('ul li');
        $bannerList.on('mouseover', 'ol li', function(){
            $(this).addClass('active').siblings().removeClass('active');
            $bannerUlList.eq( $(this).index() ).addClass('show').siblings().removeClass('show');
        });
    }

    function autoBanner(){
        let $bannerUlList = $bannerList.find('ul li');
        let $bannerOlList = $bannerList.find('ol li');
        let now = 0;
        setInterval(()=>{

            if(now === $bannerUlList.length-1){
                now = 0;
            }
            else{
                now++;
            }

            $bannerUlList.eq(now).addClass('show').siblings().removeClass('show');
            $bannerOlList.eq(now).addClass('active').siblings().removeClass('active');

        }, 3000);
    }

    return initBanner;
});