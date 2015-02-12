
function test() {
    this.test = function () {
        //alert("test");
    };
}
function Karel(element, world) {
    var row = 0, col = 0,scr=2,lcr=5;
    var self = this;
    this.direction = "N";

    var context = element.getContext("2d");
    this.draw = function () {
        world.draw();
        var cellCenter = world.getCellCenter(row, col);
        switch (self.direction) {
            case "N":
                circle(context, cellCenter.x, cellCenter.y - scr, scr);
                circle(context, cellCenter.x, cellCenter.y + lcr, lcr);
                break;
            case "W":
                circle(context, cellCenter.x - scr, cellCenter.y, scr);
                circle(context, cellCenter.x + lcr, cellCenter.y, lcr);
                break;
            case "S":
                circle(context, cellCenter.x, cellCenter.y + scr, scr);
                circle(context, cellCenter.x, cellCenter.y - lcr, lcr);
                break;
            case "E":
                circle(context, cellCenter.x + scr, cellCenter.y, scr);
                circle(context, cellCenter.x - lcr, cellCenter.y, lcr);
                break;
            default:
        }
        setTimeout(self.draw,200);
    };
    this.move = function () {
        var worldSize = world.getSize();

        switch (this.direction) {
            case "N":
                if (row == 0) alert("Au! Narazil jsem!");
                else row = row - 1;
                break;
            case "W":
                if (col == 0) alert("Au! Narazil jsem!");
                else col = col - 1;
                break;
            case "S":
                if (row == worldSize.height-1) alert("Au! Narazil jsem!");
                else row = row + 1;
                break;
            case "E":
                if (col == worldSize.width-1) alert("Au! Narazil jsem!");
                else col = col + 1;
                break;
        }
    };
    this.isWall = function () {
     var worldSize = world.getSize();
     switch (this.direction) {
      case "N":
       if (row == 0) return true;
       break;
      case "W":
       if (col == 0) return true;
       break;
      case "S":
       if (row == worldSize.height-1) return true;
       break;
      case "E":
       if (col == worldSize.width-1) return true;
       break;
     }
     return false;
    };
    this.turnLeft = function () {
        switch (this.direction) {
            case "N": this.direction = "W"; break;
            case "W": this.direction = "S"; break;
            case "S": this.direction = "E"; break;
            case "E": this.direction = "N"; break;
        }
    };
    //Starting the cons logic
    this.draw();
}
function circle(context,x,y,r){
context.beginPath();
                context.strokeStyle = "red";
                context.lineWidth = 1;
                context.arc(x, y, r, 0, (Math.PI / 180) * 360, false);
                context.stroke();
                context.closePath();
}
