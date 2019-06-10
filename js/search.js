import $ from '../vendors/jquery.min.js'
import common from './common.js'
class SearchPage extends common{
    constructor(wrap) {
        super(wrap)
        this.isLoading = false
        this.$input = this.wrap.find('input')
        this.$btn = this.wrap.find('.button')
        this.$content = this.wrap.find('.container')      
    }
    init() {
        this.bind()
    }
    bind(){
        this.$btn.on('click',()=>{
            this.$content.empty()
            var value= this.$input.val()
            if(value === '') return 
            this.getData(value, (data)=>{
                this.render(data)
            })
        })
    }
    //jsonp请求
    getData(keyword, callback) {
        if (this.isLoading) return
        this.isLoading = true
        this.wrap.find('.loading').show()
        $.ajax({
            url: 'https://api.github.com/search/repositories?q=keyword+language:javascript&sort=stars&order=desc&page=1',
            data:{
                q: keyword 
            },
            dataType: 'jsonp'
        }).done((ret)=> {
            console.log('ret')
            console.log(ret)
            callback && callback(ret)
        }).fail(()=> {
            console.log('数据异常')
        }).always(()=> {
            this.isLoading= false
            this.wrap.find('.loading').hide()
        })
    }
    //渲染
    render(data) {
        data.subjects.forEach((item)=> {
            this.$content.append(this.createNode(item))
        })
    }
}
export default SearchPage