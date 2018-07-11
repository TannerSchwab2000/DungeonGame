
function player(){
    this.pos = createVector(4,4);
    this.sprite = new img("assets/player.png",11,5,1,1,images.length,1);
    images.push(this.sprite);

    this.render = function(){
    	if(equippedItem != null){
	    	if(equippedItem.id == 1){
	           itemSprite1.img.visibility = "visible";
               itemSprite1.img.realSrc = "assets/playerDagger.png";      
		       itemSprite1.render();
	    	}	
    	}
    }
}
