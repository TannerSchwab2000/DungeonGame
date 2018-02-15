
function creature(s,x,y,h,e){
    this.pos = createVector(x,y);
    this.sprite = new img(s,this.pos.x,this.pos.y,1,1,images.length,1);
    this.maxEnergy = e;
    this.health = h;
    this.energy = e;
    this.pathClear;
    images.push(this.sprite);


    this.render = function(){
    	if(this.health < 1){
    		this.pos = createVector(-99999,-99999);
    		this.sprite.realSrc = '';
    	}
        this.sprite.x = this.pos.x - player.pos.x+11;
        this.sprite.y = this.pos.y - player.pos.y+5;
        this.sprite.render();
        this.checkStep();

        if(this.energy>0){
            var distance = abs(this.pos.x-player.pos.x)+abs(this.pos.y-player.pos.y);
            if(distance<2){
                health--;
                console.log(health);
            }else{
                if(this.pathClear){
                    if(player.pos.y>this.pos.y){
                        this.pos.y++;
                    }else if(player.pos.y<this.pos.y){
                        this.pos.y--;
                    }else if(player.pos.x>this.pos.x){
                        this.pos.x++;
                    }else if(player.pos.x<this.pos.x){
                        this.pos.x--;
                    }    
                }
                
            }
	        	
        }
        this.energy--;
        
    }

    this.checkStep = function(){
        if(player.pos.y>this.pos.y){
            if(wallIsPresentAt(this.pos.x,this.pos.y+1)==false){
                this.pathClear = true;
            }else{
                this.pathClear = false;
            }
        }else if(player.pos.y<this.pos.y){
            if(wallIsPresentAt(this.pos.x,this.pos.y-1)==false){
                this.pathClear = true;
            }else{
                this.pathClear = false;
            }
        }else if(player.pos.x>this.pos.x){
            if(wallIsPresentAt(this.pos.x+1,this.pos.y)==false){
                this.pathClear = true;
            }else{
                this.pathClear = false;
            }
        }else if(player.pos.x<this.pos.x){
            if(wallIsPresentAt(this.pos.x-1,this.pos.y)==false){
                this.pathClear = true;
            }else{
                this.pathClear = false;
            }
        }
    }


}