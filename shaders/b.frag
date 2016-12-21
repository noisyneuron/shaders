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
   vec4 c1 = texture2D(uSampler, vec2(uv.x-pix_s.x, uv.y));
   vec4 c2 = texture2D(uSampler, vec2(uv.x, uv.y-pix_s.y));

   if((abs(c1.r-c.r) + abs(c1.g-c.g) + abs(c1.b-c.b) > 0.03) || (abs(c2.r-c.r) + abs(c2.g-c.g) + abs(c2.b-c.b) > 0.03)) {
      c = vec4(0.,0.,0.,1.);
   }

   // vec3 np = vec3((1.-uv.x), (sin(uv.x)+1.)/2., 1.);
   // np = cross(vec3(uv.x,uv.y,1.), np);
   // c = texture2D(uSampler, np.xy);

   gl_FragColor = c;

}