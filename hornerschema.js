var aText = function(content,offset,maxOffset,addedHorOffset,verticalOffset){
    return new PointText({
        position:[
            50+(view.size.width-50)*(offset+addedHorOffset)/maxOffset,
            view.center.y + verticalOffset
            ],
        content:content,
        fontSize:25,
        justification:"center",
    });
}

var doHorner = function(){
    
    var generalGroup = new Group();
    var integerUsed = prompt("Bitte gib eine Zahl im Binärsystem an.","111111");
    arrayOfBits = integerUsed.split("");
    var test = Number.parseInt(integerUsed,2);
    var writtenNumber = 0;
    var guideLine = new Path.Line({
        from:[40,view.center.y+40],
        to:[view.bounds.width-40,view.center.y+40],
        strokeColor:"black",
        strokeWidth:1.5
    });
    generalGroup.addChild(guideLine);
    
    
    for (var i=0; i < arrayOfBits.length; i++){
        
        var numberDisplay = aText(arrayOfBits[i],i,arrayOfBits.length,0,-90);
        generalGroup.addChild(numberDisplay);
        
        writtenNumber += Number.parseInt(arrayOfBits[i],2);
        
        if (i != arrayOfBits.length - 1){
            
            var multiplicationSymbol = aText("•",i,arrayOfBits.length,0,-30);
            generalGroup.addChild(multiplicationSymbol);
            var plus = aText("+",i,arrayOfBits.length,0.35,-30);
            generalGroup.addChild(plus);
            var two = aText(2,i,arrayOfBits.length,0,30);
            generalGroup.addChild(two);
            
            var arrow = new Path.Line({
                from:two.position+[10,-10],
                to:numberDisplay.position+[(view.bounds.width-100)/(arrayOfBits.length),10],
                strokeColor:"black",
                strokeWidth:1.5
                });
            generalGroup.addChild(arrow);
            
            writtenNumber = writtenNumber * 2;
        } else {
            var arrow = new Path.Line({
                from:numberDisplay.position+[0,20],
                to:numberDisplay.position+[0,120],
                strokeColor:"black",
                strokeWidth:1.5
            });
            generalGroup.addChild(arrow);
        }
        
        console.log(writtenNumber);
        var writtenDisplay = aText(writtenNumber,i,arrayOfBits.length,0,90);
        generalGroup.addChild(writtenDisplay);

    }
    var buttonText = aText("Andere Zahl?",1,2,0,view.bounds.height-view.center.y-95);
    buttonText.position.x = view.center.x;
    generalGroup.addChild(buttonText);
    
    var button = new Path.Rectangle({
        rectangle:new Rectangle(
            new Point(view.center.x-100,view.bounds.height-150),
            new Point(view.center.x+100,view.bounds.height-50)),
            radius:10,
            strokeColor:"black",
            strokeWidth:1.5,
            onMouseEnter:function(event){
                this.fillColor = new Color(0.6,0.6,0.6,0.2);
            },
            onMouseLeave:function(event){
                this.fillColor = new Color(1,1,1,0);
            },
            onClick:function(event){
                generalGroup.remove();
                doHorner();
            }
    });
    generalGroup.addChild(button);
};
doHorner();
