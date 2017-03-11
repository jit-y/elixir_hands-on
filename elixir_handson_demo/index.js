const $ = require('jquery');

$(function(){
  var socket = null;
  var msgBox = $("#chatbox textarea");
  var messages = $("#messages");
  $("#chatbox").submit(function(){
    if (!msgBox.val()) return false;
    if (!socket) {
      alert("エラー: WebSocket接続が行われていません。");
      return false;
    }
    socket.send(msgBox.val());
    msgBox.val("");
    return false;
  });
  if (!window["WebSocket"]) {
    alert("エラー: WebSocketに対応していないブラウザです。")
  } else {
    socket = new WebSocket("ws://localhost:4000/websocket");
    socket.onmessage = function(e) {
      messages.append($("<li>").text(e.data));
    }
  }
});
