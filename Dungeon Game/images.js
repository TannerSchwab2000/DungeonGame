
function img(s,x,y,w,h,n,z){
    this.x = x;
    this.y = y;
    this.n = n;
    this.img = document.createElement("IMG");
    this.img.realSrc = s;
    this.img.src = s;
    this.img.width = 100*w;
    this.img.height = 100*h;
    this.img.draggable = false;
    this.green = false;
    this.red = false;
    document.body.appendChild(this.img);

    this.pos = document.createElement('style');
    this.pos.type = 'text/css';
    this.pos.innerHTML = '.cssClass' + n + '{  user-select: none; position: absolute; left: ' + this.x*100 +';' + "top: " + this.y*100 + ';' + 'z-index: '+ z +'}';
    document.getElementsByTagName('head')[0].appendChild(this.pos);

    this.img.className = "cssClass" + n;

    this.render = function(){
        if(this.green == true){  
            this.img.src = "assets/stone_floor_green.png";
        }else if(this.red == true){  
            this.img.src = "assets/stone_floor_red.png";
        }else{
            this.img.src = this.img.realSrc;     
        }
        this.pos.innerHTML = '.cssClass' + n + '{  user-select: none; position: absolute; left: ' + this.x*100 +';' + "top: " + this.y*100 + ';' + 'z-index: '+ z +'}'; 
        document.getElementsByTagName('head')[0].appendChild(this.pos);
    }
}
