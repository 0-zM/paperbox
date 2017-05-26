var group = new Group();
group.data.translate = new Point(0,0);
group.data.scale = 1;
group.data.scaleRightNow = 1;
var tline;
view.onClick = function(event){
    tline = new Path.Rectangle(event.point-new Point(20,20),event.point+new Point(20,20));
    tline.fillColor = "black";
    tline.data.start = true;
    tline.data.on = false;
    tline.data.minimumB = (Math.random()*6+3) / group.data.scaleRightNow;
    tline.data.maximumB = (Math.random()*40+20) / group.data.scaleRightNow;
    tline.data.minimum = tline.data.minimumB;
    tline.data.maximum = tline.data.maximumB;
    tline.onClick = function(event){
        this.data.on = !this.data.on;
        return false;
    };
    tline.onFrame = function(event){
        this.data.minimum = this.data.minimumB * group.data.scaleRightNow;
        this.data.maximum = this.data.maximumB * group.data.scaleRightNow;
        if (!this.data.on){
            this.scale(0.99);
            if(this.bounds.width < this.data.minimum){
                this.data.on = true;
                this.fillColor = "green";
            }
        } else {
            this.scale(1/0.99);
            if (this.bounds.width > this.data.maximum){
                this.data.on = false;
                this.fillColor = "blue";
            }
        }
    }
    group.addChild(tline);
    
}
tool.onKeyDown = function(event){
    switch(event.key){
        case "left":
            group.data.translate += new Point(3,0);
            break;
        case "right":
            group.data.translate += new Point(-3,0);
            break;   
        case "up":
            group.data.translate += new Point(0,3);
            break;
        case "down":
            group.data.translate += new Point(0,-3);
            break;
        case "space":
            group.data.translate *= 0.5;
            group.data.scale = ((group.data.scale-1)*0.5)+1; 
            break;
        case "-":
            group.data.scale *= 0.99;
            break;
        case "+":
            group.data.scale *= 1/0.99;
            break;
    }
}
group.onFrame = function(event){
    group.translate(group.data.translate);
    group.data.translate = group.data.translate * 0.98;
    group.scale(group.data.scale,view.center);
    group.data.scaleRightNow *= group.data.scale;
    group.data.scale = ((group.data.scale-1)*0.98)+1;
}
