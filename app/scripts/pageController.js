$(function(){
    var pageController = {
        __name: 'com.hifive.sample.picopico.PageController',
        __templates: 'dotCanvas.ejs',

        _mouseDown : false,

        _CELLWIDTH: 10,
        _WHITE : '#B2EBF2',
        _BLACK: '#263238',
        _color: this._white,
        _white: true,

        _baseCellOffset : null,
        _dotCanvas : null,

        __ready: function(){
            this.view.append('#dotCanvas', 'dotCanvas',{});
            this._color = this._WHITE;
            this._baseCellOffset = this.$find('#dotCanvas > table > tbody > tr:nth-child(1) > td:nth-child(1)').offset();

            // 処理高速化のためにcellのDOMをキャッシュしておく。
            var arr = [];
            var tr = this.$find('#dotCanvas table tr');
            for(var i = 0, l = tr.length; i < l; i++){
                var cells = tr.eq(i).children();
                for(var j = 0, m = cells.length; j < m; j++){
                    if( typeof arr[i] == "undefined" )
                    arr[i] = [];
                    arr[i][j] = cells.eq(j);
                }
            }
            this.log.debug(arr);
            this._dotCanvas = arr;
        },

        '.cell mousedown' : function(context, $el){
            this._mouseDown = true;
            this._draw($el);
            this.log.debug(this._mouseDown);
        },
        '.cell mousemove' : function(context, $el){
            context.event.preventDefault(); // dragの抑制
            if(this._mouseDown){
                this._draw($el);
            }
            this.log.debug(this._mouseDown);
        },

        '{document} mousedown' : function(context, $el){
            this._mouseDown = true;
            this.log.debug(this._mouseDown);
        },

        '{document} mouseup' : function(context, $el){
            this._mouseDown = false;
            this.log.debug(this._mouseDown);
        },

        '#clear click' : function(context, $el){
            this.$find('.cell').removeClass('white');
        },

        // タッチイベントをマウスイベントに対応づける
        '.cell touchstart' : function(context, $el){
            this._mouseDown = true;
            var originalEvent = context.event.originalEvent;
            this._origX = originalEvent.pageX;
            this._origY = originalEvent.pageY;
            this._draw($el);
        },

        '.cell touchmove' : function (context, $el) {
            context.event.preventDefault();
            var originalEvent = context.event.originalEvent;
            var x = originalEvent.pageX;
            var y = originalEvent.pageY; 
            this.log.debug('x, y: ' +  x + ', ' + y , this.__name);
            var index = {x : Math.round((x - this._baseCellOffset.left) / 10),
                y : Math.round((y - this._baseCellOffset.top) / 10)};
            this._draw(this._dotCanvas[index.y][index.x]);
            //this._dotCanvas[index.y][index.x].addClass('white');
        },

        '.cell touchend' : function(context, $el){
            this._mouseDown = false;
        },

        '.button touchend' : function(context, $el){
            $el.trigger('click');
        },

        '#toggleColor click' : function(context, $el){
            if(this._white){
                $el.text('ペンの色：黒');
                this._white = false;
            } else {
                $el.text('ペンの色：白');
                this._white = true;
            }
        },

        _draw : function($target){
            if(this._white){
                $target.addClass('white');
            } else {
                $target.removeClass('white');
            }
        }
    }

    h5.core.controller('body', pageController);
});
