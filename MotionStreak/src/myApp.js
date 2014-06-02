/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var Helloworld = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();

        //背景
        this.back = cc.LayerColor.create(cc.c4b(100,149,237,255),1000,1000);
        this.back.setPosition(0,0);
        this.addChild(this.back);

        this.planes = [];
        this.smokes = [];
        this.addPlanes();

        var label = cc.LabelTTF.create("-GO-", "Arial", 20);
        var back = cc.MenuItemLabel.create(label,this.addPlanes,this);
        var menu = cc.Menu.create(back);
        menu.setPosition(300,50);
        this.addChild(menu);

        this.setTouchEnabled(true);
        this.scheduleUpdate();
        return true;
    },

    update:function(dt){
        this._super();
        for(var i=0;i<this.planes.length;i++){
            var posX = this.planes[i].getPosition().x + 3
            var posY = this.planes[i].getPosition().y;
            if(posX >= 400){
                posY = this.planes[i].getPosition().y + this.planes[i].rise;
            }
            this.planes[i].setPosition(
                posX,
                posY
            );
            this.smokes[i].setPosition(
                posX,
                posY
            );
        }
    },

    addPlanes:function(){
        //スタート時点の座標を設定。[x座標,y座標,dY]
        var baseY = getRandNumberFromRange(100,300);
        var deps = [
            [-150,baseY-60,-0.9],
            [-100,baseY-30,-0.5],
            [-50 ,baseY,0],
            [-100,baseY+30,0.5],
            [-150,baseY+60,0.9]
        ];
        for(i=0; i<deps.length; i++){
            //スモークを作成
            var smoke = cc.MotionStreak.create(6,0.05,10,cc.c3b(255,255,255),s_texture);
            smoke.setPosition(deps[i][0],deps[i][1]);
            this.smokes.push(smoke);
            this.addChild(smoke);
            //飛行機を作成
            var plane = cc.Sprite.create(s_plane);
            plane.rise = deps[i][2];
            plane.setPosition(deps[i][0],deps[i][1]);
            this.planes.push(plane);
            this.addChild(plane);
        }
    },

    // a selector callback
    menuCloseCallback:function (sender) {
        cc.Director.getInstance().end();
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});

var getRandNumberFromRange = function (min,max) {
    var rand = min + Math.floor( Math.random() * (max - min));
    return rand;
};

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Helloworld();
        layer.init();
        this.addChild(layer);
    }
});

