var done;


function creature(s,x,y,h,e){
    this.pos = createVector(x,y);
    this.healthBar = new img('assets/creature_health.png',this.pos.x,this.pos.y,1,1,images.length,1);
    this.sprite = new img(s,this.pos.x,this.pos.y,1,1,images.length,1);
    this.maxEnergy = e;
    this.health = h;
    this.energy = e;
    this.pathClear;
    this.inventory = [];
    this.equipped;
    this.itemSprite1;
    this.itemSprite2;
    this.head;
    images.push(this.sprite);

    if(s == 'assets/goblin.png'){
        var rand = round(random(1,2));
        if(rand == 1){
            var dagger = new item("weapon",1);
            this.inventory.push(dagger);
            this.equipped = dagger;
            this.itemSprite1 = new img("assets/goblin_dagger.png",this.pos.x,this.pos.y,1,1,images.length,2);
            images.push(this.itemSprite1);
        }

        var rand = round(random(1,2));
        if(rand == 1){
            var helm = new item("helmet",2);
            this.inventory.push(helm);
            this.head = helm;
            this.itemSprite2 = new img("assets/goblin_leather_hat.png",this.pos.x,this.pos.y,1,1,images.length,2);
            images.push(this.itemSprite2);
        }    
    }
    


    this.render = function(){
        this.healthBar.x = this.pos.x;
        this.healthBar.y = this.pos.y;
        this.healthBar.img.width = 100/h *this.health;
        this.healthBar.render();

    	if(this.health < 1){
            if(this.itemSprite1 != null){
                var drop = new mapItem("assets/dagger_drop.png",this.pos.x,this.pos.y,'weapon');
                this.itemSprite1.x = -99999;
                this.itemSprite1.render();
                this.itemSprite1 = null;
            }
            if(this.itemSprite2 != null){
                var drop = new mapItem("assets/leather_hat_drop.png",this.pos.x,this.pos.y,'helmet');
                this.itemSprite2.x = -99999;
                this.itemSprite2.render();
                this.itemSprite2 = null;
            }
    		this.pos = createVector(-99999,-99999);
            
    	}
        if(this.itemSprite1 != null){
            this.itemSprite1.x = this.pos.x - player.pos.x+11;
            this.itemSprite1.y = this.pos.y - player.pos.y+5;
            this.itemSprite1.render();
        }
        if(this.itemSprite2 != null){
            this.itemSprite2.x = this.pos.x - player.pos.x+11;
            this.itemSprite2.y = this.pos.y - player.pos.y+5;
            this.itemSprite2.render();
        }
        this.sprite.x = this.pos.x - player.pos.x+11;
        this.sprite.y = this.pos.y - player.pos.y+5;
        this.sprite.render();
        this.checkStep();

        if(this.energy>0){
            var distance = abs(this.pos.x-player.pos.x)+abs(this.pos.y-player.pos.y);
            if(distance<2){
                if(this.equipped == null){
                    if(armor>0){
                        armor--;  
                    }else{
                        health--; 
                    }   
                }else{
                    if(this.equipped.id == 1){
                        if(armor>0){
                            armor-=2;  
                        }else{
                            health-=2; 
                        } 
                    }
                } 
                this.energy--;
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

                    if(up==true && done==false && wallIsPresentAt(this.pos.x,this.pos.y-1)==false && creatureIsPresentAt(this.pos.x,this.pos.y-1)==false){
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
                        this.energy--;
                    } 
                    if(choice == 2){
                        this.pos.x++;
                        done = true;   
                        this.energy--;
                    }
                    if(choice == 3){
                        this.pos.y++;
                        done = true;   
                        this.energy--;
                    }
                    if(choice == 4){
                        this.pos.x--;
                        done = true;  
                        this.energy--;
                    }

                    choices = [];


                    if(done==false && (up == true || right == true || down == true || left == true)){
                        for(var i=0;i<this.energy;i++){
                            var rand = round(random(1,4));
                            if(rand == 1 && wallIsPresentAt(this.pos.x,this.pos.y-1) == false){
                                this.pos.y--;
                                done = true;
                                this.energy--;
                            }
                            if(rand == 2 && wallIsPresentAt(this.pos.x+1,this.pos.y) == false){
                                this.pos.x++;
                                done = true;
                                this.energy--;
                            }
                            if(rand == 3 && wallIsPresentAt(this.pos.x,this.pos.y+1) == false){
                                this.pos.y++;
                                done = true;
                                this.energy--;
                            }
                            if(rand == 4 && wallIsPresentAt(this.pos.x-1,this.pos.y) == false){
                                this.pos.x--;
                                done = true;
                                this.energy--;
                            }    
                        }
                    }
            }
	        	
        }
        
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
