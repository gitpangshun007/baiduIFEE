window.onload=function(){
	var wrap=document.getElementById('wrap');
	var menu=document.getElementById('menu');
	var ul=document.getElementsByTagName('ul');
	var lis=document.getElementsByTagName('li');
    document.documentElement.addEventListener('contextmenu', function(e){
    	window.event?window.event.returnValue=false:e.preventDefault();

    });
    document.documentElement.addEventListener('click', function(e){
    	menu.style.visibility = 'hidden';
    });
    wrap.addEventListener('contextmenu', function(e){
    	var event=window.event?window.event:e;
    	window.event?window.event.returnValue=false:e.preventDefault();
    	var wrapX=e.clientX;
    	var wrapY=e.clientY;
    	var wrapWidth=wrap.offsetWidth;
    	var wrapHeight=wrap.offsetHeight;
    	var menuWidth=menu.offsetWidth;
    	var menuHeight=menu.offsetHeight;
        if(wrapWidth-wrapX>=menuWidth&&wrapHeight-wrapY>=menuHeight){
        	menu.style.left=wrapX-30+'px';
        	menu.style.top=wrapY-30+'px';
        	menu.style.visibility = 'visible';
        }else if(wrapWidth-wrapX>=menuWidth&&wrapHeight-wrapY<menuHeight){
        	menu.style.left=wrapX-30+'px';
        	menu.style.top=wrapY-menuHeight-30+'px';
        	menu.style.visibility = 'visible';
        }else if(wrapWidth-wrapX<menuWidth&&wrapHeight-wrapY<menuHeight){
        	menu.style.left=wrapX-menuWidth-30+'px';
        	menu.style.top=wrapY-menuHeight-30+'px';
        	menu.style.visibility = 'visible';
        }else{
        	menu.style.left=wrapX-30+'px';
        	menu.style.top=wrapY-30+'px';
        }
    });
    for (var i = 0; i < lis.length; i++) {
    	lis[i].index=i;
    	lis[i].addEventListener('click',function(){
            menu.style.visibility = 'hidden';
            alert('我点击的是'+this.innerHTML);
    	});
    }

}