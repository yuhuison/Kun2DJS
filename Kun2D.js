var Kun2D = Kun2D ||{};
let app;
let thisScene = null;
let Kun2DHandler;
let Kun2DPhysics;
Kun2D.setup = function(options){
    app = new PIXI.Application({width:options.width,height:options.height});
    app.renderer.backgroundColor = 0xF08080;
    Kun2D.view=app.view;
    _Kun2D_HandleTextStyleToThePixi('name = 孤狼; Fuck = sss;');
};
Kun2D.Director=function(){
    this.task=null;
    Kun2DHandler=new Object();
    Kun2DHandler.tweens=new Array();
    Kun2DHandler.handle=function(){
        for(i in Kun2DHandler.tweens){
            if(Kun2DHandler.tweens[i].handle()){
                Kun2DHandler.tweens.splice(i,1);
            }
        }
    };
    setInterval("Kun2DHandler.handle();",20);
    this.goScene=function(kunScene){
        if(thisScene!=null){
            app.stage.removeChild(thisScene.pixi);
            thisScene.tw=Kun2DHandler.tweens;
            app.stage.addChild(kunScene.pixi);
            Kun2DHandler.tweens=kunScene.tw;
            thisScene=kunScene;
        }else{
            app.stage.addChild(kunScene.pixi);
            thisScene=kunScene;
        }
    };
    this.loadImage=function(url){
        this.task=PIXI.loader.add(url);
        return this;
    };
    this.add=function(url){
        this.task=this.task.add(url);
        return this;
    };
    this.onloaded=function(p){
        this.task.load(p);
    };
};
Kun2D.Scene=function(){
    this.pixi=new PIXI.Container();
    this.tw=new Array();
    this.addKun=function(kun){
        this.pixi.addChild(kun.pixi);
    };
};
Kun2D.containerKun=function() {
    this.pixi=new PIXI.Container();
    this.addKun=function(kun){
        this.pixi.addChild(kun.pixi);
    };
};


Kun2D.basickun=function(){

}

Kun2D.imageKun=function(ximgname){
    this.has_set = 0;
    this.tweens=new Array();
    this.setImage=function(imgname){
        if(this.has_set==0){
            this.pixi= new PIXI.Sprite(PIXI.loader.resources[imgname].texture);
        }else{
            this.pixi.texture=PIXI.loader.resources[imgname].texture;
        }
        return this;
    };
    if(ximgname!=undefined){
        this.setImage(ximgname);
    }
    this.moveTo=function(x,y){
        this.tx=x;
        this.ty=y;
        this.pixi.x=Math.ceil(x);
        this.pixi.y=Math.ceil(y);
        return this;
    };
    this.tween=function(t){
        t.setup(this);
        Kun2DHandler.tweens.push(t);
        return this;
        //console.log(Kun2DHandler.tweens);
    }
    this.mod=function(t){
        t.setup(this);
        return this;
    }
    this.join=function(s){
        if(s!=undefined){
            s.addKun(this);
        }else{
            if(thisScene!=null){
                thisScene.addKun(this);
            }
        }
    }
};

Kun2D.textKun=function(){
    this.has_set=0;
    this.setText=function(text){
        if(this.has_set==0){
            this.pixi=new PIXI.Text(text);
            this.has_set=1;
        }else{
            this.pixi.text=text;
        }
        return this;
    };
    this.setStyle=function(style){
      this.style=new PIXI.TextStyle(style);
      this.pixi.style=this.style;
      return this;
    }
    this.setStylebyText=function(text){
        this.setStyle(_Kun2D_HandleTextStyleToThePixi(text));
        return this;
    }
    this.setStyleByCopy=function(copykun){
        this.style=copykun.style;
        return this;
    }
    this.moveTo=function(x,y){
        
        this.pixi.x=Math.ceil(x);
        this.pixi.y=Math.ceil(y);
        return this;
    }
    this.tween=function(t){
        t.setup(this);
        Kun2DHandler.tweens.push(t);
        return this;
    }
    this.join=function(s){
        if(s!=undefined){
            s.addKun(this);
        }else{
            if(thisScene!=null){
                thisScene.addKun(this);
            }
        }
    }
};
Kun2D.graphicsKun=function(){
    this.pixi = new PIXI.Graphics();
    this.clear=function(){
        this.pixi.clear();
        return this;
    }
    this.fill=function(color,alpha){
        this.pixi.beginFill(color,alpha);
        return this;
    }
    this.drawRect=function(x,y,width,height){
        this.pixi.drawRect(x,y,width,height);
        return this;
    }
    this.drawCircle=function(x,y,r){
        this.pixi.drawCircle(x,y,r);
        return this;
    }
    this.drawRoundedRect=function(x,y,width,height,radius){
        this.pixi.drawRoundedRect(x,y,width,height,radius);
        return this;
    }
    this.moveTo=function(x,y){
        this.tx=x;
        this.ty=y;
        this.pixi.x=Math.round(x);
        this.pixi.y=Math.round(y);
        return this;
    }
    this.endDraw=function(){
        this.pixi.endFill();
        return this;
    }
    this.tween=function(t){
        t.setup(this);
        Kun2DHandler.tweens.push(t);
        return this;
    }
    this.join=function(s){
        if(s!=undefined){
            s.addKun(this);
        }else{
            if(thisScene!=null){
                thisScene.addKun(this);
            }
        }
    }
}
Kun2D.videoKun=function(){
    this.setVideo=function(url){
        this.texture=PIXI.Texture.fromVideoUrl(url);
        this.source=this.texture.baseTexture.source;
        this.texture.baseTexture.autoPlay=false;
        this.pixi=new PIXI.Sprite(this.texture);
        return this;
    }
    this.pause=function(){
        this.texture.baseTexture.source.pause();
        return this;
    }
    this.play=function(){
        this.texture.baseTexture.source.play();
        return this;
    }
    this.volume=function(i){
        this.texture.baseTexture.source.volume=i;
        return this;
    }
    this.goTime=function(i){
        this.texture.baseTexture.source.currentTime=i;
        return this;
    }
    this.setRate=function(i){
        this.texture.baseTexture.source.playbackRate=i;
        return this;
    }
    this.join=function(s){
        if(s!=undefined){
            s.addKun(this);
        }else{
            if(thisScene!=null){
                thisScene.addKun(this);
            }
        }
    }
}


Kun2D.keyboard=function(keyCode){
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event){
        if (event.keyCode === key.code) {
            if (key.isUp && key.press){key.press();
            key.isDown = true;
            key.isUp = false;
            }
          }
          event.preventDefault();
    };
  
    //The `upHandler`
    key.upHandler = function(event){
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
          }
          event.preventDefault();
    };
  
    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }
//KUN2DMOD_渐变模块  
Kun2D.tweens=new Object();
Kun2D.tweens.movingTo=function(intime,to_x,to_y,easing = 'linear'){
      this.intime=intime;
      this.t=Math.round(intime/20);
      this.n=0;
      if(_Kun2D_EasingFunctions[easing]==undefined){
          easing='linear';
          console.log('渐变动画 '+easing+'为未支持类型');
      }
      this.fun = _Kun2D_EasingFunctions[easing];
    this.setup=function(kun){
          this.mkun=kun;
          this.alive=true;
          this.rx=kun.pixi.x;
          this.ry=kun.pixi.y;
    }
    this.handle=function(){
        if(this.alive){
        if(this.n<this.t){
            this.mkun.tx=this.rx+(to_x-this.rx)*this.fun(this.n/this.t);
            this.mkun.ty=this.ry+(to_y-this.ry)*this.fun(this.n/this.t);
            this.mkun.pixi.x=Math.round(this.mkun.tx);
            this.mkun.pixi.y=Math.round(this.mkun.ty);
            this.n++;
            //console.log(this.mx);
            return false;
        }else{
            this.mkun.tx=to_x;
            this.mkun.ty=to_y;
            this.mkun.pixi.x=Math.round(this.mkun.tx);
            this.mkun.pixi.y=Math.round(this.mkun.ty);
            return true;
        }
     }
    }
    
}
Kun2D.tweens.alphaChanging= function(intime,omegaA,toA){

}
Kun2D.tweens.sparkleing=function(HZ){
    this.f=HZ;
    this.n=0;
    this.setup=function(kun){
        this.mkun=kun;
    }
    this.handle=function(){
        this.n++;
        if(this.n==this.f){
            this.n=0;
            this.mkun.pixi.visible=!(this.mkun.pixi.visible);
        }
        return false;
    }
}
Kun2D.tweens._UIMDesign_resizeingGcircle = function(x,y,fillcolor,alpha,omegaR,speed,maxR){
    this.r=omegaR;
    this.f=true;
    this.setup=function(kun){
        this.mkun=kun;
    }
    this.handle=function(){
        if(this.f){
         this.mkun.r=this.r;

           if(this.r*2<maxR && (maxR!=-1)){ 
              this.r=this.r+speed*2;
               }else{
              this.r=this.r+speed;
             }
          if(this.r<0){
            this.r=0;
          }
          this.mkun.clear();
          this.mkun.fill(fillcolor,alpha);
          this.mkun.drawCircle(x,y,this.r);
          this.mkun.endDraw();
          //console.log(this.r,maxR);
          if((this.r>maxR) && (maxR!=-1)){
              speed=0-speed;
         }
          if(this.r==0){
            return true;
           }
           return false;
          }else{
            return true;
        }
    }
    this.stop=function(){
        this.f=false;
    }
}
Kun2D.mods=new Object();
Kun2D.mods._physicsMod=new Object();
//Kun2DMOD_物理模块
Kun2DPhysics=Kun2D.mods._physicsMod;
Kun2DPhysics.enable=function(){
    setInterval("Kun2D.Physics.handle()",10);
}
Kun2DPhysics.handle=function(){
    for(i in Kun2DPhysics.mods){
        if(Kun2DPhysics.mods[i].handle()){
            Kun2DPhysics.mods.splice(i,1);
        }
    }
}
Kun2DPhysics.mods=new Array();
Kun2D.mods.physicsMod=function(){
    this.setup=function(kun){
        this.mkun=kun;
        kun.physicsMod=new Object();
        kun.physicsMod.vx=0;
        kun.physicsMod.vy=0;
        Kun2DPhysics.mods.push(this);
    }
    this.handle=function(){
        this.mkun.tx=this.mkun.tx+this.mkun.physicsMod.vx;
        this.mkun.ty=this.mkun.ty+this.mkun.physicsMod.vy;
        //console.log(this.mkun.tx);
        this.mkun.pixi.x=Math.round(this.mkun.tx);
        this.mkun.pixi.y=Math.round(this.mkun.ty);
        return false;
    }
}
Kun2D.Physics=Kun2DPhysics;

function _Kun2D_HandleTextStyleToThePixi(KStyle){
    var srr=KStyle.split(";");
    var o = new Object();
    for(var c of srr){
        var srr2=c.split("=");
        if(srr2.length==2){
            srr2[0]=srr2[0].replace(/\s+/g,""); 
            srr2[1]=srr2[1].replace(/\s+/g,""); 
            o[srr2[0]]=srr2[1];
        }
    }
    console.log(o);
    return o;
}
Kun2D.UIs=new Object();
Kun2D.UIs.MDesign=new Object();
Kun2D.UIs.MDesign.button=function(){
    this.create=function(x = 0,y = 0,text = 'kun2D',fontsize = 15,backgroundColor = 0xF08080,fillc = 0xFFFFFF){
        this.bgkun=new Kun2D.graphicsKun();
        this.ttkun=new Kun2D.textKun();
        this.maskkun=new Kun2D.graphicsKun();
        this.ttkun.setText(text);
        this.ttkun.pixi.style={fontSize:fontsize,fill:fillc};
        this.width=this.ttkun.pixi.width*1.72;
        this.height=this.ttkun.pixi.height*1.8;
        this.bgkun.fill(backgroundColor);
        this.bgkun.drawRoundedRect(0,0,this.width,this.height,2);
        this.bgkun.endDraw();
        this.bgkun.pixi.interactive=true;
        this.bgkun.pixi.buttonMode=true;
        this.bgkun.pixi.p=this;
        this.maskkunmask= new Kun2D.graphicsKun();
        this.maskkunmask.fill(0xF08080,0);
        this.maskkunmask.drawRoundedRect(0,0,this.width,this.height,1);
        this.maskkunmask.endDraw();
        
        this.bgkun.pd=function(event){
            //console.log(this.p);
            this.p.maskkun.t=new Kun2D.tweens._UIMDesign_resizeingGcircle(event.data.global.x,event.data.global.y,0x000000,0.1,0,2,-1);
            this.p.maskkun.tween(this.p.maskkun.t);
            
            //this.p.shadow.alpha=0.8;
        };
        this.bgkun.pu=function(){
            this.p.maskkun.t.stop();
            //this.p.shadow.alpha=0.3;
            this.p.maskkun.clear();
            this.p.maskkun.r=0;
        }
        this.bgkun.po=function(event){
            if(this.p.maskkun.t!=undefined){
            this.p.maskkun.t.stop();
            this.p.maskkun.clear();
            this.p.maskkun.r=0;
            }
            this.p.maskkun.t=new Kun2D.tweens._UIMDesign_resizeingGcircle(event.data.global.x,event.data.global.y,0x000000,0.05,0,10,this.width);
            this.p.maskkun.tween(this.p.maskkun.t);
            //this.p.shadow.alpha=0.3;
        }
        this.bgkun.pt=function(event){
            //alert('dj');
            this.p.maskkun.t.stop();
            this.p.maskkun.t=new Kun2D.tweens._UIMDesign_resizeingGcircle(event.data.global.x,event.data.global.y,0x000000,0.1,this.p.maskkun.r,8,this.width);
            this.p.maskkun.tween(this.p.maskkun.t);
        }
        this.bgkun.pixi.on('pointerdown',this.bgkun.pd);
        this.bgkun.pixi.on('pointerup',this.bgkun.pu);
        this.bgkun.pixi.on('pointerout',this.bgkun.po);
        this.bgkun.pixi.on('pointertap',this.bgkun.pt);
        this.shadow = new PIXI.filters.DropShadowFilter();
        this.shadow.rotation = 45;
        this.shadow.distance = 2;
        this.shadow.blur = 1;
        this.shadow.alpha = 0.4;
        this.shadow.quality = 8;
        this.bgkun.pixi.filters=[this.shadow];
        this.maskkunmask.moveTo(x,y);
        this.bgkun.moveTo(x,y);
        this.ttkun.moveTo(x+this.ttkun.pixi.width*0.36,y+this.ttkun.pixi.height*0.4);
        this.maskkun.pixi.mask=this.maskkunmask.pixi;
        return this;
    }
    this.join=function(s){
        this.bgkun.join(s);
        this.ttkun.join(s);
        this.maskkun.join(s);
        this.maskkunmask.join(s);
    }
}
Kun2D.UIs.MDesign.universalSlip=function(){
    this.childs=new Array();
    this.create = function(x,y,width,height){

    }
}


function _Kun2D_RDefValue(){

}
_Kun2D_EasingFunctions = { linear: function (t) { return t }, easeInQuad: function (t) { return t*t }, easeOutQuad: function (t) { return t*(2-t) }, easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }, easeInCubic: function (t) { return t*t*t }, easeOutCubic: function (t) { return (--t)*t*t+1 }, easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }, easeInQuart: function (t) { return t*t*t*t }, easeOutQuart: function (t) { return 1-(--t)*t*t*t }, easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t }, easeInQuint: function (t) { return t*t*t*t*t }, easeOutQuint: function (t) { return 1+(--t)*t*t*t*t }, easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t } }
// This part from  https://blog.csdn.net/qq451354/article/details/67639618  Thanks
