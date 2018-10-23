window.onload=function(){

    function getId(id) {
        return document.getElementById(id);
    }

    //是否已经加载音频资源
    var isLoadAudio = false;

    var layer = getId('layer');

    var mask = getId('mask');
   
    var maskWidth = mask.clientWidth;
   
    var progressOne = getId('progressOne');
    var progressOneWidth = progressOne.clientWidth;

    var offsetLeft = getId('aduioMove').offsetLeft;

    var progress = getId('progressTwo');

    function moveMask(e) {
        var pageX = e.touches[0].pageX;

        var x = pageX - offsetLeft - maskWidth / 2;

        var maxX = progressOneWidth - maskWidth / 2;

        var minX = -maskWidth / 2;

        x = x >= maxX ? maxX : x <= minX ? minX : x;

        mask.style.left = x + 'px';

        progress.style.width = x + maskWidth / 2 + 'px';

        audio.currentTime = (x + maskWidth / 2) / progressOneWidth * audio.duration;
        // console.log(audio.currentTime);

    }


    layer.ontouchstart = function(e) {

        if (!isLoadAudio) { return; };
        moveMask(e);

    }

    layer.ontouchmove = function(e) {

        if (!isLoadAudio) { return; };
        moveMask(e);

    }

    //切换播放和暂停按钮
    var isPlay = false;
    $('.bottom-two-middle-play').on('click', function() {
        var mode = $('.bt-rigth>i').attr('class');
        if (mode == 'fa fa-exchange') {
            //列表顺序播放
            played();

        } else if (mode == 'fa fa-refresh') {
            //单曲循环
            simpleLoopPlay();

        } else if (mode == 'fa fa-random') {
            //随机播放
            randomPlay();
        }

        var $i = $(this).find('.playing-i');
        if (isPlay) {
            //停止播放
            $i.removeClass('fa-pause').addClass('fa-play');
            isPlay = false;

            //停止音乐
            audio.pause();

            $('#list').find('li.audio-active').find('i').removeClass('fa-pause').addClass('fa-play').end().data('play', false);

            //停止碟子旋转
            $('#photo').css({ 'animation-play-state': 'paused' });
            $(".auto-img").css({ 'animation-play-state': 'paused' });
        } else {
            //播放
            $i.removeClass('fa-play').addClass('fa-pause');
            isPlay = true;

            //播放音乐
            audio.play();

            var luck= $('#list').find('li.audio-active').find('.one-text').text();

            $('.bottom-two-left-text').text(luck);

            $('#list').find('li.audio-active').find('i').removeClass('fa-play').addClass('fa-pause').end().data('play', true);

            //碟子旋转
            $('#photo').css({ 'animation-play-state': 'running' });
            $('.auto-img').css({ 'animation-play-state': 'running' });
        }
    })

    //切换播放模式
    $('.bottom-two-right-one').on('click', function() {
        $('#bottomChange').slideToggle(300);
        $('#smallMove').slideUp(300);
    })

    //修改音量
    $('.bottom-two-right-two').on('click', function(e) {

        $('#bottomChange').slideUp(300);

        if ($(e.target).attr('id') == 'smallLayer') {
            return;
        }

        $('#smallMove').slideToggle(300);

    })

    //切换写真面板
    $('#bottom-two-left-img').on('click', function() {
        $('#photography').toggle(300);
    })

    //关闭写真面板
    $('#close').on('click', function() {
        $('#photography').toggle(300);
    })

    var smallMask = getId('smallMask');
    var smallMaskHeight = parseInt(window.getComputedStyle(smallMask).height);

    var $smallMove = $('#smallMove');
    var height = $smallMove.innerHeight();
    // console.log(height);

    var $smallLayer = $('#smallLayer');
    var smallLayerHeight = $smallLayer.height();
    // console.log(smallLayerHeight);

    var bottomSmallMoveHeight = $("#bottomSmallMove").height();
    // console.log(bottomSmallMoveHeight);

    var bottomMove = getId('bottom').offsetTop;
    // console.log(bottomMove);
    var offsetTop = bottomMove - (height - bottomSmallMoveHeight);
    // console.log(offsetTop);

    var smallNotActive = $('#smallNotActive').height();


    var smallActive = $('#smallActive');

    var smallLayer = $('#smallLayer');

    smallLayer[0].ontouchstart = function(e) {

        moveSmallMask(e);
    }

    smallLayer[0].ontouchmove = function(e) {
        moveSmallMask(e);
    }

    function moveSmallMask(e) {
        // e.preventDefault();
        var pageY = e.touches[0].pageY;
        var y = pageY - offsetTop - smallMaskHeight / 2;

        var minY = 0;

        var maxY = smallNotActive;

        y = y >= maxY ? maxY : y <= minY ? minY : y;
  

        smallMask.style.top = y + "px";
        smallActive.css({
            height: (y + smallMaskHeight / 2) + "px"
        });

        audio.volume=(smallNotActive-y) /smallNotActive ;
    }


    var loveYou = love.musicSrc;
 
    var audio = $('#audio')[0];

    var $play = $('.bottom-two-middle-play');

    var $lis = $('#list>li');
    $lis.on('click', function() {
        $(".bottom-two-left-img").find(".auto-img").remove();
        var vvvv = $(this).find(".auto-img-one");
        var vvv = vvvv.get(0).src;
        var vv = $('<img class="auto-img" src="' + vvv + '" />');
        $(".bottom-two-left-img").append(vv);
        $('#photo').css({
            background: 'url("' + vvv + '") no-repeat',
            backgroundSize: "cover"
        })

        isLoadAudio = true;

        if (!$(this).hasClass('audio-active')) {

            $(this).addClass('audio-active').siblings().removeClass('audio-active');

            //获取当前li自定义的data属性
            var url = $(this).data('url');

            audio.src = url;

            audio.play();

            var luck= $('#list').find('li.audio-active').find('.one-text').text();

            $('.bottom-two-left-text').text(luck);

            var luckDay=$('#list').find('li.audio-active').find('.singer').text();
         	$('.bottom-two-left-name').text(luckDay);

            $(this).find('i').removeClass('fa-play').addClass('fa-pause').end().siblings().find('i').removeClass('fa-pause').addClass('fa-play');

            $(this).data('play', true).siblings().data('play', false);

            $play.find('i').removeClass('fa-play').addClass('fa-pause');

            //转动碟子
            $('#photo').css({ 'animation-play-state': 'running' });
            $('.auto-img').css({ 'animation-play-state': 'running' });

            isPlay = true;

        } else {
            //点击相同的li, 那么只做停止或者播放音乐

            var isPlaying = $(this).data('play');

            if (isPlaying) {
                //如果播放，那么停止
                audio.pause();

                $(this).find('i').removeClass('fa-pause').addClass('fa-play');
                $play.find('i').removeClass('fa-pause').addClass('fa-play');

                //停止转动碟子
                $('#photo').css({ 'animation-play-state': 'paused' });
                $('.auto-img').css({ 'animation-play-state': 'paused' });

                isPlay = false;

            } else {
                //如果停止，那么播放
                audio.play();

                var luck= $('#list').find('li.audio-active').find('.one-text').text();

          		 $('.bottom-two-left-text').text(luck);

                var luckDay=$('#list').find('li.audio-active').find('.singer').text();
        		 $('.bottom-two-left-name').text(luckDay);

                $(this).find('i').removeClass('fa-play').addClass('fa-pause');

                $play.find('i').removeClass('fa-play').addClass('fa-pause');

                //转动碟子
                $('#photo').css({ 'animation-play-state': 'running' });
                $('.auto-img').css({ 'animation-play-state': 'running' });

                isPlay = true;

            }

            $(this).data('play', !isPlaying);

        }


    })

    //监听音乐的实时变化

    function formatTime(selector, time) {
        var hours = Math.floor(time / 60 / 60 % 60);
        hours = hours >= 10 ? hours : '0' + hours;

        var minutes = Math.floor(time / 60 % 60);
        minutes = minutes >= 10 ? minutes : '0' + minutes;

        var seconds = Math.floor(time % 60);
        seconds = seconds >= 10 ? seconds : '0' + seconds;

        $(selector).text(hours + ':' + minutes + ':' + seconds);
    }

    audio.ontimeupdate = function() {

        //总时长
        var duration = this.duration;
        if (!isNaN(duration)) {
            //当前的播放时间
            var currentTime = this.currentTime;

            //获取当前时间和总时间的百分比
            var percent = currentTime / duration;

            var activeWidth = progressOneWidth * percent;

            //设置激活进度条的宽度
            progress.style.width = activeWidth + 'px';

            //小滑块移动距离
            mask.style.left = activeWidth - maskWidth / 2 + 'px';

            //设置总时间文本
            formatTime('#timeTwo', duration);

            //设置当前时间文本
            formatTime('#timeOne', currentTime);

            if (activeWidth == progressOneWidth) {

                //播放完成当前音频, 根据播放模式播放下一首

                var mode = $('.bt-rigth>i').attr('class');
                if (mode == 'fa fa-exchange') {
                    //列表顺序播放
                    played("next");

                } else if (mode == 'fa fa-refresh') {
                    //单曲循环
                    simpleLoopPlay("next");

                } else if (mode == 'fa fa-random') {
                    //随机播放
                    randomPlay("next");
                }


            }

        }
    }

        
        $('#bottomChange>div').on('click', function() {
            $('.bt-rigth>i').remove();
            var changeingClass = $(this).find("i").attr("class");
            var changeBottom = $('<i class="' + changeingClass + '"></i>');
            $('.bt-rigth').append(changeBottom);

        })

        function randomPlay(toggle) {
            //获取所有li
            var $lis = $('#list>li');

            //获取一个激活的li
            var $activeLi = $('#list>li.audio-active')[0];

            //获取随机下标
            var randomIndex = Math.floor(Math.random() * $lis.length);


            if ($activeLi) {
                //如果存在被激活的li
                //直接播放

                //上下首切换
                if (toggle) {
                    $lis.eq(randomIndex).addClass('audio-active').siblings().removeClass('audio-active');

                    $lis.eq(randomIndex).data('play', true).find('i').addClass('fa-pause').removeClass('fa-play');

                    //如果当前激活的li和随机激活的li不一致
                    if (!($lis.eq(randomIndex)[0] == $activeLi)) {

                        $($activeLi).data('play', false).find('i').addClass('fa-play').removeClass('fa-pause');

                    }

                    //加载audio
                    audio.src = $lis.eq(randomIndex).data('url');

                    audio.play();
                    var luck= $('#list').find('li.audio-active').find('.one-text').text();

         		   $('.bottom-two-left-text').text(luck);

         		   var luckDay=$('#list').find('li.audio-active').find('.singer').text();
         			$('.bottom-two-left-name').text(luckDay);

                    $('.bottom-two-middle-play').find('i').addClass('fa-pause').removeClass('fa-play');

                    isPlay = true;

                }

            } else {

                //播放暂停按钮
                //修改音频已加载状态
                isLoadAudio = true;
                //加载audio
                audio.src = $lis.eq(randomIndex).data('url');
                $lis.eq(randomIndex).addClass('audio-active');

            }


        }

        //单曲循环
        function simpleLoopPlay(toggle) {

            //获取所有li
            var $lis = $('#list>li');

            //获取一个激活的li
            var $activeLi = $('#list>li.audio-active')[0];

            if ($activeLi) {
                //如果存在被激活的li
                //直接播放

                if (toggle) {
                    audio.load();
                    audio.play();
                    var luck= $('#list').find('li.audio-active').find('.one-text').text();

          			  $('.bottom-two-left-text').text(luck);

          			  var luckDay=$('#list').find('li.audio-active').find('.singer').text();
        			 $('.bottom-two-left-name').text(luckDay);

                    $($activeLi).data('play', true).find('i').addClass('fa-pause').removeClass('fa-play');
                    $('.bottom-two-middle-play').find('i').addClass('fa-pause').removeClass('fa-play');

                    isPlay = true;
                }

            } else {

                //修改音频已加载状态
                isLoadAudio = true;

                var $firstLi = $lis.eq(0);

               audio.src = $firstLi.data('url');

        }

    }

    //随机模式
    function randomPlay(toggle) {
        //获取所有li
        var $lis = $('#list>li');

        //获取一个激活的li
        var $activeLi = $('#list>li.audio-active')[0];

        //获取随机下标
        var randomIndex = Math.floor(Math.random() * $lis.length);

        
        
        if ($activeLi) {
            //如果存在被激活的li
            //直接播放

            //上下首切换
            if (toggle) {
                $lis.eq(randomIndex).addClass('audio-active').siblings().removeClass('audio-active');

                $lis.eq(randomIndex).data('play', true).find('i').addClass('fa-pause').removeClass('fa-play');

                //如果当前激活的li和随机激活的li不一致
                if (!($lis.eq(randomIndex)[0] == $activeLi)) {

                    $($activeLi).data('play', false).find('i').addClass('fa-play').removeClass('fa-pause');
        
                }

                //加载audio
                audio.src = $lis.eq(randomIndex).data('url');

                audio.play();
                var luck= $('#list').find('li.audio-active').find('.one-text').text();

           		 $('.bottom-two-left-text').text(luck);

           		 var luckDay=$('#list').find('li.audio-active').find('.singer').text();
         		$('.bottom-two-left-name').text(luckDay);

                $('.bottom-two-middle-play').find('i').addClass('fa-pause').removeClass('fa-play');

                isPlay = true;

            }

        } else {

            //播放暂停按钮
            //修改音频已加载状态
            isLoadAudio = true;
            //加载audio
            audio.src = $lis.eq(randomIndex).data('url');
            $lis.eq(randomIndex).addClass('audio-active');

        }

        
    }

    //单曲循环
    function simpleLoopPlay(toggle) {

        //获取所有li
        var $lis = $('#list>li');

        //获取一个激活的li
        var $activeLi = $('#list>li.audio-active')[0];

        if ($activeLi) {
            //如果存在被激活的li
            //直接播放

            if (toggle) {
                audio.load();
                audio.play();
                var luck= $('#list').find('li.audio-active').find('.one-text').text();

                $('.bottom-two-left-text').text(luck);

               var luckDay=$('#list').find('li.audio-active').find('.singer').text();
         		$('.bottom-two-left-name').text(luckDay);

                $($activeLi).data('play', true).find('i').addClass('fa-pause').removeClass('fa-play');
                $('.bottom-two-middle-play').find('i').addClass('fa-pause').removeClass('fa-play');

                isPlay = true;
            }

        } else {

            //修改音频已加载状态
            isLoadAudio = true;

            var $firstLi = $lis.eq(0);

            $firstLi.addClass('audio-active');

            audio.src = $firstLi.data('url');

        }

    }


    function togglePlay($lis, $activeLi, index) {
        //下一个激活的li
        var $lastLi = $lis.eq(index);

        $lastLi.addClass('audio-active').siblings().removeClass('audio-active');

        //修改当前播放状态
        $($activeLi).data('play', false);
        $($activeLi).find('i').addClass('fa-play').removeClass('fa-pause');

        $lastLi.data('play', true);
        $lastLi.find('i').addClass('fa-pause').removeClass('fa-play');

        audio.src = $lastLi.data('url');

        audio.play();
        var luck= $('#list').find('li.audio-active').find('.one-text').text();

            $('.bottom-two-left-text').text(luck);

         var luckDay=$('#list').find('li.audio-active').find('.singer').text();
         $('.bottom-two-left-name').text(luckDay);

        $('.bottom-two-middle-play').find('i').addClass('fa-pause').removeClass('fa-play');

        isPlay = true;
    }
    //列表顺序播放
    function played(toggle) {

        //获取所有li
        var $lis = $('#list>li');

        //获取一个激活的li
        var $activeLi = $('#list>li.audio-active')[0];

        if ($activeLi) {
            //如果存在被激活的li
            //直接播放

            //获取当前激活的li下标
            var index = $($activeLi).index();

            if (toggle == 'prev') {
                //上一首
                index = index == 0 ? $lis.length - 1 : --index;

                togglePlay($lis, $activeLi, index);

            } else if (toggle == 'next') {
                //下一首
                index = index == $lis.length - 1 ? 0 : ++index;

                togglePlay($lis, $activeLi, index);

            }


        } else {

            //修改音频已加载状态
            isLoadAudio = true;

            var $firstLi = $lis.eq(0);

            $firstLi.addClass('audio-active');

            audio.src = $firstLi.data('url');

        }

    }

    // 切换上下首
    //上一首
    $('#prev').on('click', function () {

        // 获取激活的li
        var $activeLi = $('#list>li.audio-active');
        if (!$activeLi[0]) {
            //如果当前没有激活li, 直接拦截
            return;
        }

          var mode = $('.bt-rigth>i').attr('class');
                if (mode == 'fa fa-exchange') {
                    //列表顺序播放
                    played("prev");

                } else if (mode == 'fa fa-refresh') {
                    //单曲循环
                    simpleLoopPlay("prev");

                } else if (mode == 'fa fa-random') {
                    //随机播放
                    randomPlay("prev");
                }

       $(".bottom-two-left-img").find(".auto-img").remove();
        var vvvv =$('#list').find('li.audio-active').find(".auto-img-one");
        var vvv = vvvv.get(0).src;
        var vv = $('<img class="auto-img" src="' + vvv + '" />');
        $(".bottom-two-left-img").append(vv);
        $('#photo').css({
            background: 'url("' + vvv + '") no-repeat',
            backgroundSize: "cover"
        })  
        $('.auto-img').css({ 'animation-play-state': 'running' });

    })

    //下一首
    $('#next').on('click', function () {

        // 获取激活的li
        var $activeLi = $('#list>li.audio-active');
        if (!$activeLi[0]) {
            //如果当前没有激活li, 直接拦截
            return;
        }

          var mode = $('.bt-rigth>i').attr('class');
                if (mode == 'fa fa-exchange') {
                    //列表顺序播放
                    played("next");

                } else if (mode == 'fa fa-refresh') {
                    //单曲循环
                    simpleLoopPlay("next");

                } else if (mode == 'fa fa-random') {
                    //随机播放
                    randomPlay("next");
                }
        $(".bottom-two-left-img").find(".auto-img").remove();
        var vvvv =$('#list').find('li.audio-active').find(".auto-img-one");
        var vvv = vvvv.get(0).src;
        var vv = $('<img class="auto-img" src="' + vvv + '" />');
        $(".bottom-two-left-img").append(vv);
        $('#photo').css({
            background: 'url("' + vvv + '") no-repeat',
            backgroundSize: "cover"
        })
         $('.auto-img').css({ 'animation-play-state': 'running' });

    })
        
}
    
