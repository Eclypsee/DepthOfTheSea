//add fun tidbits of info etc "youve dived past mt everest"
//add searchlight. make it blink in and out of existence occasionally and only appear at divertickdepth >
//add images of reaper leviathan
//add parallax background
//light rays
let viewHeight = visualViewport.height;
let viewWidth = visualViewport.width;
const tick = 50;//every one hundred feet is a tick, which is 50 pixels
const maxDepthTick = tick*362.01;

let gameHeight = maxDepthTick+tick+viewHeight/2; 

let diver;
let diverSpeedY = 0;  
let diverSpeedX = 0;  
const maxSpeed = 3;

let diverDepthInTicks;  // Converts diver y position to ticks
let depth = 0;

let mx, my

let bubbles = [];

//sets up the titles for each zone
let sunlight;
let twilight;
let midnight;
let abyssal;
let trench;

//disable scrolling for aesthetics
window.addEventListener('wheel', function(e) {
    e.preventDefault();
}, { passive: false });

//setup
function setup() {
    createCanvas(viewWidth, viewHeight);
    diver = new Diver(width / 2, height / 2);
    frameRate(60);
    for (let i = 0; i < 300; i++) {
        bubbles.push(new Bubble(random(viewWidth), random(viewHeight/2, gameHeight), random(3, 12)));
    }
    sunlight = new Typewriter("SUNLIGHT ZONE(0-656ft)", 3, 40);
    twilight = new Typewriter("TWILIGHT ZONE(656-3,281ft)", 3, 40);
    midnight = new Typewriter("MIDNIGHT ZONE(3,281-13,123ft)", 3, 40);
    abyssal = new Typewriter("ABYSSAL ZONE(13,123-19,685ft)", 3, 40);
    trench = new Typewriter("THE TRENCH (19,685ft)", 3, 40);
}

//draw
function draw() {
    //sets the variables again in case of a resize
    viewHeight = visualViewport.height;
    viewWidth = visualViewport.width;
    gameHeight = maxDepthTick+tick+viewHeight/2; 
    resizeCanvas(viewWidth, viewHeight)
    background(0);

    // Adjusting the view based on the diver's position
    translate(0, -diver.y + viewHeight / 2);

    // sets the tick depth
    diverDepthInTicks = (diver.y - viewHeight / 2) / tick;

    //draw skybox and ocean
    drawOcean();
    skyBox();

    //draw bubbles
    for (let bubble of bubbles) {
        if (bubble.y > diver.y - viewHeight/2 && bubble.y < diver.y + viewHeight/2) {
            bubble.update();
            bubble.display();
        }
    }

    //title
    push();
        translate(0, -0.2*diver.y);
        drawText(width/2, viewHeight/3, "HOW DEEP IS THE OCEAN?", width/20);
        drawText(width/2, 1.2*viewHeight/3, "controls: wasd, scroll wheel", width/50);
    pop();

    //write out fun info bits
    drawText(width/2, 27.165*tick+viewHeight/2, "This is the height of the Burj Khalifa", width/50);
    drawText(width/2, 73.92*tick+viewHeight/2, "Two Titans clash", width/50);//sperm whale vs giant squid
    drawText(width/2, 115*tick+viewHeight/2, "The OceanGate Incident", width/50);
    drawText(width/2, 125*tick+viewHeight/2, "Here's the Titanic", width/50);
    drawText(width/2, 290.31*tick+viewHeight/2, "You have dived past the height of Mt Everest", width/50);
    
    //write out the names of the zones. sunlight zone floats to the top cause its too close to the next zone
    push();
        translate(width/2, 3*height/4-0.2*diver.y);
        sunlight.display();
    pop();
    writeOutZones(6, 33-15, twilight);
    writeOutZones(33, 131-15, midnight);
    writeOutZones(131, 197-15, abyssal);
    writeOutZones(197, 327, trench);
    
    //display diver and move it
    diver.display();
    diver.move();

    // Draw the ruler
    drawRuler();

    //draw the depth meter
    depth = Math.max(0, (diver.y - viewHeight / 2) * (100 / tick)).toFixed();  // Calculates depth in terms of hundreds of ft
    push();
        resetMatrix();  // Reset the transformation matrix
        drawText(width/2, 10*viewHeight/11, "Depth: "+depth+"ft", width/50);
    pop();
    
    // rect(0, gameHeight-5, width, 10); draws a rect at game height to debug
    coolCursor();

}

