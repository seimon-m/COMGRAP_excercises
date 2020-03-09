attribute vec3 aVertexPosition;
varying vec4 vColor;
attribute vec4 aColor;
uniform mat4 uProjectionMat;
uniform mat4 uModelMat;

void main() {
    gl_Position = uProjectionMat * uModelMat * vec4(aVertexPosition, 1);
    vColor = aColor;
}