$(document).ready(function () {
    var world = new World(document.getElementById("world"));
    world.draw();
    karel = new test();
    karel.test();
    karel = new Karel(document.getElementById("world"), world);

});
$("#back-button").click(function () {
    var program = $("#codeArea").val();
    eval(program);
});
$("#turnLeft-button").click(function () {
    var program = "vlevoVbok();";
    eval(program);
});
$("#move-button").click(function () {
    var program = "krok();";
    eval(program);
});
$("#draw-button").click(function () {
    var world = new World(document.getElementById("world"));
    world.draw();
    karel = new test();
    karel.test();
    karel = new Karel(document.getElementById("world"), world);
});
function vlevoVbok() {
    karel.turnLeft();
}
function krok() {
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
