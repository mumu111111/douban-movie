import $ from '../vendors/jquery.min.js'
import common from './common.js'

class Top250page extends common{
    constructor(wrap){
        super(wrap)
        this.index = 0
        this.count= 10
        this.isLoading = false
        this.isFinish = false
        this.$content = this.wrap.find('.container')//内容
    }
    init(){
        this.bind()
        this.start() //一开始就请求一次
    }
    bind(){
        //懒加载
        this.wrap.scroll(()=> {
            if (!this.isFinish && this.isToEnd(this.wrap, this.$content)) {
                this.start()
                console.log(2)
            }
        })
    }
    start(){
        this.getData((data)=>{
            this.render(data)
        })
    }
    //jsonp请求
    getData(callback) {
        if (this.isLoading) return
        this.isLoading = true
        this.wrap.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            data: {
                start: this.index || 0,
                count: this.count
            },
            dataType: 'jsonp'
        }).done((ret)=> {
            console.log(ret)
            callback && callback(ret)
            this.index += 20
            if (this.index >= ret.total) {
                this.isFinish = true
            }
        }).fail(()=> {
            console.log('数据异常')
        }).always(()=> {
            this.isLoading = false
            this.wrap.find('.loading').hide()
        })
    }
    //渲染
    render(data) {
        data.subjects.forEach((movie)=> {
            this.$content.append(this.createNode(movie))
        })
    }
}

export default Top250page