var rating = (function() {
    // 初始点亮的星星数量的函数
    var lightOn = function($item, num) {
        $item.each(function(index) {
            if(index < num) {
                $(this).css('background-position', '0 -40px');
            } else {
                $(this).css('background-position', '0 0');
            }
        })
    };

    var init = function(el, num) {
        var $rating = $(el);
        var $item = $rating.find('.rating-item');
        // 调用lightOn函数，并传入参数
        lightOn($item, num);
        // 事件绑定(将子元素的事件委托给父元素处理)
        $rating.on('mouseover', '.rating-item', function() {
            lightOn($item, $(this).index() + 1);
        }).on('click', '.rating-item', function() {
            num = $(this).index() + 1;
        }).on('mouseout', function() {
            lightOn($item, num);
        });
    };
    // jQuery插件
    $.fn.extend({
        ratingStar: function(num) {
            return this.each(function() {
                init(this, num)
            })
        }
    });

    return {
        initfn: init
    }

})();


rating.initfn('#rating', 2);
rating.initfn('#ratingOne', 3);
// 插件式调用
$('#ratingTwo').ratingStar(4);