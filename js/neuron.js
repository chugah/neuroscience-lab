window.onload = function() {
   var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      cw, ch;

   var pi = Math.PI;
   var mouse = {
      x: 0,
      y: 0
   }

   var P = [];

   var point = function(x, y, vx, vy, forceX, forceY, r,color) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.forceX = forceX;
      this.forceY = forceY;
      this.r = r;
      this.color=color;
   }

   function canvasSize() {
      // canvas.width = cw = window.innerWidth;
      // canvas.height = ch = window.innerHeight;
      canvas.width = cw = 970;
      canvas.height = ch = 300;
   }

   function split(i) {
      var p = P[i];
      var splitNumber = Math.round(40 * Math.random()) + 5;
      var vx, vy, forceX, forceY, r;

      var color;
      var rand=Math.random();
      if(rand<.5){
          //color="rgba(0,200,255,.2)";
          color="rgba(210, 38, 48, .2)";
      }else{
         //color="rgba(150,150,255,.2)";
         color="rgba(0, 46, 93, .2)";
      }
            
      for (var splits = 0; splits < splitNumber; splits++) {
         vx = 4 * Math.random() - 2;
         vy = 4 * Math.random() - 2;
         forceX = .02 * Math.random() - .01;
         forceY = .02 * Math.random() - .01;
         r=.7*p.r;

         P.push(new point(p.x, p.y, vx, vy, forceX, forceY, r,color));
      }

      P.splice(i, 1);

   }

   var friction=.995;
   function update(p) {
      p.x += p.vx;
      p.y += p.vy;

      p.vx += p.forceX;
      p.vy += p.forceY;

      p.vx*=friction;
      p.vy*=friction;
      
      p.r *= .995;
   }

   function outside(p) {
      if (
         p.x > cw ||
         p.x < 0 ||
         p.y > ch ||
         p.y < 0
      ) return true;

      return false;
   }

   function draw() {
      var p;
      
      for (var i = 0; i < P.length; i++) {
         p=P[i];
         if (p.r < .6 || outside(p)) {
            P.splice(i, 1);
         }
      }
      
      for (var i = 0; i < P.length; i++) {
         p = P[i];

         update(p);

         ctx.fillStyle = p.color;
         ctx.beginPath();
         ctx.arc(p.x, p.y, p.r, 0, 2 * pi);
         ctx.fill();

         if (Math.random() < .0015 && P.length<3000) {
            split(i);
         }

         
      }

      window.requestAnimationFrame(draw);
   }

   function init() {
      P = [];
      canvasSize();
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, cw, ch);      
   }

   window.onmousemove = function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
   }

   window.onresize = function() {
      P = [];
      init();
   };

   window.onclick = function(e) {
      var x = e.clientX;
      var y = e.clientY;

      P.push(new point(x, y, 0, 0, 0, 0, 3 * Math.random() + 2));
      split(P.length - 1);
   }

   window.oncontextmenu = function(e) {      
      init();

      return false;
   }

   init();
   P.push(new point(cw / 2, ch / 2, 0, 0, 0, 0, 5,"rgba(255,255,0,.1)"));
      split(P.length - 1);
   draw();
}