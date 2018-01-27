
function room(x,y){
    this.pos = createVector(x,y);
    this.tiles = [];
}

function tile(s,x,y,parent,t){
    this.pos = createVector(x+parent.pos.x,y+parent.pos.y);
    this.sprite = new img(s,this.pos.x,this.pos.y,1,1,images.length,0);
    this.t = t;
    images.push(this.sprite);

    this.render = function(){
        var distance = round(abs(this.pos.x-player.pos.x)+abs(this.pos.y-player.pos.y));
        if(distance <= energy/2 && moveSelected && this.t == "floor"){
            this.sprite.green = true;
        }else{
            this.sprite.green = false;
        }
        this.sprite.x = this.pos.x - player.pos.x+11;
        this.sprite.y = this.pos.y - player.pos.y+5;
        this.sprite.render();
        //this.sprite.x = this.pos.x;
        //this.sprite.y = this.pos.y;

    }


}