var diryJ,dirxJ,jog,velJ,pjx,pjy;
var velS;
var screenSizeW,screeSizeH;
var game;
var frames;
var allienShipCount,painelAllienShip,velAllienShip,allienShipInterval;
var allienShipTotal;
var planetHpBar;

function teclaDw(){
    var tecla=event.keyCode;
    if(tecla==38){ //seta cima
        diryJ=-1;
    }else if(tecla==40){//seta baixo
        diryJ=1;
    }
    if(tecla==37){//seta esquerda
        dirxJ=-1;
    }else if(tecla==39){//seta direita
        dirxJ=1;
    }
    if(tecla==32){//barra espaco / ataque
        shooting(pjx+17,pjy)
    }
}
function teclaUp(){
    var tecla=event.keyCode;
    if((tecla==38)||(tecla==40)){
        diryJ=0;
    }
    if((tecla==37)||(tecla==39)){
        dirxJ=0;
    }    
}
function createAllienShip(){
    if(game){
        var y=0;
        var x=Math.random()*screenSizeW;
        var allienShip=document.createElement("div");
        var att1=document.createAttribute("class");
        var att2=document.createAttribute("style");
        att1.value="allienShip";
        att2.value="top:"+y+"px;left:"+x+"px;";
        allienShip.setAttributeNode(att1);
        allienShip.setAttributeNode(att2);
        document.body.appendChild(allienShip);
        allienShipCount--;
    }
}
function controlAllienShip(){
    allienShipTotal=document.getElementsByClassName("allienShip");
    var allienShipSize=allienShipTotal.length;
    for(var i=0;i<allienShipSize;i++){
        if(allienShipTotal[i]){
            var pi=allienShipTotal[i].offsetTop;
            pi+=velAllienShip;
            allienShipTotal[i].style.top=pi+"px";
            if(pi>screeSizeH){
                planetHpBar-=10;
                allienShipTotal[i].remove();
            }
        }
    }

}
function shooting(x, y){
    var t=document.createElement("div");
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    att1.value="shootJog";
    att2.value="top:"+y+"px;left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
}
function shootingClean(){
    var shoots=document.getElementsByClassName("shootJog");
    var size=shoots.length;
    for(var i=0;i<size;i++){
        if(shoots[i]){
            var ps=shoots[i].offsetTop;
            ps-=velS;
            shoots[i].style.top=ps+"px";
            collisionAllienShip(shoots[i]);
            if(ps<0){
                shoots[i].remove();
            }
        }
    }
}

function collisionAllienShip(tiro){
	var tam=allienShipTotal.length;
	for(var i=0;i<tam;i++){
		if(allienShipTotal[i]){
			if(
				(
					(tiro.offsetTop<=(allienShipTotal[i].offsetTop+80))&& //Cima tiro com baixo bomba
					((tiro.offsetTop+16)>=(allienShipTotal[i].offsetTop)) //Baixo tiro com cima bomba
				)
				&&
				(
					(tiro.offsetLeft<=(allienShipTotal[i].offsetLeft+80))&& //Esquerda tiro com direita bomba
					((tiro.offsetLeft+16)>=(allienShipTotal[i].offsetLeft)) //Direita Tito  com esquerda Bomba
				)
			){
				
				allienShipTotal[i].remove();
				tiro.remove();
			}
		}
	}
}
function controlaJogador(){
   pjy+=diryJ*velJ;
   pjx+=dirxJ*velJ;
   jog.style.top=pjy+"px";
   jog.style.left=pjx+"px";
}

function gameLoop(){
    if(game){    //controles funcoes
       controlaJogador();
       shootingClean();
    
       controlAllienShip();
       
    }
    frames=requestAnimationFrame(gameLoop)
}
function inicia(){
    game=true;
    //Screen Start
    screeSizeH=window.innerHeight;
    screenSizeW=window.innerWidth;

    //jogador start
    dirxJ=diryJ=0;
    pjx=screenSizeW/2;
    pjy=screeSizeH/2;
    velJ=10;
    velS=16;
    jog=document.getElementById("navJogador");
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";

    //Controle das Allien Ships
    
    clearInterval(allienShipInterval);
    allienShipCount=150;
    velAllienShip=2;
    allienShipInterval=setInterval(createAllienShip,1800);

    //Controle do Planeta
    planetHpBar=100;

    gameLoop();

}

window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);