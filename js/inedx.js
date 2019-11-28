$(function () {
    var $flash = $('.flash');
    var $element = $('.url_img a');
    var li_len = $element.length;
    var $points_ul = $('.points');
    var $guide_left = $('.guide_left');
    var $guide_right = $('.guide_right');
    var iPrev = 0;  // 指示器变量
    var iNow = 0;  // 指示器变量
    var bFlag = false;   // 动画
    var timer = null;

    // 根据图片的数量 设置指示点
    for(var i = 0; i <li_len; i ++)
    {
        $points_ul.append('<li>');
        if(!i)
        {
            $('.points li').addClass('current');
        }
    }
    // 设置元素的初始位置
    $element.not(':first').css({'left': 760});

    // 自动切换函数
    function automove(){
        iNow++;
        move();
    }

    // 定时器
    timer = setInterval(automove, 2000);
    
    // 当鼠标移入的时候清除定时器
    $flash.mouseenter(function () {
        clearInterval(timer);
    })

    // 当鼠标移出的时候启动定时器
    $flash.mouseleave(function () {
        timer = setInterval(automove, 2000);
    })

   $('.points li').click(function () {
      iNow = $(this).index();
      move();
    });

    $guide_right.click(function () {
        if(bFlag) return;
        bFlag = true;
        iNow++;
        move();
    });

    $guide_left.click(function () {
        if(bFlag) return;
        bFlag = true;
        iNow--;
        move();
    });

    function move() {
        if(iNow > li_len - 1)
        {
            iNow = 0;
            $element.eq(iNow).css({'left': 760});
            $element.eq(iPrev).animate({'left': -760});
            $element.eq(iNow).animate({'left': 0}, function () {
                bFlag = false;
            });
            iPrev = iNow;
            $('.points li').eq(iNow).addClass('current').siblings().removeClass('current');
            return;
        }
        if(iNow < 0)
        {
            iNow = li_len - 1;
            $element.eq(iNow).css({'left': -760});
            $element.eq(iPrev).animate({'left': 760});
            $element.eq(iNow).animate({'left': 0}, function () {
                bFlag = false;
            });
            iPrev = iNow;
            $('.points li').eq(iNow).addClass('current').siblings().removeClass('current');
            return;
        }
        $('.points li').eq(iNow).addClass('current').siblings().removeClass('current');
        if(iNow > iPrev)
        {
            $element.eq(iNow).css({'left': 760});
            $element.eq(iPrev).animate({'left': -760});
        }
        else if(iNow < iPrev)
        {
            $element.eq(iNow).css({'left': -760});
            $element.eq(iPrev).animate({'left': 760});
        }
        $element.eq(iNow).animate({'left': 0}, function () {
            bFlag = false;
        });
        iPrev = iNow;
    }


});