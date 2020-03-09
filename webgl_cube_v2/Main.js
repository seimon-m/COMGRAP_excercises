//
// Computer Graphics
//
// WebGL Exercises



// the gl object is saved globally
var gl;
var globalAngle = 0;
var wireFrameCube;

// Register function to call after document has loaded
window.onload = startup;

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
    wireFrameCube = new WireFrameCube(gl);
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
    gl.clearColor(0.1, 0.1, 0.1, 1);
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

/**
 * Draw the scene.
 */
function draw() {
    "use strict";
    console.log("Drawing");
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Set up the camera position | view * model = modelView
    var modelViewMat = mat4.create();
    mat4.lookAt(modelViewMat, [0, -5, 0], [0, 0, 0], [0, 0, 1]);
    mat4.rotate(modelViewMat,  // destination matrix
        modelViewMat,  // matrix to rotate
        globalAngle,     // amount to rotate in radians
        [0.2, 0.6, 1]);
    gl.uniformMatrix4fv(ctx.uModelMatId, false, modelViewMat);


    // Set up the projection of the object
    var projectionMat = mat4.create();
    //mat4.ortho(projectionMat, -1, 1, -1, 1, 0.1, 100);
    mat4.perspective(projectionMat, 45 * Math.PI / 180, 800 / 600, 0.1, 100);
    gl.uniformMatrix4fv(ctx.uProjectionMatId, false, projectionMat);

    wireFrameCube.draw(gl, ctx.aVertexPositionId, ctx.aColorId);
}

function drawAnimated() {
    if (globalAngle >= 2 * Math.PI) {
        globalAngle = 0;
    } else {
        globalAngle += 0.05;
    }

    console.log(globalAngle);
    draw();
    window.requestAnimationFrame(drawAnimated);
}