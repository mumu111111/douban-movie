var SearchPage = {
    init: function () {
        this.isLoading = false
        this.$container = $('#search')
        this.$input = this.$container.find('input')
        this.$btn = this.$container.find('.button')
        this.$content = this.$container.find('.container')
        this.bind()
    },
    bind: function(){
        var _this= this
        this.$btn.on('click',function(){
            _this.$content.empty()
            var value= _this.$input.val()
            if(value === '') return 
            _this.getData(value, function(data){
                _this.render(data)
            })
        })
    },
    //jsonp请求
    getData: function (keyword, callback) {
        var _this= this
        if (_this.isLoading) return
        _this.isLoading = true
        _this.$container.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/search',
            data:{
                q: keyword 
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log('ret')
            console.log(ret)
            callback && callback(ret)
        }).fail(function () {
            console.log('数据异常')
        }).always(function () {
            _this.isLoading= false
            _this.$container.find('.loading').hide()
        })
    },
    //渲染
    render: function (data) {
        var _this = this
        data.subjects.forEach(function (item) {
            _this.$content.append(common.createNode(item))
        })
    }
}

