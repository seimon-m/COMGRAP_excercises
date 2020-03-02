/**
 *
 * Define a wire frame cube with methods for drawing it.
 *
 * @param gl the webgl context
 * @param color the color of the cube
 * @returns object with draw method
 * @constructor
 */

function WireFrameCube(gl, color) {
    function defineVertices(gl) { // define the vertices of the cube

        var vertices = [
            0, 0, 0,
            1, 0, 0,
            1, 1, 0
        ];
        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return vertexBuffer;
    }

    function defineEdges(gl) { // define the edges for the cube , there are 12 edges in a cube

        var vertexIndices = [
            0, 1,
            1, 2,
            0, 2
        ];

        var edgeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        return edgeBuffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferEdges: defineEdges(gl),
        color: color,
        draw: function (gl, aVertexPositionId, aVertexColorId) {
            //TODO
        }
    }
}