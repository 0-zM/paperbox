var group = new Group();
var gravity = new Point(0,0);
var lastGravity = new Point(0,0);
var shade = new Color(0.2,0.5,0.8,0.5);
var actualBox = new Path.Rectangle({
    point:new Point(view.center-100,view.center-100),
    size:new Size(200,200),
    fillColor:new Color(0.7,0.7,0.7,0.3),
    selected:true,
    push:function(n,moves){
        //console.log(this.bounds);
        //console.log(moves);
        if ((n.x-n.y)*(1-n.x-n.y)>=0){
            this.scale(1,(this.bounds.height+Math.abs(moves.height))/this.bounds.height);
        } else { 
            this.scale((this.bounds.width+Math.abs(moves.width))/this.bounds.width,1);
        }
    }
});
console.log(actualBox.center);
var circleStyle = function(event){
    return {
    center: event.point,
    radius: 10,
    fillColor: shade,
    data: {
        movement: new Size(0,0),
    },
    onFrame: function(event){
        this.position += this.data.movement;
        if(this.isInside(actualBox)){
            this.data.movement += gravity;
        }else{
            n = (this.position-actualBox.point)/actualBox.size;
            if ((n.x-n.y)*(1-n.x-n.y) <= 0){
                this.data.movement *= [-1,1];
                if (n.x < 0.5){
                    this.position.x = 10+actualBox.bounds.x+this.data.movement.width;
                }else{
                    this.position.x = actualBox.bounds.width-10+actualBox.bounds.x+this.data.movement.width;
                }
            }else{
                this.data.movement *= [1,-1];
                if (n.y < 0.5){
                    this.position.y = 10+actualBox.bounds.y+this.data.movement.height;
                }else{
                    this.position.y = actualBox.bounds.height-10+actualBox.bounds.y+this.data.movement.height;
                }
            }
            actualBox.push(n,this.data.movement);
        }
        if(this.index == 0){
            console.log(this.data.movement);
            console.log(this.position);
            console.log(this.isInside(actualBox));
        }
    }
    }};
view.onMouseDown = function(event){
    var a = new Path.Circle(circleStyle(event));
    group.addChild(a);
}
tool.onKeyDown = function(event){
    switch(event.key){
        case "left":
            gravity += [-0.1,0];
            break;
        case "right":
            gravity += [0.1,0];
            break;
        case "up":
            gravity += [0,-0.1];
            break;
        case "down":
            gravity += [0,0.1];
            break;
        case "d":
            gravity.angle -= 30;
            break;            
        case "a":
            gravity.angle += 30;
            break;
        case "w":
            gravity.length *= 1.1;
            break;
        case "s":
            gravity.length /= 1.1;
            break;
        case "h":
            lastGravity = gravity;
            gravity *= 0;
            break;
        case "j":
            gravity = lastGravity;
            break;
        case "r":
            group.children.forEach(function(circle){
                console.log(circle);
                circle.data.movement = new Size((Point.random() * 10)-[5,5])
            });
            break;
        case "q":
            shade = new Color(Math.random(),Math.random(),Math.random(),0.5)
            break;
        
        case "o":
            tool.onKeyDown({key:"r"});
            tool.onKeyDown({key:"j"});
    }
    console.log(gravity);
}
