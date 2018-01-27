
function player(){
    this.pos = createVector(4,4);
    this.sprite = new img("assets/player.png",11,5,1,1,images.length,1);
    images.push(this.sprite);

    this.render = function(){
    }
}
