var MyLayer = cc.Layer.extend({
    ctor : function () {
        this._super();
        cc.associateWithNative(this, cc.Layer);

        this.mapNodeX = 0;
        this.mapNodeY = 0;

        if ('touches' in sys.capabilities || sys.platform == "browser")
                this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
                this.setMouseEnabled(true);

        //ウィンドウのサイズを取得する
        var winSize = cc.Director.getInstance().getWinSize();

        //スクロールさせる対象のmapNodeを作る
        this.mapNode = cc.LayerColor.create(cc.c4b(0,0,255,255),200,200);
        this.mapNode.setContentSize(cc.size(winSize.width, 200));

        //マップチップを作成する
        for (var i=0 ; i < 20 ; i++){
            for(var j=0 ; j < 20 ; j++){
                //50px四方の緑色の正方形（マップチップ）を生成する
                this.chipSprite = cc.LayerColor.create(cc.c4b(0,255,0,255),50,50);
                this.chipSprite.setAnchorPoint(0,1);
                //mapNodeに正方形を張る
                this.mapNode.addChild(this.chipSprite,1);
                var posX = 50 * i + i;
                var posY = 50 * j + j;
                //マップチップを配置する
                this.chipSprite.setPosition(posX,posY);
            }
        }

        //スクロール用のNodeを作って、青色を付けたNodeを追加する
        this.scrollView = cc.ScrollView.create(cc.size(320,480), this.mapNode);

        //スクロールのバウンスを行う
        this.scrollView.setBounceable(true);
        //スクロールできる方向
        //cc.SCROLLVIEW_DIRECTION_NONE = -1;        //上下左右+離しても初期位置に戻らない
        //cc.SCROLLVIEW_DIRECTION_HORIZONTAL = 0;   //左右
        //cc.SCROLLVIEW_DIRECTION_VERTICAL = 1;     //上下
        //cc.SCROLLVIEW_DIRECTION_BOTH = 2;         //上下左右+離すと初期位置に戻る
        this.scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_NONE);
        this.scrollView.updateInset();

        //スクロールViewの位置
        this.scrollView.setPosition(0,0);

        //mapNodeの初期位置を設定
        this.scrollView.setContentOffset(cc.p(0,0),true);
        this.scrollView.ignoreAnchorPointForPosition(true);
        this.scrollView.setDelegate(this);

        //スクロールViewを追加
        this.addChild(this.scrollView);

        //tick manage
        this.scheduleUpdate();
        this.setTouchEnabled(true); 
        return true;
    },
    update:function(dt){
        this._super();
        //this.mapNode.setPosition(this.mapNodeX+=1,this.mapNodeY);
    },
    registerWithTouchDispatcher : function () {
        cc.log('touchDispatch');
    },
    onTouchBegan : function (touch, e) {
    },
    scrollViewDidScroll : function (view) {
        cc.log('scrollViewDidScroll');
    },
    scrollViewDidZoom : function (view) {
        //cc.log('scrollViewDidZoom');
    }
});


var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
