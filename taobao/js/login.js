var valid = {

  //是否为空
  isEmpty: function(val) {
    //trim(): 去除字符串的左右空格
    return val == undefined || val.trim() == '';
  },

  //用户名：字母和数字, 3 - 6位
  isUsername: function(val, min, max) {
    // return /^[A-Za-z\d]{3,6}/.test(val);

    return new RegExp('^[A-Za-z\\d]{' + min + ',' + max + '}').test(val);
  },

  //密码： 字母和数字,下划线 6 - 16
  isPassword: function(val, min, max) {
    return new RegExp('^[A-Za-z\\d_]{' + min + ',' + max + '}').test(val);
  }

};

$(function() {

  var isUser = false;

  var isPwd = false;

  $('#username,#password').on('input', function() {

    var id = $(this).attr('id');

    if (id == 'username') {

      var username = $(this).val();

      if (valid.isEmpty(username)) {

        $('.username-alert').text('用户名不能为空').slideDown(150);

        isUser = false;
      } else if (!valid.isUsername(username, 3, 6)) {
        $('.username-alert').text('用户名：字母和数字, 3 - 6位').slideDown(150);
        isUser = false;
      } else {
        $('.username-alert').text('').slideUp(150);
        isUser = true;
      }

    } else if (id == 'password') {

      var password = $(this).val();

      if (valid.isEmpty(password)) {

        $('.password-alert').text('密码不能为空').slideDown(150);

        isPwd = false;

      } else if (!valid.isPassword(password, 6, 16)) {

        $('.password-alert').text('密码：字母和数字和下划线组合, 6 - 16位').slideDown(150);

        isPwd = false;

      } else {
        $('.password-alert').text('').slideUp(150);

        isPwd = true;
      }

    }

    $('#login').prop('disabled', !(isUser && isPwd));


  })

  //登录
  $('#login').on('click', function() {
    var username = $('#username').val();
    var password = $('#password').val();

    $.ajax({
      type: 'GET',
      url: './data/userData.json',
      dataType: 'json',
      success: function(data) {

        var isHasUser = false;
        var userPwd = '';
        var nickname = '';

        //验证用户是否存在, 如果用户存在, 则需要验证密码
        for (var i = 0; i < data.users.length; i++) {
          if (username === data.users[i].name) {
            isHasUser = true;
            userPwd = data.users[i].pwd;
            nickname = data.users[i].nickname;
            break;
          }
        }

        //如果用户存在验证密码
        if (isHasUser) {
          if (password == userPwd) {
            console.log('登录成功');

            //将用户的匿名保存在本地存储
            localStorage.nickname = encodeURIComponent(nickname);

            localStorage.username = strCrypto.addCrypto(username);

            location.href = './home.html';

            //跳转到首页
            // location.href = './home.html?nickname=' + nickname;

          } else {
            $('.password-alert').text('密码不正确').slideDown(150);
          }

        } else {
          $('.username-alert').text(username + '用户不能存在').slideDown(150);
        }

      }
    })
  })

})