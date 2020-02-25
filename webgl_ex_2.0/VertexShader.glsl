attribute vec2 aVertexPosition;
attribute vec2 aVertexTextureCoord ;
varying vec2 vTextureCoord;

void main() {
    gl_Position = vec4(aVertexPosition, 0, 1);
    vTextureCoord = aVertexTextureCoord;
}