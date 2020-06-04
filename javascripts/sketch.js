var xorigem = 1000;
var yorigem = 1000;
var distfix = 40;
var distfixforce=10;
var distfixload=10;
var distfixload2=40;
let table
function preload() {
    
  table = loadTable('pontos.csv', 'csv', 'header');
  table2 = loadTable('linhas.csv','csv','header');
  table3 = loadTable('forcas.csv','csv','header');
  table4 = loadTable('apoios.csv','csv','header');
  table5= loadTable('cargas.csv','csv','header');//ir somando em intervalos de delta x e delta y para fazer varias setas
}

function setup() {
  createCanvas(2000, 2000);
}
function draw() {
  background('rgb(255,255,255)');
  strokeWeight(3);
  desenhaForcas();
  stroke('black');
  strokeWeight(10);
  desenhaPonto();
  strokeWeight(5);
  desenhaAresta();
  strokeWeight(3);
  desenhaApoios();
  desenhaCargas();
  
  
}
function desenhaAresta()
{
  for (let r = 0; r < table2.getRowCount(); r++)
      line(xorigem+table.getNum(table2.getNum(r,0), 0)*distfix,yorigem-table.getNum(table2.getNum(r,0), 1)*distfix,xorigem+table.getNum(table2.getNum(r,1), 0)*distfix,yorigem-table.getNum(table2.getNum(r,1), 1)*distfix);
}
function desenhaPonto()
{
  for (let r = 0; r < table.getRowCount(); r++)
      point(xorigem+table.getNum(r, 0)*distfix,yorigem-table.getNum(r, 1)*distfix);
}
function desenhaForcas()
{
  stroke(255,0,0);
  strokeWeight(3);
  let arrowSize = 7;
  for (let r = 0; r < table3.getRowCount(); r++)
  {

    let v0=createVector(xorigem+(table3.getNum(r, 0)*distfix),yorigem-(table3.getNum(r, 1)*distfix));
    let v1=createVector(table3.getNum(r,0)*distfix+xorigem+(table3.getNum(r, 2)*distfixforce),yorigem-table3.getNum(r,1)*distfix-(table3.getNum(r, 3)*distfixforce));
    let v3=p5.Vector.sub(v1,v0)
    drawSeta(v0,v3,'red');
    
    
  }
}
function drawSeta(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  translate(base.x, base.y);
  fill(myColor);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}


function desenhaApoios()
{
  stroke('green');
  for (let r = 0; r < table4.getRowCount(); r++)
  {
     if(table4.getString(r,0)  == "engaste")
     {
        if(table4.getString(r,3) == "direita" || table4.getString(r,3) == "esquerda")
        {
             line(xorigem+table4.getNum(r,1)*distfix,yorigem+table4.getNum(r,2)*distfix+30,xorigem+table4.getNum(r,1)*distfix,yorigem+table4.getNum(r,2)*distfix-30);
        }
       else if(table4.getString(r,3) == "cima" || table4.getString(r,3) == "baixo")
        {
             line(xorigem+table4.getNum(r,1)*distfix+30,yorigem+table4.getNum(r,2)*distfix,xorigem+table4.getNum(r,1)*distfix-30,yorigem+table4.getNum(r,2)*distfix);
        }
       
     }
     else if(table4.getString(r,0)  == "fixo")
     {
        if(table4.getString(r,3) == "direita")
        {
            
            triangle(xorigem+table4.getNum(r,1)*distfix,yorigem-table4.getNum(r,2)*distfix,
            xorigem+table4.getNum(r,1)*distfix+20,yorigem-table4.getNum(r,2)*distfix+20,
             xorigem+table4.getNum(r,1)*distfix+20,yorigem-table4.getNum(r,2)*distfix-20);
        }
       else if(table4.getString(r,3) == "esquerda")
        {
            
            triangle(xorigem+table4.getNum(r,1)*distfix,yorigem-table4.getNum(r,2)*distfix,
            xorigem+table4.getNum(r,1)*distfix-20,yorigem-table4.getNum(r,2)*distfix+20,
             xorigem+table4.getNum(r,1)*distfix-20,yorigem-table4.getNum(r,2)*distfix-20);
        }
       else if(table4.getString(r,3) == "baixo")
        {
            triangle(xorigem+table4.getNum(r,1)*distfix,yorigem-table4.getNum(r,2)*distfix,
            xorigem+table4.getNum(r,1)*distfix+20,yorigem-table4.getNum(r,2)*distfix+20,
             xorigem+table4.getNum(r,1)*distfix-20,yorigem-table4.getNum(r,2)*distfix+20);
        }
       else if(table4.getString(r,3) == "cima")
        {
            triangle(xorigem+table4.getNum(r,1)*distfix,yorigem-table4.getNum(r,2)*distfix,
            xorigem+table4.getNum(r,1)*distfix+20,yorigem-table4.getNum(r,2)*distfix-20,
             xorigem+table4.getNum(r,1)*distfix-20,yorigem-table4.getNum(r,2)*distfix-20);
        }
       
     }
     else if(table4.getString(r,0)  == "simples")
     {
        if(table4.getString(r,3) == "direita")
        {
            
            triangle(xorigem+table4.getNum(r,1)*distfix,yorigem-table4.getNum(r,2)*distfix,
            xorigem+table4.getNum(r,1)*distfix+20,yorigem-table4.getNum(r,2)*distfix+20,
             xorigem+table4.getNum(r,1)*distfix+20,yorigem-table4.getNum(r,2)*distfix-20);
            line(xorigem+table4.getNum(r,1)*distfix+30,
                 yorigem-table4.getNum(r,2)*distfix+20,
                 xorigem+table4.getNum(r,1)*distfix+30,
                 yorigem-table4.getNum(r,2)*distfix-20);
                 
        }
       else if(table4.getString(r,3) == "esquerda")
        {
            
            triangle(xorigem+table4.getNum(r,1)*distfix,yorigem-table4.getNum(r,2)*distfix,
            xorigem+table4.getNum(r,1)*distfix-20,yorigem-table4.getNum(r,2)*distfix+20,
             xorigem+table4.getNum(r,1)*distfix-20,yorigem-table4.getNum(r,2)*distfix-20);
            line(xorigem+table4.getNum(r,1)*distfix-30,
                 yorigem-table4.getNum(r,2)*distfix+20,
                 xorigem+table4.getNum(r,1)*distfix-30,
                 yorigem-table4.getNum(r,2)*distfix-20);
        }
       else if(table4.getString(r,3) == "baixo")
        {
            triangle(xorigem+table4.getNum(r,1)*distfix,yorigem-table4.getNum(r,2)*distfix,
            xorigem+table4.getNum(r,1)*distfix+20,yorigem-table4.getNum(r,2)*distfix+20,
             xorigem+table4.getNum(r,1)*distfix-20,yorigem-table4.getNum(r,2)*distfix+20);
            line( xorigem+table4.getNum(r,1)*distfix+20,
                 yorigem-table4.getNum(r,2)*distfix+30,
                 xorigem+table4.getNum(r,1)*distfix-20,
                 yorigem-table4.getNum(r,2)*distfix+30);
        
        }
       else if(table4.getString(r,3) == "cima")
        {
            triangle(xorigem+table4.getNum(r,1)*distfix,yorigem-table4.getNum(r,2)*distfix,
            xorigem+table4.getNum(r,1)*distfix+20,yorigem-table4.getNum(r,2)*distfix-20,
             xorigem+table4.getNum(r,1)*distfix-20,yorigem-table4.getNum(r,2)*distfix-20);
            line( xorigem+table4.getNum(r,1)*distfix+20,
                 yorigem-table4.getNum(r,2)*distfix-30,
                 xorigem+table4.getNum(r,1)*distfix-20,
                 yorigem-table4.getNum(r,2)*distfix-30);
        }
       
     }

  }
}
function desenhaCargas()
{
  for (let r = 0; r < table5.getRowCount(); r++)
  {
        let v0 = createVector(xorigem+table5.getNum(r,2)*distfix,
                              yorigem-table5.getNum(r,3)*distfix);
        let v1 = createVector(xorigem+table5.getNum(r,4)*distfix,
                              yorigem-table5.getNum(r,5)*distfix);
        let deltax = table5.getNum(r,4) -table5.getNum(r,2);
        let deltay = table5.getNum(r,5) - table5.getNum(r,3);
        let fixdeltax=deltax;
        let fixdeltay=deltay;
        let vec1=createVector(xorigem+
                        table5.getNum(r,2)*distfix -table5.getNum(r,0)*distfixload,
                                yorigem-
                        table5.getNum(r,3)*distfix - table5.getNum(r,1)*distfixload);
            
        let vec2=createVector(xorigem+table5.getNum(r,2)*distfix,
                                yorigem-table5.getNum(r,3)*distfix);
        let xfinal = xorigem+table5.getNum(r,4)*distfix;
        let yfinal = yorigem-table5.getNum(r,5)*distfix;
        
        while((xorigem+table5.getNum(r,2)*distfix+deltax)!=xfinal || (yorigem-table5.getNum(r,3)*distfix-deltay)!=yfinal)
        {
            
            let direc = p5.Vector.sub(vec2,vec1);
            drawSeta(vec1,direc,'blue');
            vec1=createVector(xorigem+deltax+
                        table5.getNum(r,2)*distfix -table5.getNum(r,0)*distfixload,
                                yorigem-deltay-
                        table5.getNum(r,3)*distfix - table5.getNum(r,1)*distfixload);
            
            vec2=createVector(xorigem+table5.getNum(r,2)*distfix+deltax,
                                yorigem-table5.getNum(r,3)*distfix-deltay);
            deltax = deltax+fixdeltax;
            deltay=deltay+fixdeltay;
           
       }
 
    
  }
}