var rating = (function  () {

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

    // 点亮半颗星星
    var lightHalf = function (el, options) {
        // console.log(this);
        this.$el = $(el);
        this.$item = this.$el.find('.rating-item');
        this.opts = options;
        this.add = 1;
    };
    lightHalf.prototype.init = function () {
        // console.log(this);
        this.lightOn(this.opts.num);
        if (!this.opts.readOnly) {
            this.bindEvents();
        }
    };
    lightHalf.prototype.lightOn = function (num) {
        var count = parseInt(num),
            isHalf = (num !== count);

        // 正常点亮
        this.$item.each(function (index) {
            if (index < count) {
                $(this).css('background-position', '0 -40px');
            }
            else {
                $(this).css('background-position', '0 0');

            }
        });
        // 点亮半颗
        if (isHalf) {
            this.$item.eq(count).css('background-position', '0 -80px');
        }
    };
    lightHalf.prototype.bindEvents = function () {
        var self = this,
            itemLength = self.$item.length;

        self.$el.on('mousemove', '.rating-item', function (e) {
            var $this = $(this),
                num = 0;

            if (e.pageX - $this.offset().left < $this.width() / 2) {
                self.add = 0.5;
            }else {
                self.add = 1;
            }
            num = $this.index() + self.add;
            self.lightOn(num);
            (typeof self.opts.select === 'function') && self.opts.select.call(this, num, itemLength);
            self.$el.trigger('select', [num, itemLength]);
        }).on('click', '.rating-item', function () {
            self.opts.num = $(this).index() + self.add;
            (typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
            self.$el.trigger('chosen', [self.opts.num, itemLength]);
        }).on('mouseout', function () {
            self.lightOn(self.opts.num);
        });
    };

    // 默认参数
    var defaults = {
        mode: 'lightEntire',
        num: 0,
        readOnly: false,
        select: function () {},  //鼠标移上时
        chosen: function () {}   //鼠标点击时
    };

    var mode = {
        'lightEntire': lightEntire,
        'lightHalf': lightHalf
    };

    // 初始化方法，参数：id和用户传入的参数
    var init = function (el, options) {
        if (!mode[options.mode]) {
            options.mode = 'lightEntire';
        }
        options = $.extend({}, defaults, options);  // 用options覆盖defaults，并赋给{}
        new mode[options.mode](el, options).init();
    };

    return {
        initFn: init
    };

})();

rating.initFn('#rating4-1',{
    mode:'lightEntire',
    num: 2,
    select: function (num, total) {
        // console.log(num + '/' + total);
    },
    chosen: function (num, total) {
        console.log('click:' + num + '/' + total);
    }
});

rating.initFn('#rating4-2',{
    mode:'lightHalf',
    num: 2.5,
    select: function (num, total) {
        // console.log(num + '/' + total);
    },
    chosen: function (num, total) {
        console.log('click:' + num + '/' + total);
    }
});

// 第二种实现方式
// select表示的是被发布的自定义事件，e是事件对象
//
// rating.initFn('#rating4',{
//     num: 2.5,
// });
// $('#rating4').on('select', function (e, num, total) {
//     console.log(num + '/' + total);
// }).on('chosen', function (e, num, total) {
//     console.log('click:' + num + '/' + total);
// });