var rating = (function() {
    // 点亮整颗
    var LightEntire = function(el, options) {
        this.$el = $(el);
        this.$item = this.$el.find('.rating-item');
        this.opts = options;
    };
    LightEntire.prototype.init = function() {
        this.lightOn(this.opts.num);
        if(!this.opts.readOnly) {
            this.bindEvent();
        }
    };
    LightEntire.prototype.lightOn = function(num) {
        num = parseInt(num);
        this.$item.each(function(index) {
            if(index < num) {
                $(this).css('background-position', '0 -40px');
            } else {
                $(this).css('background-position', '0 0');
            }
        });
    };
    LightEntire.prototype.bindEvent = function() {
        var self = this;
        var itemLength = self.$item.length;
        self.$el.on('mouseover', '.rating-item', function() {
            var num = $(this).index() + 1;
            self.lightOn(num);
            // call()改变this的指向，使其指向了每一个星星.rating-item
            (typeof self.opts.select === 'function') && self.opts.select.call(this, num, itemLength);
            // 当鼠标移动事件触发之后，那么同时在$el的区域发布一个select事件，并传入参数
            self.$el.trigger('select', [num, itemLength]);
        }).on('click', '.rating-item', function() {
            self.opts.num = $(this).index() + 1;
            (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
            // 当鼠标移动事件触发之后，那么同时在$el的区域发布一个chosen事件，并传入参数
            self.$el.trigger('chosen', [self.opts.num, itemLength]);
        }).on('mouseout', function() {
            self.lightOn(self.opts.num);
        });
    };
    // 默认参数
    var defaults = {
        num: 0,
        readOnly: false,
        select: function() {},
        chosen: function() {}
    };
    // 创建初始方法
    var init = function(el, options) {
        options = $.extend({}, defaults, options);
        new LightEntire(el, options).init()
    };
    return {
        initfn: init
    };
})();
rating.initfn('#rating', {
    num: 4,
    // 第一种执行方法
    // select: function(num, total) {
    // console.log(num + '/' + total);
    // },
    // chosen: function(num,total) {
    // console.log(num + '/' + total);
    // }
});
// 这是第二种输出类似分页结果的实现方式
// select表示的是被发布的自定义事件，e是事件对象
$('#rating').on('select', function(e, num, total) {
    console.log(num + '/' + total);
}).on('chosen', function(e, num, total) {
    console.log(num + '/' + total);
});
rating.initfn('#ratingOne', {
    num: 2
});