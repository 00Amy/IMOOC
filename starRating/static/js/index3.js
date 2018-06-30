var rating = (function  () {
    // 默认参数
    var defaults = {
        num: 0,
        readOnly: false,
        select: function () {},  //鼠标移上时
        chosen: function () {}   //鼠标点击时
    };

    // 点亮整颗星星
    var lightEntire = function (el, options) {
        // console.log(this);
        this.$el = $(el);
        this.$item = this.$el.find('.rating-item');
        this.opts = options;
    };

    // 编写lightEntire的初始化方法，一般将方法都写在构造函数的原型上，
    // 以便无论实例化多少次内存中都只有一份
    lightEntire.prototype.init = function () {
        // console.log(this);
        this.lightOn(this.opts.num);
        if (!this.opts.readOnly) {
            this.bindEvents();
        }
    };
    lightEntire.prototype.lightOn = function (num) {
        num = parseInt(num);

        this.$item.each(function (index) {
            if (index < num) {
                $(this).css('background-position', '0 -40px');
            }
            else {
                $(this).css('background-position', '0 0');

            }
        });
    };
    lightEntire.prototype.bindEvents = function () {
        var self = this,
            itemLength = self.$item.length;

        self.$el.on('mouseover', '.rating-item', function () {
            var currentId = $(this).index() + 1;

            self.lightOn(currentId);
            // call的作用:强制把this的作用域绑定到了当前调用者的位置上，即每颗星星
            (typeof self.opts.select === 'function') && self.opts.select.call(this, currentId, itemLength);
            // 当鼠标移动事件触发之后，那么同时在$el的区域发布一个select事件，并传入参数
            self.$el.trigger('select', [currentId, itemLength]);
        }).on('click', '.rating-item', function () {
            self.opts.num = $(this).index() + 1;
            (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
            // 当鼠标移动事件触发之后，那么同时在$el的区域发布一个chosen事件，并传入参数
            self.$el.trigger('chosen', [self.opts.num, itemLength]);
        }).on('mouseout', function () {
            self.lightOn(self.opts.num);
        });
    };

    // 初始化方法，参数：id和用户传入的参数
    var init = function (el, options) {
        // 用options覆盖defaults，并赋给{}
        options = $.extend({}, defaults, options);
        new lightEntire(el, options).init();
    };

    return {
        initFn: init
    };
})();

rating.initFn('#rating3-1',{
    num: 1,
    // 第一种执行方法
    select: function (num, total) {
        console.log(this);
        console.log(num + '/' + total);
    },
    chosen: function (num, total) {
        console.log(this);
        console.log('click:' + num + '/' + total);
    }
});


// 第二种实现方式
// select表示的是被发布的自定义事件，e是事件对象

rating.initFn('#rating3-2',{
    num: 2,
});
$('#rating3-2').on('select', function (e, num, total) {
    console.log(num + '/' + total);
}).on('chosen', function (e, num, total) {
    console.log('click:' + num + '/' + total);
});