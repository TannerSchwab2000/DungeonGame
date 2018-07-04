
function player(){
    this.pos = createVector(4,4);
    this.sprite = new img("assets/player.png",11,5,1,1,images.length,1);
    this.itemSprite1;
    images.push(this.sprite);

    this.render = function(){
    	if(equippedItem != null){
	    	if(equippedItem.id == 1){
		        this.itemSprite1 = new img("assets/playerDagger.png",11,5,1,1,images.length,2);
		        images.push(this.itemSprite1);
		        this.itemSprite1.render();
	    	}	
    	}
    }
}
