import * as Kun2D from './Kun2D.core.js';

export const DBfactory = dragonBones.PixiFactory.factory;
export class kunDragonBones extends Kun2D.kun{
    constructor(name,fantory=null){
        super();
        if(fantory!=null){
            this.factory=fantory;
        }else{
            this.factory=DBfactory;
        }
        this.pixi=this.factory.buildArmatureDisplay(name);
        this.pixi.scale.x=1;
        this.pixi.scale.y=1;
    }
    play(animationName,times=-1){
        this.pixi.animation.play(animationName,times);
        return this;
    }
    setTimeScale(v){
        this.pixi.animation.timeScale=v;
        return this;
    }
    setScale(x=1,y=1){
        this.pixi.scale.x=x;
        this.pixi.scale.y=y;
    }
    fadeIn(animationName, fadeInTime=-1, playTimes=-1, layer=0, group=null, fadeOutMode=3){
        this.pixi.animation.fadeIn(animationName, fadeInTime, playTimes, layer, group, fadeOutMode);
    }
    replace(){

        let slot = this.pixi.armature.getSlot("bone");
        DBfactory.replaceSlotDisplay("NewProject", "res", "head", "characterHead2671", slot);
    }
}
export function parseDragonBonesData(texture=null,texjsondata=null,skejsondata=null,factory=null){
    var f=DBfactory;
    if(factory!=null){
        f=factory;
    }
    if(skejsondata!=null){
        if(typeof skejsondata=='string'){
            skejsondata=JSON.parse(skejsondata);
        }
        f.parseDragonBonesData(skejsondata);
    }
    if(texjsondata!=null&&texture!=null){
        if(typeof texjsondata=='string'){
            texjsondata=JSON.parse(texjsondata);
        }
        f.parseTextureAtlasData(texjsondata,texture);
    }
}