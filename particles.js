$(document).ready(function(){

    var canvas = document.querySelector("#scene"),
   ctx = canvas.getContext("2d"),
   particles = [],
   amount = 0,
   mouse = {x:0,y:0},
   radius = 1;
 
 
 var ww = canvas.width = window.innerWidth;
 var wh = canvas.height = window.innerHeight;
 
 function Particle(x,y,c){
   this.x =  Math.random()*ww;
   this.y =  Math.random()*wh;
   this.dest = {
     x : x,
     y: y
   };
   this.c = c;
   this.r =  Math.random()*3 + 2;
   this.vx = (Math.random()- 0.8)*10;
   this.vy = (Math.random()- 0.8)*10;
   this.accX = 0;
   this.accY = 0;
   
   //que tanto se dispancen al principio
   this.friction = Math.random()*0.03 + 0.94;
 
 
 }
 
 Particle.prototype.render = function() {
   this.accX = (this.dest.x - this.x)/1200;
   this.accY = (this.dest.y - this.y)/1200;
   this.vx += this.accX;
   this.vy += this.accY;
   this.vx *= this.friction;
   this.vy *= this.friction;
 
   this.x += this.vx;
   this.y +=  this.vy;
 
   ctx.fillStyle = this.c;
   ctx.beginPath();
   ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
   ctx.fill();
 
   var a = this.x - mouse.x;
   var b = this.y - mouse.y;


 //que tanto se alejan 
   var distance = Math.sqrt( a*a + b*b );
   if(distance<(radius*90)){
     this.accX = (this.x - mouse.x)/70;
     this.accY = (this.y - mouse.y)/70;
     this.vx += this.accX;
     this.vy += this.accY;
   }
 
 }
 
 function onMouseMove(e){
   mouse.x = e.clientX;
   mouse.y = e.clientY;
 }
 
 function onTouchMove(e){
   if(e.touches.length > 0 ){
     mouse.x = e.touches[0].clientX;
     mouse.y = e.touches[0].clientY;
   }
 }
 
 function onTouchEnd(e){
 mouse.x = -9999;
 mouse.y = -9999;
 }

 ctx.fillStyle = "#FFFFFF";
 ctx.fillRect(0, 0, ww, wh);
 
   var img = new Image();
   img.src = "images/Logo1.png";
   img.crossOrigin = "Anonymous";
 
   
 function initScene(){
 
   ww = canvas.width = window.innerWidth;
   wh = canvas.height = window.innerHeight;
         var wrh = img.width / img.height;
         var newWidth = canvas.width;
         var newHeight = newWidth / wrh;
         if (newHeight > canvas.height) {
                     newHeight = canvas.height;
             newWidth = newHeight * wrh;
           }
         var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
         var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;
 
   ctx.clearRect(0, 0, ww, wh);
   
 
   ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);
 var idata = ctx.getImageData(0, 0,  ww, wh);
   var data  = ctx.getImageData(0, 0,  ww, wh).data;
 //  ctx.clearRect(0, 0,  ww, wh);
   ctx.globalCompositeOperation = "screen";
 
   particles = [];
 
   for(var i=0;i<ww;i+=Math.round(ww/150)){
     for(var j=0;j<wh;j+=Math.round(ww/150)){
       var o = i * 4 + j * 4 * idata.width;
       if(data[ ((i + j*ww)*4) + 3] > 150){
 
                 var c = 'rgba(' + data[o] + ',' + data[o + 1] + ',' + data[o + 2] + ',' + data[o + 3] + ')';
 
         particles.push(new Particle(i,j,c));
 
       }
     }
   }
   amount = particles.length;
 
 }
 
 
 
 function render(a) {
   requestAnimationFrame(render);
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   for (var i = 0; i < amount; i++) {
     particles[i].render();
   }
   
 };
 
 window.addEventListener("resize", initScene);
 window.addEventListener("mousemove", onMouseMove);
 window.addEventListener("touchmove", onTouchMove);
 window.addEventListener("touchend", onTouchEnd);
   setTimeout(function (){
     initScene();
   requestAnimationFrame(render);
 
 }, 1000);                
 
 // 
   });
 