$(function(){var a={__name:"com.hifive.sample.picopico.PageController",__templates:"dotCanvas.ejs",_mouseDown:!1,_CELLWIDTH:10,_WHITE:"#B2EBF2",_BLACK:"#263238",_color:this._white,_white:!0,_baseCellOffset:null,_dotCanvas:null,__ready:function(){this.view.append("#dotCanvas","dotCanvas",{}),this._color=this._WHITE,this._baseCellOffset=this.$find("#dotCanvas > table > tbody > tr:nth-child(1) > td:nth-child(1)").offset();for(var a=[],b=this.$find("#dotCanvas table tr"),c=0,d=b.length;d>c;c++)for(var e=b.eq(c).children(),f=0,g=e.length;g>f;f++)"undefined"==typeof a[c]&&(a[c]=[]),a[c][f]=e.eq(f);this.log.debug(a),this._dotCanvas=a},".cell mousedown":function(a,b){this._mouseDown=!0,this._draw(b),this.log.debug(this._mouseDown)},".cell mousemove":function(a,b){a.event.preventDefault(),this._mouseDown&&this._draw(b),this.log.debug(this._mouseDown)},"{document} mousedown":function(a,b){this._mouseDown=!0,this.log.debug(this._mouseDown)},"{document} mouseup":function(a,b){this._mouseDown=!1,this.log.debug(this._mouseDown)},"#clear click":function(a,b){this.$find(".cell").removeClass("white")},".cell touchstart":function(a,b){this._mouseDown=!0;var c=a.event.originalEvent;this._origX=c.pageX,this._origY=c.pageY,this._draw(b)},".cell touchmove":function(a,b){a.event.preventDefault();var c=a.event.originalEvent,d=c.pageX,e=c.pageY;this.log.debug("x, y: "+d+", "+e,this.__name);var f={x:Math.round((d-this._baseCellOffset.left)/10),y:Math.round((e-this._baseCellOffset.top)/10)};this._draw(this._dotCanvas[f.y][f.x])},".cell touchend":function(a,b){this._mouseDown=!1},".button touchend":function(a,b){b.trigger("click")},"#toggleColor click":function(a,b){this._white?(b.text("ペンの色：黒"),this._white=!1):(b.text("ペンの色：白"),this._white=!0)},_draw:function(a){this._white?a.addClass("white"):a.removeClass("white")}};h5.core.controller("body",a)});