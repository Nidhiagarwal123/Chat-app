  var socket = io();
  var chat = $('#chat').val()
  var obj = JSON.parse(chat)
  $( document ).ready(function() {
      $('#messages').empty();
  });
  //$('.messg').empty();
  for (let i = 0; i < obj.length; i++) {    
      socket.emit('chat message',obj[i]);
  }
  
  $('form').submit(function(){
    if($('#m').val() != ''){
      socket.emit('chat message',{type:'customer',message : $('#m').val()});
      if(($('#m').val()).toUpperCase() == 'GOOD MORNING'){
        var dt = new Date();
        if(dt.getHours() >  12){
          socket.emit('chat message',{type:'bot',message : "Its not a morning. isn't it ?"});
        }else if(dt.getHours() <  12){
          socket.emit('chat message',{type:'bot',message : "Great day it is"});
        }
      }else{
        socket.emit('chat message',{type:'bot',message : "Thank you"});
      }
      $('#m').val('');
      return false;
    }
  });
  socket.on('chat message', function(msg){
    if(msg.type == 'bot'){
      $('#messages').append(
      $('<li>').attr('style',  'background-color:grey;width:50%;display: inline-block;margin: 5px;float:left;').append(
          '<img src="http://www.ez-robot.com/Shop/Images/Products/31.jpg" height="35px" width="30px">' + 
            '<span style="vertical-align:top;padding: 6px;">  ' + msg.message+ '</span>'
        )
      ); 
    }else{
      $('#messages').append(
      $('<li>').attr('style',  'background-color:white;width:50%;display: inline-block;margin: 5px;float:right;').append(
          '<img src="http://storeprestamodules.com/media/catalog/product/cache/1/image/240x/9df78eab33525d08d6e5fb8d27136e95/u/s/users-256x256.png" height="35px" width="30px">' + 
            '<span style="vertical-align:top;padding: 5px;">  ' +msg.message+ '</span>'
        )
      ); 
    }
  });
