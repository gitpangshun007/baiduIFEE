window.onload=function(){
	var redBox=document.getElementById('redBox');
	var lis=document.getElementsByTagName('li');

	redBox.onmouseover=function(){
		startMove(this,{'width':600,'height':500},function(){
			startMove(redBox,{'opacity':100},null);
		});
	}
	for (var i = 0; i < lis.length; i++) {
	 var json={'width':500,'opacity':100};
     lis[i].onmouseover=function(){
    	startMove(this,json,null);
    }
  }
}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
       obj.timer=setInterval(function(){
       	  for(var attr in json){
     	if(attr=='opacity'){
         var cur=parseFloat(getStyle(obj,attr))*100;
     	}else{
     	   var cur=parseFloat(getStyle(obj,attr));
     	}
     	var speed=(json[attr]-cur)/8;
     	var speed=speed>0?Math.ceil(speed):Math.floor(speed);
     	if(cur==json[attr]){
     		clearInterval(obj.timer);
     		if(fn){
     			fn();
     		}
     	}else{
     		if(attr=='opacity'){
     	      obj.style[attr]=(cur+speed)/100;
     	      obj.style.filter='alpha(opacity:'+cur+speed+')';
     		}else {
     	      obj.style[attr]=cur+speed+'px';
     		}
        }
       }
     }, 50);
  }
function getStyle(element,styleName){
	return element.currentStyle?element.currentStyle[styleName]:getComputedStyle(element,false)[styleName];
}