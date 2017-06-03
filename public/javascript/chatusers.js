//Username matches the user’s username 
//From handlebarprofile
$(document).ready(function(){
					var socket = io.connect();
					var $messageForm = $('#messageForm');
					var $message = $('#message');
					var $chat = $('#chat');
					var $messageArea = $('#messageArea');
					var $userFormArea = $('#userFormArea');
					var $userForm = $('#userForm');
					var $users = $('#users');
					//var $username = $('#username');
					var $username = $(".username").html();
					console.log($username);
				

					$messageForm.submit(function(e){
						e.preventDefault();
						socket.emit('send message', $message.val());
						$message.val('');
					});
					socket.on('new message', function(data){
						$chat.append('<div class="well"><strong>'+$username+ '</strong>: '+data.msg+'</div>');
					});
					

					$userForm.submit(function(e){
						e.preventDefault();
						socket.emit('new user', $username.val(), function(data){
							if(data){
								$userFormArea.hide();
								$messageArea.show();
							}
						});
						$username.val('');
					});
					socket.on('get users', function(data){
						var html = '';
						for(i=0; i < data.length; i++){
							html += '<li class="list-group-item">'+data[i]+'</li>'
							;
						}
						$users.html(html);
					})



					$(".chat").click(function(){
						//var $namechat= $("this").attr('id');
						//console.log($namechat);
						$("#whole_page").hide();
						$("#chatbox").show();
						//console.log(this);

						//$("#chatroom").append("<h5>"+$namechat+"</h5>");
						

					});
					$(".chatback").click(function(){
						$("#whole_page").show();
						$("#chatbox").hide();

					});

				});