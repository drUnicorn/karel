$(document).ready(function () {

var world = new World(document.getElementById("world"));
world.draw();
karel = new Karel(document.getElementById("world"), world);

karel.ui = {};


$("#back-button").click(function () {
    var program = $("#codeArea").val();
    karel.parse(program);
});
$("#turnLeft-button").click(function () {
    var program = "vlevoVbok();";
    karel.parse(program);
});
$("#move-button").click(function () {
    var program = "krok();";
    karel.parse(program);
});
$("#draw-button").click(function () {
    var world = new World(document.getElementById("world"));
    world.draw();
    karel = new Karel(document.getElementById("world"), world);
});

karel.ui.disable = function(){
  $('#back-button').attr('disabled',true);
};

karel.ui.enable = function(){
  $('#back-button').attr('disabled',false);
}

karel.parse = function(str){
  try{
   parser.parse(str);
  }catch(e){
   alert(e.message);
  }
}

window.vlevoVbok = function() {
    karel.turnLeft();
}
window.krok = function() {
    karel.move();
}

Object.defineProperty(window,'sever',{
 get: function(){
  return karel.direction == 'N';
 }
});

Object.defineProperty(window,'jih',{
 get: function(){
  return karel.direction == 'S';
 }
});

Object.defineProperty(window,'vychod',{
 get: function(){
  return karel.direction == 'E';
 }
});

Object.defineProperty(window,'zapad',{
 get: function(){
  return karel.direction == 'W';
 }
});

Object.defineProperty(window,'zed',{
 get: function(){
  return karel.isWall();
 }
});

});
