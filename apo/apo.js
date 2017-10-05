var CRACKS_URL = "https://raw.githubusercontent.com/0-zM/paperbox/master/apo/cracks.png";

for (var i = 0;i < view.size.width/16;i++){
    for (var j = 0; j < view.size.height/16; j++){
        var cracks = new Raster(CRACKS_URL,[i*16+8,j*16+8]);
        cracks.rotation = Math.floor(Math.random()*4)*90;
        cracks.scaling = [1,Math.floor(Math.random()*2)*2-1];
    }
}
