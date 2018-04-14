var UsBoxPage = {
    init: function () {
        this.$container = $('#beimei')//视口
        this.$content = this.$container.find('.container')//内容
        this.start() //一开始就请求一次
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
        _this.$container.find('.loading').show()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/us_box',
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log('ret')
            
            console.log(ret)
            callback && callback(ret)
        }).fail(function () {
            console.log('数据异常')
        }).always(function () {
            _this.$container.find('.loading').hide()
        })
    },
    //渲染
    render: function (data) {
        var _this = this
        data.subjects.forEach(function (item) {
            _this.$content.append(common.createNode(item.subject))
        })
    }
}


