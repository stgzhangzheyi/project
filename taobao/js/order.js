$(function () {

	$('#nickname').text(decodeURIComponent(localStorage.nickname));

	//用户名
	var username = strCrypto.removeCrypto(localStorage.username);

	var num = 1;

	function getData(status) {
		//status: 订单状态

		$('#orderData').html('');

		//发起ajax请求
		$.ajax({
			type: 'GET',
			url: './data/orderData.json',
			dataType: 'json',
			success: function (data) {
				// console.log('data ==> ', data);
				//显示当前用户的全部订单
				for (var i = 0; i < data.orders.length; i++) {

					if (username == data.orders[i].username && (data.orders[i].status == status || !status)) {
						var $tr = $('<tr>' +
									'<td>' + num++ + '</td>' +
									'<td>' + data.orders[i].name + '</td>' +
									'<td>' + data.orders[i].orderNo + '</td>' +
									'<td style="width: 120px;"><img class="auto-img" src="' +  data.orders[i].img + '" /></td>' +
									'<td>' + data.orders[i].price + '</td>' +
									'<td>' + data.orders[i].count + '</td>' +
									'<td>' + data.orders[i].date + '</td>' +
									'<td class="del">删除</td>' +
								'</tr>');

						$('#orderData').append($tr);
					}

				}
				console.log($('.del'));
				$('.del').click(function(){
				var fu=$(this).parent();
				fu.remove();
				})

				num = 1;

			}
		})
	}

	getData();

	$('.nav>li').bind('click', function () {
		
		var $span = $(this).find('span');

		if ($span.hasClass('active')) {
			return;
		}


		$span.addClass('active').parent().siblings().find('span').removeClass('active');

		var orderStatus = $(this).attr('name'); //-1, 0, 1, 2, 3

		if (orderStatus == -1) {
			getData();

		} else {
			getData(orderStatus);
		}

	})




	$('#logout').click(function () {
		delete localStorage.nickname;
		delete localStorage.username;

		location.href = './login.html';

	})
	$('#prev').click(function(){
		location.href='./home.html';

	})
})