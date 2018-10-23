 var fun = $('.list-one').find("li");
 var a = 0;
 var timer = null;
 timer = setInterval(function() {
     a += -19;
     $('.list-one').css({ top: (-57 + a) + "px" });
     if ((-57 + a) == -76) {
         $('.list-one').css({ top: 0 + "px" });
         a = 57;
     }

 }, 3000);

 var date = new Date("2018-12-12 12:1:2");
 var gg = date.getHours();
 var gg1 = date.getMinutes();
 var gg2 = date.getSeconds();
 var timers = setInterval(function() {
     $(".miaosha-time").text(gg + " : " + gg1 + " : " + gg2);
     if (gg == 0 && gg1 == 0 && gg2 == 0) {
         clearInterval(timers);
         clearInterval(timer);
         timer = null;
         timers = null;
     }
     if (gg1 == 0 && gg2 == 0) {
         gg--;
         gg1 = 60;
     }
     if (gg2 == 0) {
         gg1--;
         gg2 = 60;
     }

     gg2--;

 }, 1000)

