var rating = (function () {

    // 点亮
    var lightOn = function ($item, num) {
        $item.each(function (index) {
            if (index < num) {
                $(this).css('background-position', '0 -40px');
            }
            else {
                $(this).css('background-position', '0 0');

            }
        });
    };

    var init = function (id, num) {
        var $rating = $(id),
            $item = $rating.find('.rating-item');

        lightOn($item, num);

        // 事件委托 + 事件绑定，第二个参数是委托的子元素
        $rating.on('mouseover', '.rating-item', function () {
            lightOn($item, $(this).index() + 1);
        }).on('click', '.rating-item', function () {
            num = $(this).index() + 1;
        }).on('mouseout', function () {
            lightOn($item, num);
        });
    };

    // jQuery插件（不太懂）
    $.fn.extend({
        starRating: function(num) {
            return this.each(function() {
                init(this, num)
            })
        }
    });

    return {
        initFn: init
    };

})();

rating.initFn('#rating2-1', 3);
$('#rating2-2').starRating(4); //插件式调用