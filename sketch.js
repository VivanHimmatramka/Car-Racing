var bouncyBall;
var database , position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();
    
    bouncyBall = createSprite(250,250,10,10);
    bouncyBall.shapeColor = "red";

    var bouncyBallPosition = database.ref('ball/position');
    bouncyBallPosition.on("value",readPosition, showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){

    database.ref('ball/position').set({
        'x': position.x+x,
        'y': position.y+y
    })


    // bouncyBall.x = bouncyBall.x + x;
    // bouncyBall.y = bouncyBall.y + y;
}


function readPosition(data){
position = data.val();
bouncyBall.x= position.x
bouncyBall.y= position.y
}


function showError(){
    consolee.log("cannot write into database")
}