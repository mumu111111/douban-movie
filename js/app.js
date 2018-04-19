import Top from './top250.js'
import Us from './beimei.js'
import Search from './search.js'

  //tab切换
  $('footer>div').on('click', function(){
    $(this).addClass('active')
        .siblings().removeClass('active')
    $('main>section').hide().eq($(this).index())
        .fadeIn()
    })

    let top= new Top('#top250')
    let beimei= new Us('#beimei')
    let search= new Search('#search')
    top.init()
    beimei.init()
    search.init()


  
