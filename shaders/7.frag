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
   vec4 c = texture2D(uSampler, uv);

   float modder = 4. + (mousex*6.);

   if(mod(coords.x, 2.*modder) > modder) {
      vec2 np = vec2(uv.x, 1.-uv.y);
      c = texture2D(uSampler, np);
   }

   

   gl_FragColor = c;

}