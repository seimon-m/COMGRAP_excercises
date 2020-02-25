attribute vec2 aVertexPosition;
varying vec4 vColor;
attribute vec4 aColor;

void main() {
    gl_Position = vec4(aVertexPosition, 0, 1);
    vColor = aColor;
}