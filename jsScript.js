var diryJ,dirxJ,jog,velJ,pjx,pjy;
var velS;
var screenSizeW,screenSizeH;
var game;
var frames;
var allienShipCount,painelAllienShip,velAllienShip,allienShipInterval;
var allienShipTotal;
var planetHpBar,planetBar;
var indiceExplosao,indiceSound;
var screenMsg;


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
            if(pi>screenSizeH){
                planetHpBar-=10;
                criaExplosao(2,allienShipTotal[i].offsetLeft,null);
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
					(tiro.offsetTop<=(allienShipTotal[i].offsetTop+80))&& 
					((tiro.offsetTop+16)>=(allienShipTotal[i].offsetTop))
				)
				&&
				(
					(tiro.offsetLeft<=(allienShipTotal[i].offsetLeft+80))&& 
					((tiro.offsetLeft+16)>=(allienShipTotal[i].offsetLeft)) 
				)
			){
				criaExplosao(1,allienShipTotal[i].offsetLeft-25,allienShipTotal[i].offsetTop);
				allienShipTotal[i].remove();
				tiro.remove();
			}
		}
	}
}
function criaExplosao(tipo,x,y){ 
	if(document.getElementById("explosao"+(indiceExplosao-4))){
		document.getElementById("explosao"+(indiceExplosao-4)).remove();
	}
	var explosao=document.createElement("div");
	var img=document.createElement("img");
	var som=document.createElement("audio");
	//Atributos para div
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	var att3=document.createAttribute("id");
	//Atributo para imagem
	var att4=document.createAttribute("src");
	//Atributos para audio
	var att5=document.createAttribute("src");
	var att6=document.createAttribute("id");

	att3.value="explosao"+indiceExplosao;
	if(tipo==1){
		att1.value="explosionShip";
		att2.value="top:"+y+"px;left:"+x+"px;";
		att4.value="explosaoShip.gif?"+new Date();
	}else{
		att1.value="explosionPlanet";
		att2.value="top:"+(screenSizeH-57)+"px;left:"+(x-17)+"px;";
		att4.value="explosaoPlanet.gif?"+new Date();
	}
	att5.value="explosiontrack.mp3?"+new Date();
	att6.value="som"+indiceSound;
	explosao.setAttributeNode(att1);
	explosao.setAttributeNode(att2);
	explosao.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	explosao.appendChild(img);
	explosao.appendChild(som);
	document.body.appendChild(explosao);
	document.getElementById("som"+indiceSound).play();
	indiceExplosao++;
	indiceSound++;

}

function controlaJogador(){
   pjy+=diryJ*velJ;
   pjx+=dirxJ*velJ;
   jog.style.top=pjy+"px";
   jog.style.left=pjx+"px";
}

function gameControl(){
   planetBar.style.width=planetHpBar+"px";
   if(allienShipCount<=0){
       game=false;
       clearInterval(allienShipInterval);
       screenMsg.style.backgroundImage="url('vitoria1.png')";
       screenMsg.style.display="block";
   }
   if(planetHpBar<=0){
       game=false;
       clearInterval(allienShipInterval);
       screenMsg.style.backgroundImage="url('derrota.png')";
       screenMsg.style.display="block";

   }
}
function gameLoop(){
    if(game){    //controles funcoes
       controlaJogador();
       shootingClean();
       controlAllienShip(); 
    }
    gameControl();
    frames=requestAnimationFrame(gameLoop);

}
function restartGame(){
    allienShipTotal=document.getElementsByClassName("allienShip");
    var sizeR=allienShipTotal.length;
    for(var i=0;i<sizeR;i++){
        if(allienShipTotal[i]){
            allienShipTotal[i].remove();
        }
    }
    var sizeR=allienShipTotal.length;
    for(var i=0;i<sizeR;i++){
        if(allienShipTotal[i]){
            allienShipTotal[i].remove();
        }
    }
    screenMsg.style.display="none";
    clearInterval(allienShipInterval);
    cancelAnimationFrame(frames);
    planetHpBar=420;
    pjx=screenSizeW/2;
    pjy=screenSizeH/2;
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
    allienShipCount=1000;
    game=true;
    allienShipInterval=setInterval(createAllienShip,1000);
    gameLoop();
}

function inicia(){
    game=false;

    //Screen Start
    screenSizeH=window.innerHeight;
    screenSizeW=window.innerWidth;

    //jogador start
    dirxJ=diryJ=0;
    pjx=screenSizeW/2;
    pjy=screenSizeH/2;
    velJ=18;
    velS=24;
    jog=document.getElementById("navJogador");
    jog.style.top=pjy+"px";
    jog.style.left=pjx+"px";
    
    //Controle das Allien Ships
    allienShipCount=1000;
    velAllienShip=6;
    
    //Controle do Planeta
    planetHpBar=420;
    planetBar=document.getElementById("planetaLifeBar");
    planetBar.style.width=planetHpBar+"px";

    //Explosion control
    indiceExplosao=indiceSound=0;

    //screenPops
    screenMsg=document.getElementById("screenMsg");
    screenMsg.style.backgroundImage="url('intro1.png')";
    screenMsg.style.display="block";
    document.getElementById("btnPlay").addEventListener("click",restartGame);

}

window.addEventListener("load",inicia);
document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);