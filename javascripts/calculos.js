var moduloXForca = [];
var moduloYForca = [];
var xDaForca = [];
var yDaForca = [];
var tipo = [];
var xDoApoio = [];
var yDoApoio = [];
var direcao = [];
var moduloXCarga = [];
var moduloYCarga = [];
var inicioXDaCarga = [];
var inicioYDaCarga = [];
var fimXDaCarga = [];
var fimYDaCarga = [];
var forcasX = 0;
var forcasY = 0;
var forcaX1 = 0;
var forcaX2 = 0;
var forcaY1 = 0;
var forcaY2 = 0;
var momento = 0;

function preload() {
    
  table = loadTable('pontos.csv', 'csv', 'header');
  table2 = loadTable('linhas.csv','csv','header');
  table3 = loadTable('forcas.csv','csv','header');
  table4 = loadTable('apoios.csv','csv','header');
  table5= loadTable('cargas.csv','csv','header');//ir somando em intervalos de delta x e delta y para fazer varias setas
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  dadosForças();
  dadosApoios();
  dadosCargas();
  if(tipo[0]=="engaste")
    contasEngaste();
  else if(tipo[0]=="simples" && tipo.length == 1)
    contas1ApoioSimples();
  else if(tipo[0]=="fixo" && tipo.length == 1)
    contas1ApoioFixo();
  else if((tipo[0]=="fixo" || tipo[1]=="fixo") && tipo.length == 2)
    contas1Simples1Fixo();
  else if(tipo[0]=="simples" && tipo[1]=="simples" && tipo.length == 2)
    contas2ApoioSimples();
  else if(tipo[0]=="simples" && tipo[1]=="simples" && tipo.length == 3)
    contas3ApoioSimples();
  else
    print("O Sistema não pode ser resolvido")
  noLoop();
}

function dadosForças(){
  for (let r = 0; r < table3.getRowCount(); r++){
    xDaForca[r] = table3.getNum(r,0);
  }
  for (let r = 0; r < table3.getRowCount(); r++){
    yDaForca[r] = table3.getNum(r,1);
  }
  for (let r = 0; r < table3.getRowCount(); r++){
    moduloXForca[r] = table3.getNum(r,2);
  }
  for (let r = 0; r < table3.getRowCount(); r++){
    moduloYForca[r] = table3.getNum(r,3);
  }
}

function dadosApoios(){
  for (let r = 0; r < table4.getRowCount(); r++){
    tipo[r] = table4.getString(r,0);
  }
  for (let r = 0; r < table4.getRowCount(); r++){
    xDoApoio[r] = table4.getNum(r,1);
  }
  for (let r = 0; r < table4.getRowCount(); r++){
    yDoApoio[r] = table4.getNum(r,2);
  }
  for (let r = 0; r < table4.getRowCount(); r++){
    direcao[r] = table4.getString(r,3);
  }
}

function dadosCargas(){
  for (let r = 0; r < table5.getRowCount(); r++){
    moduloXCarga[r] = table5.getNum(r,0);
  }
  for (let r = 0; r < table5.getRowCount(); r++){
    moduloYCarga[r] = table5.getNum(r,1);
  }
  for (let r = 0; r < table5.getRowCount(); r++){
    inicioXDaCarga[r] = table5.getNum(r,2);
  }
  for (let r = 0; r < table5.getRowCount(); r++){
    inicioYDaCarga[r] = table5.getNum(r,3);
  }
  for (let r = 0; r < table5.getRowCount(); r++){
    fimXDaCarga[r] = table5.getNum(r,4);
  }
  for (let r = 0; r < table5.getRowCount(); r++){
    fimYDaCarga[r] = table5.getNum(r,5);
  }
}

function contasEngaste(){
  for(let i = 0; i < moduloXForca.length;i++)
    forcasX += moduloXForca[i];
  for(let i = 0; i < moduloXCarga.length;i++)
    forcasX += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
  for(let i = 0; i < moduloYForca.length;i++)
    forcasY += moduloYForca[i];
  for(let i = 0; i < moduloYCarga.length;i++)
    forcasY += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
  for(let i = 0; i < moduloXForca.length;i++)
    momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[0]);
  for(let i = 0; i < moduloYForca.length;i++)
    momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[0]);
  for(let i = 0; i < moduloXCarga.length;i++)
    momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[0]);
  for(let i = 0; i < moduloYCarga.length;i++)
    momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[0]);
  print("A força de reação em x é igual a "+forcasX+",em y é igual a "+forcasY+" e o momento de reação é "+momento); 
}

function contas1ApoioSimples(){
  if(direcao[0] == "direita" || direcao[0] == "esquerda"){
    for(let i = 0; i < moduloXForca.length;i++)
      forcasX += moduloXForca[i];
    for(let i = 0; i < moduloXCarga.length;i++)
      forcasX += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    print("A força de reação em x é igual a "+forcasX)
  }
  else{
    for(let i = 0; i < moduloYForca.length;i++)
      forcasY += moduloYForca[i];
    for(let i = 0; i < moduloYCarga.length;i++)
      forcasY += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    print("A força de reação em y é igual a "+forcasY)
  }
}

function contas2ApoioSimples(){
  if((direcao[0] == "direita" || direcao[0] == "esquerda")&&(direcao[1] == "direita" || direcao[1] == "esquerda")){
  for(let i = 0; i < moduloXForca.length;i++)
    momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[0]);
  for(let i = 0; i < moduloYForca.length;i++)
    momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[0]);
  for(let i = 0; i < moduloXCarga.length;i++)
    momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[0]);
  for(let i = 0; i < moduloYCarga.length;i++)
    momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[0]);
  forcaX2 = momento/(yDoApoio[1]- yDoApoio[0])
  for(let i = 0; i < moduloXForca.length;i++)
    forcaX1 += moduloXForca[i];
  for(let i = 0; i < moduloXCarga.length;i++)
    forcaX1 += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    print("A força nos apoios é igual a "+forcaX1+" e "+forcaX2);
  }
  else if((direcao[0] == "baixo" || direcao[0] == "cima")&&(direcao[1] == "baixo" || direcao[1] == "cima")){
  for(let i = 0; i < moduloYForca.length;i++)
    momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[0]);
  for(let i = 0; i < moduloXForca.length;i++)
    momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[0]);
  for(let i = 0; i < moduloXCarga.length;i++)
    momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[0]);
  for(let i = 0; i < moduloYCarga.length;i++)
    momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[0]);
  forcaY2 = momento/(xDoApoio[1] - xDoApoio[0])
  for(let i = 0; i < moduloYForca.length;i++)
    forcaY1 += moduloYForca[i];
  for(let i = 0; i < moduloXCarga.length;i++)
    forcaY1 += moduloXCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    print("A força nos apoios é igual a "+forcaY1+" e "+forcaY2);
  }
  else{
    for(let i = 0; i < moduloXForca.length;i++)
      forcasX += moduloXForca[i];
    for(let i = 0; i < moduloXCarga.length;i++)
      forcasX += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    for(let i = 0; i < moduloYForca.length;i++)
      forcasY += moduloYForca[i];
    for(let i = 0; i < moduloYCarga.length;i++)
      forcasY += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    print("A força de reação em x é igual a "+forcasX+" e a força de reação em y é igual a "+forcasY);
  }
}

function contas1Simples1Fixo(){
  if(tipo[0] == "simples" && (direcao[0]=="esquerda" || direcao[0]=="direita")){
    for(let i = 0; i < moduloYForca.length;i++)
      forcaY1 += moduloYForca[i];
    for(let i = 0; i < moduloYCarga.length;i++)
      forcaY1 += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    for(let i = 0; i < moduloXForca.length;i++)
      momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[1]);
    for(let i = 0; i < moduloYForca.length;i++)
      momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[1]);
    for(let i = 0; i < moduloXCarga.length;i++)
      momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[1]);
    for(let i = 0; i < moduloYCarga.length;i++)
      momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[1]);
    forcaX2 += momento/(yDoApoio[0]-yDoApoio[1])
    for(let i = 0; i < moduloXForca.length;i++)
      forcaX1 += moduloXForca[i];
    for(let i = 0; i < moduloXCarga.length;i++)
      forcaX1 += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    forcaX1+=forcaX2;
    print("A força de reação no apoio simples é igual a "+forcaX2+" e a força de reação vertical no fixo é igual a "+forcaY1+" e a reação horizontal é de "+forcaX1);
  }
  else if(tipo[0] == "simples" && (direcao[0]=="baixo" || direcao[0]=="cima")){
    for(let i = 0; i < moduloXForca.length;i++)
      forcaX1 += moduloXForca[i];
    for(let i = 0; i < moduloXCarga.length;i++)
      forcaX1 += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    for(let i = 0; i < moduloXForca.length;i++)
      momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[1]);
    for(let i = 0; i < moduloYForca.length;i++)
      momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[1]);
    for(let i = 0; i < moduloXCarga.length;i++)
      momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[1]);
    for(let i = 0; i < moduloYCarga.length;i++)
      momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[1]);
    forcaY2 += momento/(xDoApoio[0]-xDoApoio[1])
    for(let i = 0; i < moduloYForca.length;i++)
      forcaY1 += moduloYForca[i];
    for(let i = 0; i < moduloYCarga.length;i++)
      forcaY1 += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    forcaY1+=forcaY2;
    print("A força de reação no apoio simples é igual a "+forcaY2+" e a força de reação vertical no fixo é igual a "+forcaY1+" e a reação horizontal é de "+forcaX1);
  }
  else if(tipo[1] == "simples" && (direcao[1]=="baixo" || direcao[1]=="cima")){
    for(let i = 0; i < moduloXForca.length;i++)
      forcaX1 += moduloXForca[i];
    for(let i = 0; i < moduloXCarga.length;i++)
      forcaX1 += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    for(let i = 0; i < moduloXForca.length;i++)
      momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[0]);
    for(let i = 0; i < moduloYForca.length;i++)
      momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[0]);
    for(let i = 0; i < moduloXCarga.length;i++)
      momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[0]);
    for(let i = 0; i < moduloYCarga.length;i++)
      momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[0]);
    forcaY2 += momento/(xDoApoio[1]-xDoApoio[0])
    for(let i = 0; i < moduloYForca.length;i++)
      forcaY1 += moduloYForca[i];
    for(let i = 0; i < moduloYCarga.length;i++)
      forcaY1 += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    forcaY1+=forcaY2;
    print("A força de reação no apoio simples é igual a "+forcaY2+" e a força de reação vertical no fixo é igual a "+forcaY1+" e a reação horizontal é de "+forcaX1);
  }
  else if(tipo[1] == "simples" && (direcao[1]=="esquerda" || direcao[1]=="direita")){
    for(let i = 0; i < moduloYForca.length;i++)
      forcaY1 += moduloYForca[i];
    for(let i = 0; i < moduloYCarga.length;i++)
      forcaY1 += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    for(let i = 0; i < moduloXForca.length;i++)
      momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[0]);
    for(let i = 0; i < moduloYForca.length;i++)
      momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[0]);
    for(let i = 0; i < moduloXCarga.length;i++)
      momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[0]);
    for(let i = 0; i < moduloYCarga.length;i++)
      momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[0]);
    forcaX2 += momento/(yDoApoio[1]-yDoApoio[0])
    for(let i = 0; i < moduloXForca.length;i++)
      forcaX1 += moduloXForca[i];
    for(let i = 0; i < moduloXCarga.length;i++)
      forcaX1 += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    forcaX1+=forcaX2;
    print("A força de reação no apoio simples é igual a "+forcaX2+" e a força de reação vertical no fixo é igual a "+forcaY1+" e a reação horizontal é de "+forcaX1);
  }
}

function contas1ApoioFixo(){
  for(let i = 0; i < moduloXForca.length;i++)
    forcasX += moduloXForca[i];
  for(let i = 0; i < moduloXCarga.length;i++)
    forcasX += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
  for(let i = 0; i < moduloYForca.length;i++)
    forcasY += moduloYForca[i];
  for(let i = 0; i < moduloYCarga.length;i++)
    forcasY += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
  ("A força de reação em x é igual a "+forcasX+",em y é igual a "+forcasY);
}

function contas3ApoioSimples(){
  let contDirecaoX = 0;
  let contDirecaoY = 0;
  let apoioVertical1 = 0;
  let apoioHorizontal1 = 0;
  let apoioHorizontal2 = 0;
  let apoioVertical2 = 0;
  for(let i = 0; i < direcao.length;i++){
    if((direcao[i] == "esquerda" || direcao[i] == "direita") && contDirecaoX==0){
      contDirecaoX++;
      apoioHorizontal1 = i;
    }
    else if((direcao[i] == "cima" || direcao[i] == "baixo") && contDirecaoY==0){
      contDirecaoY++;
      apoioVertical1 = i;
    }
    else if((direcao[i] == "esquerda" || direcao[i] == "direita") && contDirecaoX==1){
      contDirecaoX++;
      apoioHorizontal2 = i;
    }
    else if((direcao[i] == "cima" || direcao[i] == "baixo") && contDirecaoY==1){
      contDirecaoY++;
      apoioVertical2 = i;
    }
  }
  if(contDirecaoX==2){
    for(let i = 0; i < moduloYForca.length;i++)
      forcaY1 += moduloYForca[i];
    for(let i = 0; i < moduloYCarga.length;i++)
      forcaY1 += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    for(let i = 0; i < moduloXForca.length;i++)
      momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[apoioHorizontal1]);
    for(let i = 0; i < moduloYForca.length;i++)
      momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[apoioHorizontal1]);
    for(let i = 0; i < moduloXCarga.length;i++)
      momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[apoioHorizontal1]);
    for(let i = 0; i < moduloYCarga.length;i++)
      momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[apoioHorizontal1]);
    momento += forcaY1*(xDoApoio[apoioVertical1]-xDoApoio[apoioHorizontal1]);
    forcaX2 += momento/(yDoApoio[apoioHorizontal2]-yDoApoio[apoioHorizontal1]);
    for(let i = 0; i < moduloXForca.length;i++)
      forcaX1 += moduloXForca[i];
    for(let i = 0; i < moduloXCarga.length;i++)
      forcaX1 += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    forcaX1 += forcaX2;
    print("A reação do apoio na vertical é "+forcaY1+" a reação no primeiro apoio da horizontal é "+forcaX1+" e no segundo: "+forcaX2);
  }
  else if(contDirecaoY==2){
    for(let i = 0; i < moduloXForca.length;i++)
      forcaX1 += moduloXForca[i];
    for(let i = 0; i < moduloXCarga.length;i++)
      forcaX1 += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i]);
    for(let i = 0; i < moduloXForca.length;i++)
      momento += moduloXForca[i]*(yDaForca[i]-yDoApoio[apoioVertical1]);
    for(let i = 0; i < moduloYForca.length;i++)
      momento += moduloYForca[i]*(xDaForca[i]-xDoApoio[apoioVertical1]);
    for(let i = 0; i < moduloXCarga.length;i++)
      momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*(((fimYDaCarga[i] + inicioYDaCarga[i])/2)-yDoApoio[apoioVertical1]);
    for(let i = 0; i < moduloYCarga.length;i++)
      momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*(((fimXDaCarga[i] + inicioXDaCarga[i])/2)-xDoApoio[apoioVertical1]);
    momento += forcaX1*(yDoApoio[apoioHorizontal1]-yDoApoio[apoioVertical1]);
    forcaY2 += momento/(xDoApoio[apoioVertical2]-xDoApoio[apoioVertical1]);
    for(let i = 0; i < moduloYForca.length;i++)
      forcaY1 += moduloYForca[i];
    for(let i = 0; i < moduloYCarga.length;i++)
      forcaY1 += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i]);
    forcaY1 += forcaY2;
    print("A reação do apoio na horizontal é "+forcaX1+" a reação no primeiro apoio da vertical é "+forcaY1+" e no segundo: "+forcaY2);
  }
  else
    print("Não é possivel resolver o sistema")
}
