var Top250page = {
    init: function () {
        this.$container = $('#top250')//视口
        this.$content = this.$container.find('.container')//内容
        this.index = 0;
        this.isLoading = false
        this.isFinish = false
        this.bind()
        this.start() //一开始就请求一次
    },
    bind: function () {
        var _this = this
        //懒加载
        console.log(_this)
        this.$container.scroll(function () {
            if (!_this.isFinish && common.isToEnd(_this.$container, _this.$content)) {
                _this.start()
                console.log(2)
            }
        })
    },
    start: function(){
        var _this= this
        this.getData(function(data){
            _this.render(data)
        })
    },
    //jsonp请求
    getData: function (callback) {
        var _this= this
        if (_this.isLoading) return
        _this.isLoading = true
        _this.$container.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/top250',
            data: {
                start: this.index || 0,
                // count: 20
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret)
            callback && callback(ret)
            _this.index += 20
            if (_this.index >= ret.total) {
                _this.isFinish = true
            }
        }).fail(function () {
            console.log('数据异常')
        }).always(function () {
            _this.isLoading = false
            _this.$container.find('.loading').hide()
        })
    },
    //渲染
    render: function (data) {
        var _this = this
        data.subjects.forEach(function (movie) {
            _this.$content.append(common.createNode(movie))
        })
    }
}
