import common from './common.js'

class UsBoxPage extends common{
    constructor(wrap){
       super(wrap) 
       this.$content = this.wrap.find('.container')//内容
    }
    init() {
        this.start() //一开始就请求一次
        console.dir(UsBoxPage)
    }
    start(){
        this.getData((data)=>{
            this.render(data)
        })
    }
    //jsonp请求
    getData(callback) {
        this.wrap.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            dataType: 'jsonp'
        }).done((ret)=> {
            console.log('ret')
            
            console.log(ret)
            callback && callback(ret)
        }).fail(()=> {
            console.log('数据异常')
        }).always(()=> {
            this.wrap.find('.loading').hide()
        })
    }
    //渲染
    render(data) {
        data.subjects.forEach((item)=> {
            this.$content.append(this.createNode(item.subject))
        })
    }
}

export default UsBoxPage