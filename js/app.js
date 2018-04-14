var App = {
    init: function(){
        this.bind()
        Top250page.init()
        UsBoxPage.init()
        SearchPage.init()
    },
    //tab切换
    bind: function(){
        $('footer>div').on('click', function () {
        $(this).addClass('active')
            .siblings().removeClass('active')
        $('main>section').hide().eq($(this).index())
            .fadeIn()
    })
    }
}
App.init()
