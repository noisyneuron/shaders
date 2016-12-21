// circle-y bounce
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

float rand(vec2 co){
   return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void)
{
   vec2 uv = vTextureCoord.xy;
   float mx = mousex;
   float my = mousey;
   float time = u_time;
   float r1 = random1;
   float r2 = random2;
   float r3 = random3;

   float r = rand(uv);
   vec2 pix_s = 1. / dim;
   vec2 np = uv;
   float mult = 50.+((1.-mx)*250.);

   if(r < 0.125) {
      np.x += mult * pix_s.x;
   } else if (r < .25) {
      np.x -= mult * pix_s.x;
   } else if (r < .375) {
      np.y += mult * pix_s.y;
   } else if (r < .5) {
      np.y -= mult * pix_s.y;
   } else if (r < .625) {
      np.x += mult * pix_s.x;
      np.y -= mult * pix_s.y;
   } else if (r < .75) {
      np.x -= mult * pix_s.x;
      np.y += mult * pix_s.y;
   } else if (r < .875) {
      np.x += mult * pix_s.x;
      np.y += mult * pix_s.y;
   } else  {
      np.x -= mult * pix_s.x;
      np.y -= mult * pix_s.y;
   }

   vec4 fg = texture2D(uSampler, np);


   gl_FragColor = fg;

}