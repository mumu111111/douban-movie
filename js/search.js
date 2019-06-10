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
        
            if(value === '') {this.$content.text('要输入搜索内容啊');  return} 
            this.getData(value,(result)=>{
               
                this.render(result.data)
            })
        })
        this.$input.on('keyup',(e)=>{
            this.$content.empty()
            var value= this.$input.val()
            if(e.key === 'Enter'){
                if(value === '') {this.$content.text('要输入搜索内容啊');  return} 
                this.getData(value,(result)=>{
                    this.render(result.data)
                })
            }
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
    getData(keyword, callback) {
        if (this.isLoading) return
        this.isLoading = true
        this.page = 1
        this.wrap.find('.loading').show()
       
        $.ajax({
            url: `https://api.github.com/search/repositories?q=${keyword}+language:javascript&sort=stars&order=desc`,
           
            dataType: 'jsonp'
        }).done((ret)=> {
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
        if(data.total_count === 0){
            this.$content.text('没有找到相关内容');
            return
        }
        data.items.forEach((item, index)=> {
            this.$content.append(this.createNode(item,index+1))
        })
    }
}
export default SearchPage