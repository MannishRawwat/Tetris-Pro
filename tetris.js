var pp=document.getElementById("play");
var c=1;
function change(){
  //console.log("change");
  if(c===1)
  {pp.src="pause.jpeg";
  c=0;
  }
  else
  {
    pp.src="play.png"
    c=1;
  }
}

var canvas=document.getElementById("can");
var ctx=canvas.getContext("2d");
ctx.scale(40,40);

var posx=5;
var posy=0;

var gamearea = new Array(12);
for ( var i = 0; i < 12; i++ ) {
    gamearea[i] = new Array(13);
  }

for(var i=1;i<=10;i++){
  for(var j=0;j<12;j++){
    gamearea[i][j]=0;
  }
  gamearea[i][12]=1;
}
for(var i=0;i<=12;i++){
   gamearea[0][i]=1;
   gamearea[11][i]=1;
}

function draw(){
   //console.log("draw");
   if (c===1)
      return;
  ctx.fillStyle="black";
  ctx.fillRect(0,0,10,12);

  ctx.fillStyle="red";

  ctx.fillRect(posx,posy,1,1);
  ctx.fillRect(posx-1,posy,1,1);
  ctx.fillRect(posx+1,posy,1,1);
  ctx.fillRect(posx,posy+1,1,1);
   posy++;
   if(checkgame()===1){
    drawman();
   }
   else
   {
      //console.log(posx+' '+posy);

     gamearea[posx+1][posy-1]=1;
     gamearea[posx][posy-1]=1;
     gamearea[posx+2][posy-1]=1;
     gamearea[posx+1][posy]=1;

     posx=5;
     posy=0;
     drawman();
   }

}
function drawman(){
  console.log("drawman called");
  for(var i=1;i<=10;i++){
    for(var j=0;j<=11;j++){
      if(gamearea[i][j]===1)
       { console.log("one should be drawn");
         ctx.fillStyle="red";
         ctx.fillRect(i-1,j,1,1);
       }
    }
  }
}

var checkgame = function(){

      if(gamearea[posx][posy]!==0||gamearea[posx+1][posy]!==0||gamearea[posx+2][posy]!==0||gamearea[posx+1][posy+1]!==0)
             return 0;


  return 1;
}

document.addEventListener("keydown",event=>{

    if(c===0){
  if(event.keyCode===40){
    posy++;
    if(checkgame()===1)
    {
    draw();
    clearInterval(t);
    t=setInterval(draw,1000);}
    else{
      posy--;
    }
  }
  else if(event.keyCode===37){

    {
      posx--;
      if(checkgame()===1)
    {  posy--;
    draw();
  }
  else posx++;
  }
  }
  else if(event.keyCode===39){


    posx++;
    if(checkgame()===1)
    {
    posy--;
    draw();}
  else {
    posx--;
  }
  }
}
});

t=setInterval(draw,1000);
function replay(){
  location.reload();
}
