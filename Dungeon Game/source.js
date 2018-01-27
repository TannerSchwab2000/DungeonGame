var images = [];
var rooms = [];
var player;
var lastTick = Date.now();
var updateRate = 0.1;
var move = false;
var health = 0;
var energy = 10;
var moveButton;
var attackButton;
var endTurnButton;
var energyBackground;
var energyBar;
var energyText;
var healthBackground;
var healthBar;
var healthText;
var background;
var moveSelected = false;

function setup() {
    var room1 = new room(0,0)
    rooms.push(room1);
    for(var a=0;a<10;a++){
        room1.tiles.push(new tile("assets/stone_wall.png",a,0,room1,'wall'));
        room1.tiles.push(new tile("assets/stone_wall.png",a,9,room1,'wall'));       
        room1.tiles.push(new tile("assets/stone_wall.png",0,a,room1,'wall')); 
        if(a==5){
            room1.tiles.push(new tile("assets/door.png",9,a,room1,'door'));
        }else{
            room1.tiles.push(new tile("assets/stone_wall.png",9,a,room1,'wall'));
        }
        
    }
    for(var a=0;a<8;a++){
        for(var b=0;b<8;b++){
            room1.tiles.push(new tile("assets/stone_floor.png",1+a,1+b,room1,'floor'));    
        }  
    }

    player = new player();
        
    background = new img("assets/background.png",0,0,windowWidth,windowHeight,images.length,-1);
    images.push(background);
    moveButton = new img("assets/move_button.png",1,10,1.75,0.75,images.length,1);
    images.push(moveButton);
    attackButton = new img("assets/attack_button.png",1,11,1.75,0.75,images.length,1);
    images.push(attackButton);  
    endTurnButton = new img("assets/end_turn_button.png",1,12,1.75,0.75,images.length,1);
    images.push(endTurnButton);
    energyBackground = new img("assets/energy_background.png",3,11,1.75,0.75,images.length,1);
    images.push(energyBackground);
    energyBar = new img("assets/energy.png",3,11,1.75,0.75,images.length,1);
    images.push(energyBar);
    energyText = new img("assets/energy_text.png",3,11,1.75,0.75,images.length,1);
    images.push(energyText);
    healthBackground = new img("assets/health_background.png",3,10,1.75,0.75,images.length,1);
    images.push(healthBackground);
    healthBar = new img("assets/health.png",3,10,1.75,0.75,images.length,1);
    images.push(healthBar);
    healthText = new img("assets/health_text.png",3,10,1.75,0.75,images.length,1);
    images.push(healthText);
}

function draw() {
    healthBar.img.width = 17.5*health;
    energyBar.img.width = 17.5*energy;
    player.render();
    if(Date.now()-lastTick>updateRate*1000){
        lastTick = Date.now();
        for(var a=0;a<rooms.length;a++){
            for(var b=0;b<rooms[a].tiles.length;b++){
                var distance = abs(rooms[a].tiles[b].pos.x - player.pos.x)+abs(rooms[a].tiles[b].pos.y - player.pos.y);
                if(distance<20){
                    rooms[a].tiles[b].render()
                }
                
            }
        }    

    }
    
}

function mouseClicked(){
    var done = false;
    for(var a=0;a<rooms.length;a++){
        for(var b=0;b<rooms[a].tiles.length;b++){
            if(mouseIsContainedIn(rooms[a].tiles[b].pos.x*100,rooms[a].tiles[b].pos.y*100,rooms[a].tiles[b].pos.x*100+100,rooms[a].tiles[b].pos.y*100+100)){
                console.log(player.pos,rooms[a].tiles[b].pos);
                if(done==false){
                    var distance = round(abs(rooms[a].tiles[b].pos.x - player.pos.x)+abs(rooms[a].tiles[b].pos.y - player.pos.y));
                    console.log(distance);
                    if(distance<=5 && energy>=distance*2 && moveSelected == true && rooms[a].tiles[b].t != 'wall'){
                        player.pos = rooms[a].tiles[b].pos;  
                        done = true;     
                        energy = energy - distance*2; 
                        if(rooms[a].tiles[b].t == 'door'){
                            if(rooms[a].tiles[b].relativeX == 9){
                                rand = round(random(1,2));
                                if(rand == 1){
                                    rooms[a].tiles[b].sprite.img.width = 0;
                                    rooms[a].tiles.splice(b,1);
                                    rooms.push(new room(rooms[a].pos.x+9,rooms[a].pos.y));
                                    for(var c=0;c<10;c++){
                                        rooms[a+1].tiles.push(new tile("assets/stone_wall.png",c,0,rooms[a+1],'wall'));
                                        rooms[a+1].tiles.push(new tile("assets/stone_wall.png",c,9,rooms[a+1],'wall'));       
                                        if(c==5){
                                            rooms[a+1].tiles.push(new tile("assets/door.png",9,c,rooms[a+1],'door'));
                                            rooms[a+1].tiles.push(new tile("assets/stone_floor.png",0,c,rooms[a+1],'floor')); 
                                        }else{
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",9,c,rooms[a+1],'wall'));
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",0,c,rooms[a+1],'wall')); 
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            rooms[a+1].tiles.push(new tile("assets/stone_floor.png",1+c,1+d,rooms[a+1],'floor'));    
                                        }  
                                    }    
                                }else if(rand == 2){
                                    rooms[a].tiles[b].sprite.img.width = 0;
                                    rooms[a].tiles.splice(b,1);
                                    rooms.push(new room(rooms[a].pos.x+9,rooms[a].pos.y));
                                    for(var c=0;c<10;c++){
                                        rooms[a+1].tiles.push(new tile("assets/stone_wall.png",c,0,rooms[a+1],'wall'));
                                        rooms[a+1].tiles.push(new tile("assets/stone_wall.png",c,9,rooms[a+1],'wall'));       
                                        if(c==5){
                                            rooms[a+1].tiles.push(new tile("assets/door.png",9,c,rooms[a+1],'door'));
                                            rooms[a+1].tiles.push(new tile("assets/stone_floor.png",0,c,rooms[a+1],'floor')); 
                                        }else{
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",9,c,rooms[a+1],'wall'));
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",0,c,rooms[a+1],'wall')); 
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            if((1+c == 1 && 1+d == 3)||(1+c == 3 && 1+d == 3)||(1+c == 3 && 1+d == 2)||(1+c == 3 && 1+d == 1)||(1+c == 4 && 1+d == 3)||(1+c == 6 && 1+d == 3)||(1+c == 6 && 1+d == 2)||(1+c == 6 && 1+d == 1)||(1+c == 7 && 1+d == 3)||(1+c == 1 && 1+d == 6)||(1+c == 3 && 1+d == 6)||(1+c == 3 && 1+d == 7)||(1+c == 3 && 1+d == 8)||(1+c == 4 && 1+d == 6)||(1+c == 6 && 1+d == 6)||(1+c == 6 && 1+d == 7)||(1+c == 6 && 1+d == 8)||(1+c == 7 && 1+d == 6)){
                                                rooms[a+1].tiles.push(new tile("assets/stone_wall.png",1+c,1+d,rooms[a+1],'wall'));
                                            }else if((1+c == 2 && 1+d == 3)||(1+c == 5 && 1+d == 3)||(1+c == 8 && 1+d == 3)||(1+c == 2 && 1+d == 6)||(1+c == 5 && 1+d == 6)||(1+c == 8 && 1+d == 6)){
                                                rooms[a+1].tiles.push(new tile("assets/door.png",1+c,1+d,rooms[a+1],'door'));
                                            }else{
                                                rooms[a+1].tiles.push(new tile("assets/stone_floor.png",1+c,1+d,rooms[a+1],'floor'));        
                                            }
                                            
                                        }  
                                    } 
                                }
                            }else{
                                rooms[a].tiles[b].sprite.img.realSrc = 'assets/stone_floor.png';
                                rooms[a].tiles[b].t = "floor";
                            }
                            
                            
                        }
                    } 
                } 
            }    
        }
    }
    console.log(endTurnButton.x*100,endTurnButton.y*100,endTurnButton.x*100+175,endTurnButton.y*100+75,mouseX,mouseY);
    if(mouseIsContainedInGui(endTurnButton.x*100,endTurnButton.y*100,endTurnButton.x*100+175,endTurnButton.y*100+75)){
        energy = 10;
        moveSelected = false;
    }
    if(mouseIsContainedInGui(moveButton.x*100,moveButton.y*100,moveButton.x*100+175,moveButton.y*100+75)){
        moveSelected = true;
    }
}

function mouseIsContainedIn(x1,y1,x2,y2){
    if(mouseX >= x1-(player.pos.x-11)*100 && mouseX<= x2-(player.pos.x-11)*100 && mouseY >= y1-(player.pos.y-5)*100 && mouseY <= y2-(player.pos.y-5)*100){
        return true;
    }else{
        return false;
    }
}

function mouseIsContainedInGui(x1,y1,x2,y2){
    if(mouseX >= x1 && mouseX<= x2 && mouseY >= y1 && mouseY <= y2){
        return true;
    }else{
        return false;
    }
}

