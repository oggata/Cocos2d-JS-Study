var MyLayer = cc.Layer.extend({

    createTable:function(){
        // Table
        var tableView = cc.TableView.create(this, cc.size(320, 480 - 100));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.setPosition(0, 0);
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);
        tableView.reloadData();
    },

    init:function() {
        var bRet = false;
        this.responses = [];
        if (this._super()) {
            //back
            this.back = cc.LayerColor.create(cc.c4b(255,0,0,255),320,480);
            this.back.setAnchorPoint(0,0);
            this.back.setPosition(0,0);
            this.addChild(this.back);
            for(var i=0;i<10;i++){
                this.responses.push("aaaaaa");
            }
            this.createTable();
            bRet = true;
        }
        return bRet;
    },

    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(SysMenu.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    tableCellSizeForIndex:function (table, idx) {
        return cc.size(320,150);
    },

    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new CustomTableViewCell();

            //リストの背景
            this.imgList = cc.LayerColor.create(cc.c4b(0,255,0,255),320,145);
            this.imgList.setAnchorPoint(0,0);
            this.imgList.setPosition(0,0);
            cell.addChild(this.imgList);

            //名称
            nameLabel = cc.LabelTTF.create(strValue, "Helvetica",30);
            nameLabel.setPosition(150,100);
            nameLabel.setAnchorPoint(0,0);
            nameLabel.setTag("nameLabel");
            cell.addChild(nameLabel);
        } else {
            
            nameLabel = cell.getChildByTag("nameLabel");
            var txt = this.responses[strValue];
            nameLabel.setString(txt);            
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return this.responses.length;
    }

});

var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
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
