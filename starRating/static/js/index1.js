;$(function(){
    'use strict';

   var num = 2,
       $rating = $('#rating1'),
       $item = $rating.find('.rating-item');
    // console.log($item);


    // 点亮
   var lightOn = function (num) {
       $item.each(function (index) {
           if (index < num) {
               $(this).css('background-position', '0 -40px');
           }
           else {
               $(this).css('background-position', '0 0');

           }
       });
   };
   lightOn(num);

   // 事件绑定
    $item.on('mouseover', function () {
        lightOn($(this).index() + 1);
    }).on('click', function () {
        num = $(this).index() + 1;
        /*事件冒泡在此体现为：点击每个星星时，父元素ul的事件也会被触发，
        控制台会看到“子元素x被触发”+“父元素被触发”*/
        // console.log('子元素' + $(this).index() + '被触发');
    });

    // 鼠标移出评分区域时恢复以num为准的评分
    $rating.on('mouseout', function () {
        lightOn(num);
    });
    // $rating.on('click', function () {
    //     console.log('父元素被触发');
    // });
});