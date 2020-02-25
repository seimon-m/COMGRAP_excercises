//
// Computer Graphics
//
// WebGL Exercises
//

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;
var collisionP1 = false;

// we keep all local parameters for the program in a single object with the name ctx (for context)
var ctx = {
    shaderProgram: -1,
    aVertexPositionId: -1,
    uColorId: -1,
    uProjectionMatId: -1,
    uModelMatId: -1
};

/**
 * Startup function to be called when the body is loaded
 */
function startup() {
    "use strict";
    var canvas = document.getElementById("myCanvas");
    gl = createGLContext(canvas);
    initGL();
    draw();
    window.requestAnimationFrame(drawAnimated);
}

/**
 * InitGL should contain the functionality that needs to be executed only once
 */
function initGL() {
    "use strict";
    ctx.shaderProgram = loadAndCompileShaders(gl, 'VertexShader.glsl', 'FragmentShader.glsl');
    setupAttributesAndUniforms();
    setupBuffers();

    // set the clear color here
    gl.clearColor(0.1, 0.1, 0.1, 1);

    // add more necessary commands here
}

/**
 * Setup all the attribute and uniform variables
 */
function setupAttributesAndUniforms() {
    "use strict";
    // finds the index of the variable in the program
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelMat");
}


// we keep all the parameters for drawing aspecific object together
var rectangleObject = {
    coordinateBuffer: -1,
    colorBuffer: -1
};

/**
 * Setup the buffers to use. If more objects are needed this should be split into one file per object.
 */
function setupBuffers() {
    "use strict";
    rectangleObject.coordinateBuffer = gl.createBuffer();
    var vertices = [
        -0.5, -0.5,
        -0.5, 0.5,
        0.5, 0.5,
        0.5, -0.5
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.coordinateBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    rectangleObject.colorBuffer = gl.createBuffer();
    var colors = [
        1, 0, 0.4, 1,
        0.1, 0.2, 0.3, 1,
        0.3, 0.4, 0.5, 1,
        0.3, 1, 0.1, 1
    ];

    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}


var game = {
    ball: {
        posX: 200,
        posY: -100,
        velocityX: 1,
        velocityY: 1,
        size: 10
    },
    paddle1: {
        y: 0,
        width: 10,
        height: 60,
        velocity: 1,
        lives: 3
    },
    paddle2: {
        y: 0,
        width: 10,
        height: 60,
        velocity: 1,
        lives: 3
    }
}

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Koordinaten übergeben
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.coordinateBuffer);
    gl.vertexAttribPointer(ctx.aVertexPositionId, 2, gl.FLOAT, false, 0, 0); /* gl.vertexAttribPointer(ID, ??, datentyp, ??, stride in bytes, offset in bytes); */
    gl.enableVertexAttribArray(ctx.aVertexPositionId);

    // Farben übergeben
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleObject.colorBuffer);
    gl.vertexAttribPointer(ctx.aColorId, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ctx.aColorId);

    //gl.uniform4f(ctx.uColorId , 1.0, 2.0, 0.0, 1.0);

    // Set up the world coordinates
    var projectionMat = mat3.create();
    mat3.fromScaling(projectionMat, [2.0 / gl.drawingBufferWidth, 2.0 / gl.drawingBufferHeight]);
    gl.uniformMatrix3fv(ctx.uProjectionMatId, false, projectionMat);

    drawPaddles();
    drawLine();
    drawBall();
}

function drawPaddles() {
    var modelMat = mat3.create();
    mat3.fromTranslation(modelMat, [370, game.paddle1.y]);
    mat3.scale(modelMat, modelMat, [game.paddle1.width, game.paddle1.height]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    var modelMat = mat3.create();
    mat3.fromTranslation(modelMat, [-370, game.paddle2.y]);
    mat3.scale(modelMat, modelMat, [game.paddle2.width, game.paddle2.height]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function drawLine() {
    var modelMat = mat3.create();
    mat3.scale(modelMat, modelMat, [3, 600]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function drawBall() {
    var modelMat = mat3.create();
    mat3.fromTranslation(modelMat, [game.ball.posX, game.ball.posY]);
    mat3.scale(modelMat, modelMat, [game.ball.size, game.ball.size]);
    gl.uniformMatrix3fv(ctx.uModelMatId, false, modelMat);

    if (game.ball.posX >= 370 && game.ball.posY >= game.paddle1.y-30 && game.ball.posY <= game.paddle1.y+30 && game.ball.posY <= gl.drawingBufferHeight && game.ball.posY >= -200) {
        collisionP1 = true;
    }
    if (collisionP1) {
        game.ball.posX -= game.ball.velocityX;
        game.ball.posY += game.ball.velocityY;
    } else {
        game.ball.posX += game.ball.velocityX;
        game.ball.posY += game.ball.velocityY;
    }



    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}

function drawAnimated(timeStamp) {
    // calculate time since last call
    // move or change objects
    draw();
    // request the next frame
    window.requestAnimationFrame(drawAnimated);
}

/*
// Key Handling
var key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

function isDown(keyCode) {
    return key._pressed[keyCode];
}

function onKeydown(event) {
    key._pressed[event.keyCode] = true;
}

function onKeyup(event) {
    delete key._pressed[event.keyCode ];
}

 */

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    // paddle 1
    if (keyName === 'ArrowUp') {
        //alert(`Key pressed ${keyName}`);
        game.paddle1.y += 20;
    }
    if (keyName === 'ArrowDown') {
        //alert(`Key pressed ${keyName}`);
        game.paddle1.y -= 20;
    }

    // paddle 2
    if (keyName === 'w') {
        //alert(`Key pressed ${keyName}`);
        game.paddle2.y += 20;
    }
    if (keyName === 's') {
        //alert(`Key pressed ${keyName}`);
        game.paddle2.y -= 20;
    }

}, false);

