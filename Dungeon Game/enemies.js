var done;


function creature(s,x,y,h,e){
    this.pos = createVector(x,y);
    this.sprite = new img(s,this.pos.x,this.pos.y,1,1,images.length,1);
    this.maxEnergy = e;
    this.health = h;
    this.energy = e;
    this.pathClear;
    this.inventory = [];
    this.equipped;
    this.itemSprite1;
    images.push(this.sprite);

    var rand = round(random(1,2));
    if(rand == 1){
        var dagger = new item("weapon",1);
        this.inventory.push(dagger);
        this.equipped = dagger;
        this.itemSprite1 = new img("assets/goblinDagger.png",this.pos.x,this.pos.y,1,1,images.length,2);
        images.push(this.itemSprite1);
    }


    this.render = function(){
    	if(this.health < 1){
            if(this.itemSprite1 != null){
                var drop = new mapItem("assets/daggerDrop.png",this.pos.x,this.pos.y);
                this.itemSprite1.x = -99999;
                this.itemSprite1.render();
                images.splice(this.itemSprite1.n,1);
                this.itemSprite1 = null;
            }
    		this.pos = createVector(-99999,-99999);
            images.splice(this.sprite.n,1);
            
    	}
        if(this.itemSprite1 != null){
            this.itemSprite1.x = this.pos.x - player.pos.x+11;
            this.itemSprite1.y = this.pos.y - player.pos.y+5;
            this.itemSprite1.render();
        }
        this.sprite.x = this.pos.x - player.pos.x+11;
        this.sprite.y = this.pos.y - player.pos.y+5;
        this.sprite.render();
        this.checkStep();

        if(this.energy>0){
            var distance = abs(this.pos.x-player.pos.x)+abs(this.pos.y-player.pos.y);
            if(distance<2){
                if(this.equipped == null){
                    health--;    
                }else{
                    if(this.equipped.id == 1){
                        health-=2;
                    }
                } 
            }else{
                    var up = false;
                    var down = false;
                    var left = false;
                    var right = false;
                    if(player.pos.y>this.pos.y){
                        down = true;
                    }if(player.pos.y<this.pos.y){
                        up = true;
                    }if(player.pos.x>this.pos.x){
                        right = true;
                    }if(player.pos.x<this.pos.x){
                        left = true;
                    }    

                    var done = false;
                    var choices = [];

                    if(up==true && done==false && wallIsPresentAt(this.pos.x,this.pos.y-1)==false){
                        choices.push(1);   
                    } 
                    if(right==true && done==false && wallIsPresentAt(this.pos.x+1,this.pos.y)==false){
                        choices.push(2);   
                    }
                    if(down==true && done==false && wallIsPresentAt(this.pos.x,this.pos.y+1)==false){
                        choices.push(3);   
                    }
                    if(left==true && done==false && wallIsPresentAt(this.pos.x-1,this.pos.y)==false){
                        choices.push(4);  
                    }

                    var rand = round(random(0,choices.length-1));
                    var choice = choices[rand];

                    if(choice == 1){
                        this.pos.y--;
                        done = true;    
                    } 
                    if(choice == 2){
                        this.pos.x++;
                        done = true;   
                    }
                    if(choice == 3){
                        this.pos.y++;
                        done = true;   
                    }
                    if(choice == 4){
                        this.pos.x--;
                        done = true;  
                    }

                    choices = [];


                    if(done==false && (up == true || right == true || down == true || left == true)){
                        for(var i=0;i<3;i++){
                            var rand = round(random(1,4));
                            if(rand == 1 && wallIsPresentAt(this.pos.x,this.pos.y-1) == false){
                                this.pos.y--;
                                done = true;
                            }
                            if(rand == 2 && wallIsPresentAt(this.pos.x+1,this.pos.y) == false){
                                this.pos.x++;
                                done = true;
                            }
                            if(rand == 3 && wallIsPresentAt(this.pos.x,this.pos.y+1) == false){
                                this.pos.y++;
                                done = true;
                            }
                            if(rand == 4 && wallIsPresentAt(this.pos.x-1,this.pos.y) == false){
                                this.pos.x--;
                                done = true;
                            }    
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
