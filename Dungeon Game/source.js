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

function setup() {
    var room1 = new room(0,0)
    rooms.push(room1);
    for(var a=0;a<10;a++){
        room1.tiles.push(new tile("assets/stone_wall.png",a,0,room1));
        room1.tiles.push(new tile("assets/stone_wall.png",a,9,room1));       
        room1.tiles.push(new tile("assets/stone_wall.png",0,a,room1)); 
        if(a==5){
            room1.tiles.push(new tile("assets/door.png",9,a,room1));
        }else{
            room1.tiles.push(new tile("assets/stone_wall.png",9,a,room1));
        }
        
    }
    for(var a=0;a<8;a++){
        for(var b=0;b<8;b++){
            room1.tiles.push(new tile("assets/stone_floor.png",1+a,1+b,room1));    
        }  
    }

    player = new player();
        
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
                rooms[a].tiles[b].render()
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
                    if(distance<=5 && energy>0){
                        player.pos = rooms[a].tiles[b].pos;  
                        done = true;     
                        energy = energy - distance*2; 
                    } 
                } 
            }    
        }
    }
    console.log(endTurnButton.x*100,endTurnButton.y*100,endTurnButton.x*100+175,endTurnButton.y*100+75,mouseX,mouseY);
    if(mouseIsContainedInGui(endTurnButton.x*100,endTurnButton.y*100,endTurnButton.x*100+175,endTurnButton.y*100+75)){
        energy = 10;
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

