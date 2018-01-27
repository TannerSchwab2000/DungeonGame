
function room(x,y){
    this.pos = createVector(x,y);
    this.tiles = [];
}

function tile(s,x,y,parent){
    this.pos = createVector(x+parent.pos.x,y+parent.pos.y);
    this.sprite = new img(s,this.pos.x,this.pos.y,1,1,images.length,0);
    images.push(this.sprite);

    this.render = function(){
        this.sprite.x = this.pos.x - player.pos.x+11;
        this.sprite.y = this.pos.y - player.pos.y+5;
        this.sprite.render();
        //this.sprite.x = this.pos.x;
        //this.sprite.y = this.pos.y;
        
    }


}