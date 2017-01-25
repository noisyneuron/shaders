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

   float inc = 40.+ mx*20.;
   float size = (0.8+my*.5)*inc;

   vec2 colRef = vec2(0.);
   vec4 c;
   
   if(mod(coords.x, inc) > inc/2.) {
    colRef.x = floor(coords.x/inc) * inc;
   } else {
    colRef.x = ceil(coords.x/inc) * inc;
   }

   if(mod(coords.y, inc) > inc/2.) {
    colRef.y = floor(coords.y/inc) * inc;
   } else {
    colRef.y = ceil(coords.y/inc) * inc;
   }
 
   if(length(colRef - coords) < size) {
    c = texture2D(uSampler, colRef/dim);
   } else {
    c = vec4(0.);
   }

   


   
   gl_FragColor = c;

}