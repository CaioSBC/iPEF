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
    momento += moduloXCarga[i]*(fimYDaCarga[i] - inicioYDaCarga[i])*((fimYDaCarga[i] - inicioYDaCarga[i])/2);
  for(let i = 0; i < moduloYCarga.length;i++)
    momento += moduloYCarga[i]*(fimXDaCarga[i] - inicioXDaCarga[i])*((fimXDaCarga[i] - inicioXDaCarga[i])/2);
  print("A força de reação em x é igual a "+forcasX+",em y é igual a "+forcasY+" e o momento de reação é "+momento); 
}

function contas1ApoioSimples(){
  print("b");
}

function contas2ApoioSimples(){
  print("c");
}

function contas1Simples1Fixo(){
  print("d");
}

function contas1ApoioFixo(){
  print("e");
}

function contas3ApoioSimples(){
  print("f");
}
