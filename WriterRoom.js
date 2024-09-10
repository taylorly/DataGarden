
/* This was the Module 5 template for Random Circles
 but I deleted that code and started to work my own and
 work with the code from my 'data drawing' sketch. The only
 code I kept is my reworked data set and replace code.
 
 This is the line graph code.
 
 */
let table;
let yPoints = [];
let xPoints, notes;
let font;

function preload() {
  table = loadTable("data/FinalWriterData.csv", "csv", "header"); /* replace with your file */
  font = loadFont("data/LeagueScriptNumberOne.otf"); /* for some reason the font is not loading and is disrupting the entire sketch */
}

function setup() {
  canvasDiv = document.getElementById("mySketch");
  let canvas = createCanvas(canvasDiv.offsetWidth, windowHeight/1.2);
  canvas.parent("mySketch");
  totalRows = table.getRowCount();
}



function draw() {
  background(152, 165, 210);
  
  fill(222, 223, 218);
  noStroke();
  //textFont(font);
  textAlign(CENTER);
  textFont(font);
  textSize(20);
  text("A Writer's Room", width/ 2, 50); /* title of viz */


  for (let i = 0; i < totalRows; i++) {

    xPoints = table.getString(i, "Day");  /* this x axis data was taken over a fourteen day time frame */
    console.log(xPoints);
    yPoints[i] = table.getNum(i, "Word"); /* y axis data representing the words I hand counting each day */
    notes = table.getString(i, "Location");


    let xPos = width/(2*totalRows)+i*(width/totalRows);
    let prevxPos = width/(2*totalRows)+(i-1)*(width/totalRows)

    let yBase = height - 200;           /*changes the line along with x axis, moves up and down canvas */
    let yPos = yBase - yPoints[i]/100;
    let prevyPos = yBase - yPoints[i-1]/100;

    noStroke();
    text(xPoints, xPos, yBase + 100); /* changes the position of the line 'yBase' with math by adding 100 */
    stroke(222, 223, 218); /* color of the trend line */
    strokeWeight(10); 
    point(xPos, yBase-yPoints/100);
    strokeWeight(5);
    line(prevxPos, prevyPos, xPos, yPos); /* this is the line */

    if (dist(mouseX, mouseY, xPos, yPos) < 15) {
      push();
      drawFlower(xPos, yPos, yPoints[i] / 8);
      hoverObject(mouseX-20, mouseY, yPoints[i]);
      fill("#000000");
      textSize(12); /* i honestly have no idea what this does and i have tried changing this to see c */
      pop();
    }
  }

}

function hoverObject(x, y, hoverData) {
  push();
  noStroke();
  colorMode(RGB);
  fill(4, 105, 215);
  //circle(x, y-50, 100); /* this is the circle but I replaced it with the flower*/
  fill(222, 223, 218);
  text(hoverData, x, y-50);
  text(notes, x, y-25);
  pop();
}

function drawFlower(flowerX, flowerY, flowerSize) {
  push();
  let x = [];
  let y = [];
  let pts = 100;
  let r = 100; /* radius of tthe flower that determines how big the flower is */
  let f_radius = [];
  let f_amp = 20; /* controls petal shape */
  let period = 7;
  let rotate = 0;
  angleMode(DEGREES);
  translate(flowerX, flowerY);
  noStroke();
  fill(208, 46, 70); /* color of flower */
  beginShape();
  for (let i = 0; i < pts; i++) {
    let angle = (i / pts) * 360;
    f_radius = f_amp* cos(angle * period);
    x[i] = (flowerSize + f_radius) * cos(angle + rotate);
    y[i] = (flowerSize + f_radius) * sin(angle + rotate);
    vertex(x[i], y[i]);
  }
  endShape(CLOSE);
  rotate += 1;
  pop();
}
