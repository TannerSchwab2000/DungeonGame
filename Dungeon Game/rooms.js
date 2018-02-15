
function room(x,y){
    this.pos = createVector(x,y);
    this.tiles = [];
}

function tile(s,x,y,parent,t){
    this.pos = createVector(x+parent.pos.x,y+parent.pos.y);
    this.sprite = new img(s,this.pos.x,this.pos.y,1,1,images.length,0);
    this.t = t;
    this.relativeX = x;
    this.relativeY = y;
    images.push(this.sprite);

    this.render = function(){
        var distance = round(abs(this.pos.x-player.pos.x)+abs(this.pos.y-player.pos.y));
        if(moveSelected==true){
            if(distance <= energy/2 && this.t == "floor"){
                this.sprite.red = false;
                this.sprite.green = true;    
            }else{
                this.sprite.red = false;
                this.sprite.green = false;   
            }    
        }else if(attackSelected==true){
            if(distance <= 1 && this.t == "floor"){
                this.sprite.red = true;
                this.sprite.green = false;    
            }else{
                this.sprite.red = false;
                this.sprite.green = false;   
            }
        }else{
            this.sprite.red = false;
            this.sprite.green = false;  
        }
        
        
        this.sprite.x = this.pos.x - player.pos.x+11;
        this.sprite.y = this.pos.y - player.pos.y+5;
        this.sprite.render();
        //this.sprite.x = this.pos.x;
        //this.sprite.y = this.pos.y;

    }


}