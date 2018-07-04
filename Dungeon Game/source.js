var images = [];
var rooms = [];
var creatures = [];
var mapItems = [];
var inventory = [];
var slot1;
var slot2;
var slot3;
var slot4;
var slot5;
var slot6;
var slot7;
var slot8;
var equippedSlot;
var clickOptions = [];
var clickPos;
var clickOption1;
var player;
var lastTick = Date.now();
var updateRate = 0.05;
var move = false;
var health = 10;
var energy = 10;
var moveButton;
var attackButton;
var endTurnButton;
var pickUpButton;
var equipButton;
var energyBackground;
var energyBar;
var energyText;
var healthBackground;
var healthBar;
var healthText;
var inventoryBackground;
var background;
var deathBackground;
var moveSelected = false;
var attackSelected = false;
var controlHeld = false;
var clickOptionsVisible = false;
var selectedItem;
var equippedItem;

function setup() {
    console.log(windowWidth,windowHeight);
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
    goblin = new creature("assets/goblin.png",8,2,3,3);
    creatures.push(goblin);
        
    background = new img("assets/background.png",0,0,windowWidth/100,windowHeight/100,images.length,-1);
    images.push(background);
    moveButton = new img("assets/move_button.png",1,round((windowHeight-300)/100),1.75,0.75,images.length,1);
    images.push(moveButton);
    attackButton = new img("assets/attack_button.png",1,round((windowHeight-200)/100),1.75,0.75,images.length,1);
    images.push(attackButton);  
    endTurnButton = new img("assets/end_turn_button.png",1,round((windowHeight-100)/100),1.75,0.75,images.length,1);
    images.push(endTurnButton);
    energyBackground = new img("assets/energy_background.png",3,round((windowHeight-200)/100),1.75,0.75,images.length,1);
    images.push(energyBackground);
    energyBar = new img("assets/energy.png",3,round((windowHeight-200)/100),1.75,0.75,images.length,1);
    images.push(energyBar);
    energyText = new img("assets/energy_text.png",3,round((windowHeight-200)/100),1.75,0.75,images.length,1);
    images.push(energyText);
    healthBackground = new img("assets/health_background.png",3,round((windowHeight-300)/100),1.75,0.75,images.length,1);
    images.push(healthBackground);
    healthBar = new img("assets/health.png",3,round((windowHeight-300)/100),1.75,0.75,images.length,1);
    images.push(healthBar);
    inventoryBackground = new img("assets/inventory_background.png",5,round((windowHeight-300)/100),3,3,images.length,1);
    images.push(inventoryBackground);
    healthText = new img("assets/health_text.png",3,round((windowHeight-300)/100),1.75,0.75,images.length,1);
    images.push(healthText);
    deathBackground = new img("assets/death_background.png",0,0,windowWidth/100,windowHeight/100,images.length,5);
    deathBackground.img.style.visibility = "hidden";
    images.push(deathBackground);
    pickUpButton = new img("assets/pick_up_button.png",-1,0,1,0.3,images.length,3);
    images.push(pickUpButton);
    equipButton = new img("assets/equip_button.png",-1,0,1,0.3,images.length,3);
    images.push(equipButton);
    slot1 = new img("assets/inventory_block.png",5,round((windowHeight-300)/100),1,1,images.length,1);
    images.push(slot1);
    slot2 = new img("assets/inventory_block.png",6,round((windowHeight-300)/100),1,1,images.length,1);
    images.push(slot1);
    slot3 = new img("assets/inventory_block.png",7,round((windowHeight-300)/100),1,1,images.length,1);
    images.push(slot1);
    slot4 = new img("assets/inventory_block.png",5,round((windowHeight-300)/100)+1,1,1,images.length,1);
    images.push(slot1);
    slot5 = new img("assets/inventory_block.png",7,round((windowHeight-300)/100)+1,1,1,images.length,1);
    images.push(slot1);
    slot6 = new img("assets/inventory_block.png",5,round((windowHeight-300)/100)+2,1,1,images.length,1);
    images.push(slot1);
    slot7 = new img("assets/inventory_block.png",6,round((windowHeight-300)/100)+2,1,1,images.length,1);
    images.push(slot1);
    slot8 = new img("assets/inventory_block.png",7,round((windowHeight-300)/100)+2,1,1,images.length,1);
    images.push(slot1);
    equippedSlot = new img("assets/inventory_block.png",6,round((windowHeight-300)/100)+1,1,1,images.length,1);
    equippedSlot.img.style.visibility = "hidden";
    images.push(slot1);
}

function draw() {
    if(health>0){
        healthBar.img.width = 17.5*health;
        energyBar.img.width = 17.5*energy;
        player.render();
        if(Date.now()-lastTick>updateRate*1000){
            lastTick = Date.now();
            for(var a=0;a<inventory.length;a++){
                if(inventory[a].id == 1){
                    var b = a+1;
                    var c = b.toString();
                    window['slot'+c].img.realSrc = "assets/daggerDrop.png";
                    window['slot'+c].render();
                }
            }
            for(var a=0;a<rooms.length;a++){
                for(var b=0;b<rooms[a].tiles.length;b++){
                    var distance = abs(rooms[a].tiles[b].pos.x - player.pos.x)+abs(rooms[a].tiles[b].pos.y - player.pos.y);
                    if(distance<25){
                        rooms[a].tiles[b].render()
                    }
                    
                }
            }    
            for(var a=0;a<creatures.length;a++){
                    creatures[a].render();
            }
            for(var a=0;a<mapItems.length;a++){
                mapItems[a].render();
            }
        }    
    }else{
        deathBackground.img.style.visibility = "visible";
        deathBackground.render();
    }
    if(clickOptionsVisible==true){
        for(var a=0;a<clickOptions.length;a++){
            if(clickOptions[a].type == "pickUp"){
                pickUpButton.img.style.visibility = "visible";
                pickUpButton.x = clickPos.x;
                pickUpButton.y = clickPos.y;
                pickUpButton.render();
            }else if(clickOptions[a].type == "equip"){
                equipButton.img.style.visibility = "visible";
                equipButton.x = clickPos.x;
                equipButton.y = clickPos.y;
                equipButton.render();
            }
        }
    }else{
        pickUpButton.img.style.visibility = "hidden";
        equipButton.img.style.visibility = "hidden";
    }
    
    
}

function mouseClicked(){
    var done = false;

    if(clickOptionsVisible == true){
        for(var a=0;a<clickOptions.length;a++){
            if(clickOptions[a].type == "pickUp"){
                if(mouseIsContainedInGui(pickUpButton.x*100,pickUpButton.y*100,(pickUpButton.x+1)*100,(pickUpButton.y+0.3)*100)){
                    inventory.push(new item("weapon",1));
                    mapItems[selectedItem].sprite.img.style.visibility = 'hidden';
                    mapItems[selectedItem].sprite.render();
                    mapItems.splice(selectedItem,1);
                }
            }else if(clickOptions[a].type == "equip"){
                if(mouseIsContainedInGui(equipButton.x*100,equipButton.y*100,(equipButton.x+1)*100,(equipButton.y+0.3)*100)){
                    equippedItem = inventory[selectedItem];
                    inventory.splice(selectedItem,1);
                    var b = selectedItem+1;
                    var c = b.toString();
                    window['slot'+c].img.style.visibility = 'hidden';
                    window['slot'+c].render();
                    equippedSlot.img.style.visibility = "visible";
                    equippedSlot.img.realSrc = "assets/daggerDrop.png";
                    equippedSlot.render();

                }
            }
        }
    }

    clickOptionsVisible = false;
    clickOptions.splice(0,clickOptions.length);

    for(var a=0;a<7;a++){
        var b = a+1;
        var c = b.toString();  
        if(mouseIsContainedInGui(window['slot'+c].x*100,window['slot'+c].y*100,window['slot'+c].x*100+100,window['slot'+c].y*100+100)){
            if(controlHeld == true){
                clickOptions.push(new clickOption("equip"));
                clickOptionsVisible = true;
                clickPos = createVector(window['slot'+c].x,window['slot'+c].y); 
                selectedItem = a;
            }
        }
    }
    for(var a=0;a<mapItems.length;a++){
        if(mouseIsContainedIn(mapItems[a].x*100,mapItems[a].y*100,mapItems[a].x*100+100,mapItems[a].y*100+100)){
            if(controlHeld == true){
                clickOptions.push(new clickOption("pickUp"));
                clickOptionsVisible = true;
                clickPos = createVector(mapItems[a].x - player.pos.x+11,mapItems[a].y - player.pos.y+5); 
                selectedItem = a;
                mapItems[a].sprite.render(); 
            } 
        }
    }
    for(var a=0;a<rooms.length;a++){
        for(var b=0;b<rooms[a].tiles.length;b++){
            if(mouseIsContainedIn(rooms[a].tiles[b].pos.x*100,rooms[a].tiles[b].pos.y*100,rooms[a].tiles[b].pos.x*100+100,rooms[a].tiles[b].pos.y*100+100)){
                if(done==false&&controlHeld==false){
                    var distance = round(abs(rooms[a].tiles[b].pos.x - player.pos.x)+abs(rooms[a].tiles[b].pos.y - player.pos.y));
                    if(distance<=5 && energy>=distance*2 && moveSelected == true && rooms[a].tiles[b].t != 'wall'){
                        player.pos = rooms[a].tiles[b].pos;  
                        done = true;     
                        energy = energy - distance*2; 
                        if(rooms[a].tiles[b].t == 'door'){
                            if(rooms[a].tiles[b].relativeX == 9 && roomIsPresentAt(rooms[a].pos.x+9,rooms[a].pos.y) == false ){//Right
                                rand = round(random(1,2));
                                if(rand == 1){
                                    goblin2 = new creature("assets/goblin.png",rooms[a].pos.x+14,rooms[a].pos.y+5,3,3);
                                    creatures.push(goblin2); 
                                }
                                

                                rand = round(random(1,5));//1,5
                                if(rand == 1){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x+9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall'));    
                                        if(c==5){
                                            newRoom.tiles.push(new tile("assets/door.png",9,c,newRoom,'door'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",0,c,newRoom,'floor')); 
                                            newRoom.tiles.push(new tile("assets/door.png",c,9,newRoom,'door'));   
                                        }else{
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall')); 
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall'));   
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,1+d,newRoom,'floor'));    
                                        }  
                                    }    
                                }else if(rand == 2){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x+9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall'));
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall'));       
                                        if(c==5){
                                            newRoom.tiles.push(new tile("assets/door.png",9,c,newRoom,'door'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",0,c,newRoom,'floor')); 
                                        }else{
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall')); 
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            if((1+c == 1 && 1+d == 3)||(1+c == 3 && 1+d == 3)||(1+c == 3 && 1+d == 2)||(1+c == 3 && 1+d == 1)||(1+c == 4 && 1+d == 3)||(1+c == 6 && 1+d == 3)||(1+c == 6 && 1+d == 2)||(1+c == 6 && 1+d == 1)||(1+c == 7 && 1+d == 3)||(1+c == 1 && 1+d == 6)||(1+c == 3 && 1+d == 6)||(1+c == 3 && 1+d == 7)||(1+c == 3 && 1+d == 8)||(1+c == 4 && 1+d == 6)||(1+c == 6 && 1+d == 6)||(1+c == 6 && 1+d == 7)||(1+c == 6 && 1+d == 8)||(1+c == 7 && 1+d == 6)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",1+c,1+d,newRoom,'wall'));
                                            }else if((1+c == 2 && 1+d == 3)||(1+c == 5 && 1+d == 3)||(1+c == 8 && 1+d == 3)||(1+c == 2 && 1+d == 6)||(1+c == 5 && 1+d == 6)||(1+c == 8 && 1+d == 6)){
                                                newRoom.tiles.push(new tile("assets/door.png",1+c,1+d,newRoom,'door'));
                                            }else{
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,1+d,newRoom,'floor'));        
                                            }
                                            
                                        }  
                                    } 
                                }else if(rand == 3){
                                    rooms[a].tiles[b].sprite.x = -9999;

                                    var newRoom = new room(rooms[a].pos.x+9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){    
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,3,newRoom,'wall'));
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,6,newRoom,'wall'));   
                                        if(c==3||c==4||c==6){
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall')); 
                                        }else if(c==5){
                                            newRoom.tiles.push(new tile("assets/door.png",9,c,newRoom,'door'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",0,c,newRoom,'floor')); 
                                        }else{
                                        
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<2;d++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,4+d,newRoom,'floor')); 
                                            
                                        }  
                                    } 
                                }else if(rand == 4){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x+9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        for(var d=0;d<10;d++){
                                            if((c==1&&d==3)||(c==2&&d==3)||(c==3&&d==3)||(c==4&&d==3)||(c==5&&d==3)||(c==6&&d==3)||(c==1&&d==6)||(c==2&&d==6)||(c==3&&d==6)||(c==6&&d==3)||(c==6&&d==4)||(c==6&&d==5)||(c==6&&d==6)||(c==6&&d==7)||(c==6&&d==8)||(c==6&&d==9)||(c==3&&d==7)||(c==3&&d==8)||(c==3&&d==9)||(c==4&&d==9)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",c,d,newRoom,'wall'));
                                            }else if(c==0&&d==5){
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",c,d,newRoom,'floor'));
                                            }else if(c==5&&d==9){
                                                newRoom.tiles.push(new tile("assets/door.png",c,d,newRoom,'door'));
                                            }
                                             
                                            
                                        }  
                                    } 
                                    for(var a=0;a<5;a++){
                                        for(var b=0;b<2;b++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",a+1,b+4,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",b+4,a+4,newRoom,'floor'));
                                        }
                                    }
                                }else if(rand == 5){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x+9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        for(var d=0;d<10;d++){
                                            if((c==1&&d==3)||(c==2&&d==3)||(c==3&&d==3)||(c==6&&d==3)||(c==1&&d==6)||(c==2&&d==6)||(c==3&&d==6)||(c==4&&d==6)||(c==5&&d==6)||(c==6&&d==6)||(c==6&&d==4)||(c==6&&d==3)||(c==6&&d==2)||(c==6&&d==1)||(c==6&&d==0)||(c==3&&d==3)||(c==3&&d==2)||(c==6&&d==5)||(c==3&&d==1)||(c==3&&d==0)||(c==4&&d==0)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",c,d,newRoom,'wall'));
                                            }else if(c==0&&d==5){
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",c,d,newRoom,'floor'));
                                            }else if(c==5&&d==0){
                                                newRoom.tiles.push(new tile("assets/door.png",c,d,newRoom,'door'));
                                            }
                                             
                                            
                                        }  
                                    } 
                                    for(var a=0;a<5;a++){
                                        for(var b=0;b<2;b++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",a+1,b+4,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",b+4,a+1,newRoom,'floor'));
                                        }
                                    }
                                }

                            }else if(rooms[a].tiles[b].relativeY == 9 && roomIsPresentAt(rooms[a].pos.x,rooms[a].pos.y+9) == false ){ //Down
                                rand = round(random(1,5));//1,5
                                if(rand == 1){ //Opening
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y+9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){    
                                        if(c==5){
                                            newRoom.tiles.push(new tile("assets/door.png",9,c,newRoom,'door'));
                                            newRoom.tiles.push(new tile("assets/door.png",0,c,newRoom,'door')); 
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",c,0,newRoom,'floor')); 
                                            newRoom.tiles.push(new tile("assets/door.png",c,9,newRoom,'door'));   
                                        }else{
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall')); 
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall'));  
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall')); 
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,1+d,newRoom,'floor'));    
                                        }  
                                    }    
                                }else if(rand == 2){//Bedroom
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y+9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){ 
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall'));  
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));  
                                        if(c==5){
                                            newRoom.tiles.push(new tile("assets/door.png",c,9,newRoom,'door'));  
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",c,0,newRoom,'floor'))
                                        }else{
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall'))
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall'));  
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            if((1+c == 3 && 1+d == 1)||(1+c == 6 && 1+d == 1)||(1+c == 3 && 1+d == 3)||(1+c == 2 && 1+d == 3)||(1+c == 1 && 1+d == 3)||(1+c == 6 && 1+d == 3)||(1+c == 7 && 1+d == 3)||(1+c == 8 && 1+d == 3)||(1+c == 3 && 1+d == 4)||(1+c == 6 && 1+d == 4)||(1+c == 3 && 1+d == 6)||(1+c == 2 && 1+d == 6)||(1+c == 1 && 1+d == 6)||(1+c == 6 && 1+d == 6)||(1+c == 7 && 1+d == 6)||(1+c == 8 && 1+d == 6)||(1+c == 3 && 1+d == 7)||(1+c == 6 && 1+d == 7)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",1+c,1+d,newRoom,'wall'));
                                            }else if((1+c == 3 && 1+d == 2)||(1+c == 6 && 1+d == 2)||(1+c == 3 && 1+d == 5)||(1+c == 6 && 1+d == 5)||(1+c == 3 && 1+d == 8)||(1+c == 6 && 1+d == 8)){
                                                newRoom.tiles.push(new tile("assets/door.png",1+c,1+d,newRoom,'door'));
                                            }else{
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,1+d,newRoom,'floor'));        
                                            }
                                            
                                        }  
                                    } 
                                }else if(rand == 3){//Hallway
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y+9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){    
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",3,c,newRoom,'wall'));
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",6,c,newRoom,'wall'));   
                                        if(c==3||c==4||c==6){
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall'));
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall')); 
                                        }else if(c==5){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",c,0,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/door.png",c,9,newRoom,'door')); 
                                        }else{
                                        
                                        }
                                        
                                    }
                                    for(var c=0;c<2;c++){
                                        for(var d=0;d<8;d++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",4+c,1+d,newRoom,'floor')); 
                                            
                                        }  
                                    } 
                                }else if(rand == 4){//Left Turn 
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y+9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        for(var d=0;d<10;d++){
                                            if((c==3&&d==1)||(c==3&&d==2)||(c==3&&d==3)||(c==6&&d==3)||(c==3&&d==6)||(c==6&&d==3)||(c==6&&d==6)||(c==6&&d==1)||(c==6&&d==2)||(c==3&&d==4)||(c==3&&d==5)||(c==4&&d==6)||(c==5&&d==6)||(c==7&&d==3)||(c==8&&d==3)||(c==9&&d==3)||(c==9&&d==4)||(c==9&&d==6)||(c==8&&d==6)||(c==7&&d==6)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",c,d,newRoom,'wall'));
                                            }else if(c==5&&d==0){
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",c,d,newRoom,'floor'));
                                            }else if(c==9&&d==5){
                                                newRoom.tiles.push(new tile("assets/door.png",c,d,newRoom,'door'));
                                            }
                                             
                                            
                                        }  
                                    } 
                                    for(var a=0;a<5;a++){
                                        for(var b=0;b<2;b++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",b+4,a+1,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",a+4,b+4,newRoom,'floor'));
                                        }
                                    }
                                }else if(rand == 5){//Right Turn
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y+9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        for(var d=0;d<10;d++){
                                            if((c==1&&d==3)||(c==2&&d==3)||(c==3&&d==3)||(c==6&&d==3)||(c==1&&d==6)||(c==2&&d==6)||(c==3&&d==6)||(c==4&&d==6)||(c==5&&d==6)||(c==6&&d==6)||(c==6&&d==4)||(c==6&&d==3)||(c==6&&d==2)||(c==6&&d==1)||(c==6&&d==0)||(c==3&&d==3)||(c==3&&d==2)||(c==6&&d==5)||(c==3&&d==1)||(c==3&&d==0)||(c==4&&d==0)||(c==0&&d==4)||(c==0&&d==3)||(c==0&&d==6)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",c,d,newRoom,'wall'));
                                            }else if(c==0&&d==5){
                                                newRoom.tiles.push(new tile("assets/door.png",c,d,newRoom,'door'));
                                            }else if(c==5&&d==0){
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",c,d,newRoom,'floor'));
                                            }
                                             
                                            
                                        }  
                                    } 
                                    for(var a=0;a<5;a++){
                                        for(var b=0;b<2;b++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",a+1,b+4,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",b+4,a+1,newRoom,'floor'));
                                        }
                                    }
                                }
                            }else if(rooms[a].tiles[b].relativeX == 0 && roomIsPresentAt(rooms[a].pos.x-9,rooms[a].pos.y) == false ){//Left
                                rand = round(random(1,5));//1,5
                                if(rand == 1){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x-9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall'));    
                                        if(c==5){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",9,c,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/door.png",0,c,newRoom,'door')); 
                                            newRoom.tiles.push(new tile("assets/door.png",c,9,newRoom,'door'));   
                                        }else{
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall')); 
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall'));   
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,1+d,newRoom,'floor'));    
                                        }  
                                    }    
                                }else if(rand == 2){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x-9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall'));
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall'));       
                                        if(c==5){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",9,c,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/door.png",0,c,newRoom,'door')); 
                                        }else{
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall')); 
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            if((1+c == 1 && 1+d == 3)||(1+c == 3 && 1+d == 3)||(1+c == 3 && 1+d == 2)||(1+c == 3 && 1+d == 1)||(1+c == 4 && 1+d == 3)||(1+c == 6 && 1+d == 3)||(1+c == 6 && 1+d == 2)||(1+c == 6 && 1+d == 1)||(1+c == 7 && 1+d == 3)||(1+c == 1 && 1+d == 6)||(1+c == 3 && 1+d == 6)||(1+c == 3 && 1+d == 7)||(1+c == 3 && 1+d == 8)||(1+c == 4 && 1+d == 6)||(1+c == 6 && 1+d == 6)||(1+c == 6 && 1+d == 7)||(1+c == 6 && 1+d == 8)||(1+c == 7 && 1+d == 6)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",1+c,1+d,newRoom,'wall'));
                                            }else if((1+c == 2 && 1+d == 3)||(1+c == 5 && 1+d == 3)||(1+c == 8 && 1+d == 3)||(1+c == 2 && 1+d == 6)||(1+c == 5 && 1+d == 6)||(1+c == 8 && 1+d == 6)){
                                                newRoom.tiles.push(new tile("assets/door.png",1+c,1+d,newRoom,'door'));
                                            }else{
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,1+d,newRoom,'floor'));        
                                            }
                                            
                                        }  
                                    } 
                                }else if(rand == 3){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x-9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){    
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,3,newRoom,'wall'));
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",c,6,newRoom,'wall'));   
                                        if(c==3||c==4||c==6){
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall')); 
                                        }else if(c==5){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",9,c,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/door.png",0,c,newRoom,'door')); 
                                        }else{
                                        
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<2;d++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,4+d,newRoom,'floor')); 
                                            
                                        }  
                                    } 
                                }else if(rand == 4){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x-9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        for(var d=0;d<10;d++){
                                            if((c==3&&d==1)||(c==3&&d==2)||(c==3&&d==3)||(c==4&&d==3)||(c==5&&d==3)||(c==6&&d==3)||(c==3&&d==6)||(c==6&&d==3)||(c==6&&d==6)||(c==6&&d==1)||(c==6&&d==2)||(c==3&&d==4)||(c==3&&d==5)||(c==4&&d==6)||(c==5&&d==6)||(c==7&&d==3)||(c==8&&d==3)||(c==9&&d==3)||(c==9&&d==4)||(c==9&&d==6)||(c==8&&d==6)||(c==7&&d==6)||(c==6&&d==0)||(c==4&&d==0)||(c==3&&d==0)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",c,d,newRoom,'wall'));
                                            }else if(c==5&&d==0){
                                                newRoom.tiles.push(new tile("assets/door.png",c,d,newRoom,'door'));
                                            }else if(c==9&&d==5){
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",c,d,newRoom,'floor'));
                                            }
                                             
                                            
                                        }  
                                    } 
                                    for(var a=0;a<5;a++){
                                        for(var b=0;b<2;b++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",b+4,a+1,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",a+4,b+4,newRoom,'floor'));
                                        }
                                    }
                                }else if(rand == 5){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x-9,rooms[a].pos.y);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        for(var d=0;d<10;d++){
                                            if((c==3&&d==3)||(c==4&&d==3)||(c==5&&d==3)||(c==6&&d==3)||(c==3&&d==6)||(c==6&&d==3)||(c==6&&d==6)||(c==3&&d==4)||(c==3&&d==5)||(c==7&&d==3)||(c==8&&d==3)||(c==9&&d==3)||(c==9&&d==4)||(c==9&&d==6)||(c==8&&d==6)||(c==7&&d==6)||(c==3&&d==7)||(c==3&&d==8)||(c==6&&d==7)||(c==6&&d==8)||(c==6&&d==9)||(c==4&&d==9)||(c==3&&d==9)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",c,d,newRoom,'wall'));
                                            }else if(c==5&&d==9){
                                                newRoom.tiles.push(new tile("assets/door.png",c,d,newRoom,'door'));
                                            }else if(c==9&&d==5){
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",c,d,newRoom,'floor'));
                                            }
                                             
                                            
                                        }  
                                    } 
                                    for(var a=0;a<5;a++){
                                        for(var b=0;b<2;b++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",b+4,a+4,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",a+4,b+4,newRoom,'floor'));
                                        }
                                    }
                                }
                            }else if(rooms[a].tiles[b].relativeY == 0 && roomIsPresentAt(rooms[a].pos.x,rooms[a].pos.y-9) == false ){ //Up
                                rand = round(random(1,5));//1,5
                                if(rand == 1){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y-9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){    
                                        if(c==5){
                                            newRoom.tiles.push(new tile("assets/door.png",9,c,newRoom,'door'));
                                            newRoom.tiles.push(new tile("assets/door.png",0,c,newRoom,'door')); 
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",c,9,newRoom,'floor')); 
                                            newRoom.tiles.push(new tile("assets/door.png",c,0,newRoom,'door'));   
                                        }else{
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall')); 
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall'));  
                                            rooms[a+1].tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall')); 
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,1+d,newRoom,'floor'));    
                                        }  
                                    }    
                                }else if(rand == 2){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y-9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){  
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",0,c,newRoom,'wall'));  
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",9,c,newRoom,'wall'));  
                                        if(c==5){
                                            newRoom.tiles.push(new tile("assets/door.png",c,0,newRoom,'door'));  
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",c,9,newRoom,'floor'))
                                        }else{
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall'))
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall'));  
                                        }
                                        
                                    }
                                    for(var c=0;c<8;c++){
                                        for(var d=0;d<8;d++){
                                            if((1+c == 3 && 1+d == 1)||(1+c == 6 && 1+d == 1)||(1+c == 3 && 1+d == 3)||(1+c == 2 && 1+d == 3)||(1+c == 1 && 1+d == 3)||(1+c == 6 && 1+d == 3)||(1+c == 7 && 1+d == 3)||(1+c == 8 && 1+d == 3)||(1+c == 3 && 1+d == 4)||(1+c == 6 && 1+d == 4)||(1+c == 3 && 1+d == 6)||(1+c == 2 && 1+d == 6)||(1+c == 1 && 1+d == 6)||(1+c == 6 && 1+d == 6)||(1+c == 7 && 1+d == 6)||(1+c == 8 && 1+d == 6)||(1+c == 3 && 1+d == 7)||(1+c == 6 && 1+d == 7)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",1+c,1+d,newRoom,'wall'));
                                            }else if((1+c == 3 && 1+d == 2)||(1+c == 6 && 1+d == 2)||(1+c == 3 && 1+d == 5)||(1+c == 6 && 1+d == 5)||(1+c == 3 && 1+d == 8)||(1+c == 6 && 1+d == 8)){
                                                newRoom.tiles.push(new tile("assets/door.png",1+c,1+d,newRoom,'door'));
                                            }else{
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",1+c,1+d,newRoom,'floor'));        
                                            }
                                            
                                        }  
                                    } 
                                }else if(rand == 3){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y-9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){    
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",3,c,newRoom,'wall'));
                                        newRoom.tiles.push(new tile("assets/stone_wall.png",6,c,newRoom,'wall'));   
                                        if(c==3||c==4||c==6){
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,0,newRoom,'wall'));
                                            newRoom.tiles.push(new tile("assets/stone_wall.png",c,9,newRoom,'wall')); 
                                        }else if(c==5){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",c,9,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/door.png",c,0,newRoom,'door')); 
                                        }else{
                                        
                                        }
                                        
                                    }
                                    for(var c=0;c<2;c++){
                                        for(var d=0;d<8;d++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",4+c,1+d,newRoom,'floor')); 
                                            
                                        }  
                                    } 
                                }else if(rand == 4){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y-9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        for(var d=0;d<10;d++){
                                            if((c==1&&d==3)||(c==2&&d==3)||(c==3&&d==3)||(c==4&&d==3)||(c==5&&d==3)||(c==6&&d==3)||(c==1&&d==6)||(c==2&&d==6)||(c==3&&d==6)||(c==6&&d==3)||(c==6&&d==4)||(c==6&&d==5)||(c==6&&d==6)||(c==6&&d==7)||(c==6&&d==8)||(c==6&&d==9)||(c==3&&d==7)||(c==3&&d==8)||(c==3&&d==9)||(c==4&&d==9)||(c==0&&d==6)||(c==0&&d==4)||(c==0&&d==3)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",c,d,newRoom,'wall'));
                                            }else if(c==5&&d==9){
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",c,d,newRoom,'floor'));
                                            }else if(c==0&&d==5){
                                                newRoom.tiles.push(new tile("assets/door.png",c,d,newRoom,'door'));
                                            }
                                             
                                            
                                        }  
                                    } 
                                    for(var a=0;a<5;a++){
                                        for(var b=0;b<2;b++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",a+1,b+4,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",b+4,a+4,newRoom,'floor'));
                                        }
                                    }
                                }else if(rand == 5){
                                    rooms[a].tiles[b].sprite.x = -9999;
                            
                                    var newRoom = new room(rooms[a].pos.x,rooms[a].pos.y-9);
                                    rooms.push(newRoom);
                                    for(var c=0;c<10;c++){
                                        for(var d=0;d<10;d++){
                                            if((c==3&&d==3)||(c==4&&d==3)||(c==5&&d==3)||(c==6&&d==3)||(c==3&&d==6)||(c==6&&d==3)||(c==6&&d==6)||(c==3&&d==4)||(c==3&&d==5)||(c==7&&d==3)||(c==8&&d==3)||(c==9&&d==3)||(c==9&&d==4)||(c==9&&d==6)||(c==8&&d==6)||(c==7&&d==6)||(c==3&&d==7)||(c==3&&d==8)||(c==6&&d==7)||(c==6&&d==8)||(c==6&&d==9)||(c==4&&d==9)||(c==3&&d==9)){
                                                newRoom.tiles.push(new tile("assets/stone_wall.png",c,d,newRoom,'wall'));
                                            }else if(c==9&&d==5){
                                                newRoom.tiles.push(new tile("assets/door.png",c,d,newRoom,'door'));
                                            }else if(c==5&&d==9){
                                                newRoom.tiles.push(new tile("assets/stone_floor.png",c,d,newRoom,'floor'));
                                            }  
                                        }  
                                    } 
                                    for(var a=0;a<5;a++){
                                        for(var b=0;b<2;b++){
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",b+4,a+4,newRoom,'floor'));
                                            newRoom.tiles.push(new tile("assets/stone_floor.png",a+4,b+4,newRoom,'floor'));
                                        }
                                    }
                                }
                            }else{
                                rooms[a].tiles[b].sprite.img.realSrc = 'assets/stone_floor.png';
                                rooms[a].tiles[b].t = "floor";
                            }   
                        }
                    }
                    if(distance<=1&&energy>4&&attackSelected==true){
                        for(var c=0;c<creatures.length;c++){
                            if(creatures[c].pos.x == rooms[a].tiles[b].pos.x && creatures[c].pos.y == rooms[a].tiles[b].pos.y){
                                energy-=5;
                                creatures[c].health--;
                            }
                        }
                    }
                } 
            }    
        }
    }
    if(mouseIsContainedInGui(endTurnButton.x*100,endTurnButton.y*100,endTurnButton.x*100+175,endTurnButton.y*100+75)){
        energy = 10;
        moveSelected = false;
        attackSelected = false;
        for(var a=0;a<creatures.length;a++){
            creatures[a].energy = creatures[a].maxEnergy;
        }
    }
    if(mouseIsContainedInGui(moveButton.x*100,moveButton.y*100,moveButton.x*100+175,moveButton.y*100+75)){
        moveSelected = true;
    }
    if(mouseIsContainedInGui(attackButton.x*100,attackButton.y*100,attackButton.x*100+175,attackButton.y*100+75)){
        moveSelected = false;
        attackSelected = true;
    }
}

function keyPressed(){
    if(keyCode == 17){
        controlHeld = true;
    }
}

function keyReleased(){
    if(keyCode == 17){
        controlHeld = false;
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

function roomIsPresentAt(x,y){
    for(var a=0;a<rooms.length;a++){
        if(rooms[a].pos.x == x && rooms[a].pos.y == y){
            return true;
        }
    }
    return false;
}

function wallIsPresentAt(x,y){
    for(var a=0;a<rooms.length;a++){
        for(var b=0;b<rooms[a].tiles.length;b++){
            if(rooms[a].tiles[b].pos.x == x && rooms[a].tiles[b].pos.y == y && rooms[a].tiles[b].t == "wall"){
                return true;
            }
        }
    }
    return false;
}

function item(type,id){
    this.type = type;
    this.id = id;
}

function mapItem(s,x,y){
    this.s = s;
    this.x = x;
    this.y = y;
    this.sprite = new img(s,x,y,1,1,images.length,2);
    images.push(this.sprite);
    mapItems.push(this);
    this.render = function(){
        this.sprite.x = this.x - player.pos.x+11;
        this.sprite.y = this.y - player.pos.y+5;
        this.sprite.render();
    }
}

function clickOption(type){
    this.type = type;
    
    
    
}

