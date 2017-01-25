// invert colors
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float u_time;
uniform float mousex;
uniform float mousey;
uniform float random1;
uniform float random2;
uniform float random3;
uniform vec2 dim;

void main(void)
{
   vec2 uv = vTextureCoord.xy;
   float mx = mousex;
   float my = mousey;
   float time = u_time;
   float r1 = random1;
   float r2 = random2;
   float r3 = random3;
   vec2 coords = uv * dim;
   vec2 pix_s = 1. / dim;

   vec2 inc = vec2(30. + mx*30., 30. + my*30.);
   float size = 30.;

   vec2 colRef = vec2(0.);

   if(mod(coords.x, size) > inc.x) {
    colRef.x = floor(coords.x/inc.x) * inc.x;
   } else {
    colRef.x = ceil(coords.x/inc.x) * inc.x;
   }

   if(mod(coords.y, size) > inc.y/2.) {
    colRef.y = floor(coords.y/inc.y) * inc.y;
   } else {
    colRef.y = ceil(coords.y/inc.y) * inc.y;
   }

   vec4 c;

   if(length(colRef - coords) < size) {
    c = texture2D(uSampler, colRef/dim);
   } else {
    c = vec4(0.);
   }

   // c = texture2D(uSampler, colRef/dim);

   
   gl_FragColor = c;

}