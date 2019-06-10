import $ from '../vendors/jquery.min.js'
import common from './common.js'

class UsBoxPage extends common{
    constructor(wrap){
       super(wrap) 
       this.$content = this.wrap.find('.container')//内容
    }
    init() {
        this.start() //一开始就请求一次
    }
    start(){
        this.getData((result)=>{
            this.render(result.data)
            this.page++
        })
    }
    createNode(subject,index){
        var $node = $(`<div class="item">
            <a href="https://github.com/TryGhost/Ghost">
                <div class="cover"><img src="" alt=""></div> 
                <div class="detail">
                    <h2>Ghost </h2>
                </div>
            </a>
            </div> `)
        
            $node.find('.cover img').attr('src', subject.avatar_url )
            $node.find('a').attr('href', subject.html_url )    
            $node.find('.detail h2').text(subject.login )  
        return $node
    }
    
    //jsonp请求
    getData(callback) {
        this.wrap.find('.loading').show()
        $.ajax({
            url: 'https://api.github.com/search/users?q=followers:>1000+location:china+language:javascript',
            page: this.page,
            dataType: 'jsonp'
        }).done((ret)=> {
            callback && callback(ret)
        }).fail(()=> {
            console.log('数据异常')
        }).always(()=> {
            this.wrap.find('.loading').hide()
        })
    }
    //渲染
    render(data) {
        data.items.forEach((item,index)=> {
            this.$content.append(this.createNode(item,index+1))
        })
    }
}

export default UsBoxPage