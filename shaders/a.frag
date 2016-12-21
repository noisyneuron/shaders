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

   if(mod(coords.y, 100.) > 40.) {
      float y = uv.x + (sin(uv.y*80.) + 1.)/((sin(time*10.*r2)+1.)*30.);
      y = y > 1.0 ? fract(y) : y;
      c = texture2D(uSampler, vec2(y, uv.y));
   } else {
      float y = uv.x - (cos(uv.y*100.) + 1.)/((sin(time*12.6*r1)+1.)*100.);
      // y = y > 1.0 ? fract(y) : y;
      c = texture2D(uSampler, vec2(y, uv.y));
   }

   if(mod(coords.y, 4.) > 2.) {
      c = vec4(0.,0.,0.,.8);
   }
   // vec4 nc = vec4(abs(1.-c.r), abs(1.-c.g), abs(1.-c.b), 1.);

   gl_FragColor = c;

}