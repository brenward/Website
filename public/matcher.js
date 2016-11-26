var tiles = $('.tile');
console.log(tiles.length);
var selectedTileType = 0;
var selectedTile = -1;
var icons = {1:"fa-plus",
             2:"fa-trash",
             3:"fa-university",
             4:"fa-car",
             5:"fa-gift",
             6:"fa-gamepad",
             7:"fa-cog",
             8:"fa-motorcycle"}

randomlyAssignPairs();
printTileTypes();
addListeners();


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

function addListeners(){
    for(var i=0;i<tiles.length;i++){
        tiles[i].addEventListener("click",tileClicked);
    }
}

function tileClicked(){
    console.log(this.type + "clicked");
    if(!this.classList.contains("found")){
        if(selectedTileType == 0){
            this.classList.add("selected");
            this.firstChild.classList.add(icons[this.type]);
            selectedTileType = this.type;
            selectedTile = this.location;
        }else if(selectedTileType == this.type && selectedTile!=this.location){
            tiles[selectedTile].classList.remove("selected");
            tiles[selectedTile].classList.add("found");
            this.classList.add("found");
             this.firstChild.classList.add(icons[this.type]);
            selectedTileType = 0;
            selectedTile = -1;
        }else if(selectedTileType != this.type){
            tiles[selectedTile].classList.remove("selected");
            tiles[selectedTile].firstChild.classList.remove(icons[selectedTileType]);
            selectedTileType = 0;
            selectedTile = -1;
        }
    }
}


/*$('.tile').on("click",function(event){
    console.log("clicked" + event.);
    $(this).toggleClass("selected");
    
   $('this').fadeOut(1000,function(){
        $('this').remove();
    });
});*/