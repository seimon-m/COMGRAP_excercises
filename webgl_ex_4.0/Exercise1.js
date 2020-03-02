//
// Computer Graphics
//
// WebGL Exercises

// Register function to call after document has loaded
window.onload = startup;

// the gl object is saved globally
var gl;
var globalAngle = 0;
var wiredCube;


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
    wiredCube = new WireFrameCube(gl,[1.0, 1.0, 1.0, 0.5]);
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
    gl.clearColor(0.8, 0.8, 0.8, 1);
}

/**
 * Setup all the attribute and uniform variables
 */
function setupAttributesAndUniforms() {
    "use strict";
    ctx.aVertexPositionId = gl.getAttribLocation(ctx.shaderProgram, "aVertexPosition");
    ctx.aColorId = gl.getAttribLocation(ctx.shaderProgram, "aColor");
    ctx.uProjectionMatId = gl.getUniformLocation(ctx.shaderProgram, "uProjectionMat");
    ctx.uModelMatId = gl.getUniformLocation(ctx.shaderProgram, "uModelMat");
}

// we keep all the parameters for drawing aspecific object together
var rectangleObject = {
    colorBuffer: -1
};

function setupBuffers() {

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

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set up the camera position
    var modelViewMat = mat4.create();
    mat4.lookAt(modelViewMat, [0, 0, 0, 0], ctx.aVertexPositionId, [0, 1, 0, 1]);
    gl.uniformMatrix4fv(ctx.uModelMatId, false, modelViewMat);


    // Set up the projection
    var projectionMat = mat4.create();
    mat4.ortho(projectionMat, -400, 400, -300, 300, 5, 100);
    gl.uniformMatrix4fv(ctx.uProjectionMatId, false, projectionMat);

    wiredCube.draw(gl, ctx.aVertexPositionId, ctx.aColorId);
}

function drawAnimated() {
    if (globalAngle >= 2 * Math.PI) {
        globalAngle = 0;
    } else {
        globalAngle +=  0.1;
    }

    console.log(globalAngle);
    draw();
    window.requestAnimationFrame(drawAnimated);
}