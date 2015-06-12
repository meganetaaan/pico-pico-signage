$(function(){
    var pageController = {
        __name: 'com.hifive.sample.picopico.PageController',
        __templates: 'dotCanvas.ejs',

        _mouseDown : false,

        __ready: function(){
            this.view.append('#dotCanvas', 'dotCanvas',{});
        },

        '.cell mousedown' : function(context, $el){
            this._mouseDown = true;
            $el.css({background: 'black'});
            this.log.debug(this._mouseDown);
        },
        '.cell mousemove' : function(context, $el){
            context.event.preventDefault(); // dragの抑制
            if(this._mouseDown){
                $el.css({background: 'black'});
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
            this.$find('.cell').css({background : 'white'});
        }
    }

    h5.core.controller('body', pageController);
});
