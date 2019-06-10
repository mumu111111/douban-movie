import $ from '../vendors/jquery.min.js'
import common from './common.js'

class Top250page extends common{
    constructor(wrap){
        super(wrap)
        this.index = 0
        this.page = 1
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
        this.getData((result)=>{
            this.render(result.data.items)
            this.page++
        })
    }
    
    createNode(subject,index){
        var $node = $(`<div class="item">
        <a href="https://github.com/TryGhost/Ghost">
          <div class="order"><span>1</span></div>
          <div class="detail">
            <h2>Ghost </h2>
            <div class="description">Knockout makes it easier to create rich, responsive UIs with JavaScript</div>
            <div class="extra"><span class="star-count">4196</span> star</div>  
         </div>
       </a>
      </div> `)
        
        $node.find('.order span').text(index)
        $node.find('a').attr('href', subject.html_url)    
        $node.find('.detail h2').text(subject.name)  
        $node.find('.detail .description').text(subject.description)
        $node.find('.detail .collection').text(subject.collect_count)  
        $node.find('.detail .star-count').text(subject.stargazers_count ) 
        return $node
    }
    //jsonp请求
    getData(callback) {
        if (this.isLoading) return
        this.isLoading = true
        this.wrap.find('.loading').show()
        $.ajax({
            url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc',
            data: {
                page: this.page
            },
            dataType: 'jsonp'
        }).done((ret)=> {
            callback && callback(ret)
            this.index += 20
            if (this.index >= ret.total_count) {
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
        console.log(data)
        data.forEach((item,index)=> {
            this.$content.append(this.createNode(item, index+1))
        })
    }
}

export default Top250page