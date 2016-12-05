var tiles = $('.tile');
var restartButton = $('#restart')[0];
var selectedTileTypeOne = 0;
var selectedTileTypeTwo = 0;
var selectedTileOne = -1;
var selectedTileTwo = -1;
var score = 0;
var scoreText = $('#score')[0];

var icons = {1:"fa-plus",
             2:"fa-trash",
             3:"fa-university",
             4:"fa-car",
             5:"fa-gift",
             6:"fa-gamepad",
             7:"fa-cog",
             8:"fa-motorcycle"}

addButtonListeners();

init();

function init(){
    resetTiles();
    randomlyAssignPairs();
    addTileListeners();
    selectedTileTypeOne = 0;
    selectedTileTypeTwo = 0;
    selectedTileOne = -1;
    selectedTileTwo = -1;
    score = 0;
    scoreText.innerHTML = score;
}

function randomlyAssignPairs(){
    var available = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    for(var i=0;i<tiles.length;i++){
        var tileType = Math.floor(Math.random() * available.length);
        tiles[i].type = available[tileType];
        tiles[i].location = i;
        available.splice(tileType,1);
    }
}

function printTileTypes(){
    var output = "";
    var iconOut = "";
    for(var i=0;i<tiles.length;i++){
        output+=tiles[i].type + ", ";
        iconOut+= icons[tiles[i].type] + ", ";
    }
    console.log(output);
    console.log(iconOut);
}

function addButtonListeners(){
    restartButton.addEventListener("click",init);
}

function addTileListeners(){
    for(var i=0;i<tiles.length;i++){
        tiles[i].addEventListener("click",tileClicked);
    }
}

function tileClicked(){
    if(!this.classList.contains("found") && !this.classList.contains("selected")){
        keepScore();
        if(selectedTileOne !== -1 && selectedTileTwo !== -1){
            hideTwoTiles();
        }
        
        if(selectedTileOne == -1){
            displayCurrentTile(this, 1);    
        }else if(selectedTileTypeOne == this.type && selectedTileOne!=this.location){
            tilesMatched(this);
        }else{
            displayCurrentTile(this, 2);
        }
    }
}

function hideTwoTiles(){
    tiles[selectedTileOne].classList.remove("selected");
    tiles[selectedTileOne].firstChild.classList.remove(icons[selectedTileTypeOne]);
    tiles[selectedTileTwo].classList.remove("selected");
    tiles[selectedTileTwo].firstChild.classList.remove(icons[selectedTileTypeTwo]);
    selectedTileOne = -1;
    selectedTileTwo = -1;
    selectedTileTypeOne = 0;
    selectedTileTypeTwo = 0;
}

function displayCurrentTile(tile, selection){
    tile.classList.add("selected");
    tile.firstChild.classList.add(icons[tile.type]);
    
    if(selection == 1){
        selectedTileTypeOne = tile.type;
        selectedTileOne = tile.location;
    }else{
        selectedTileTwo = tile.location;
        selectedTileTypeTwo = tile.type;
    }
}

function tilesMatched(tile){
    tiles[selectedTileOne].classList.remove("selected");
    tiles[selectedTileOne].classList.add("found");
    tile.classList.add("found");
    tile.firstChild.classList.add(icons[tile.type]);
    selectedTileTypeOne = 0;
    selectedTileOne = -1;
}

function resetTiles(){
    for(var i=0;i<tiles.length;i++){
        tiles[i].classList.remove("selected");
        tiles[i].classList.remove("found");
        removeIcons(tiles[i]);
    }
}

function removeIcons(tile){
    var iconsSize = Object.keys(icons).length + 1;
    for(var i=0;i<iconsSize;i++){
        tile.firstChild.classList.remove(icons[i]);
    }
}

function keepScore(){
    score++;
    scoreText.innerHTML = score;
}