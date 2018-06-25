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
    });

    // 鼠标移出评分区域时恢复以num为准的评分
    $rating.on('mouseout', function () {
        lightOn(num);
    });
});