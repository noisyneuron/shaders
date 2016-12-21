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

   vec4 c = texture2D(uSampler, uv);
   
   if(c.g > 0.7) {
      float y = uv.y + (sin(uv.x*80.) + 1.)/2.;
      // y = y > 1.0 ? fract(y) : y;
      c = texture2D(uSampler, vec2(uv.x, y));
   }

   // if(c.r > 0.9) {
   //    c = vec4(1.);
   // }

   gl_FragColor = c;

}