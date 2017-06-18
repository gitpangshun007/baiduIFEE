window.onload=function(){
	//定义eventUtil函数
	var EventUtil={
       addHandler:function(element,type,handler){
       	  if(element.addEventListener){
       	  	 element.addEventListener(type,element,false);
       	  }else if(element.attachEvent){
       	  	 element.attachEvent('on'+type,handler);
       	  }else{
       	  	 element['on'+type]=handler;
       	  }
       }
	}
	//定义按钮等基础变量
	var dfBtn=document.getElementsByTagName('button')[0];
	var bfBtn=document.getElementsByTagName('button')[1];
	var dfSearch=document.getElementsByTagName('button')[2];
	var bfSearch=document.getElementsByTagName('button')[3];
	var addBtn=document.getElementsByTagName('button')[4];
	var delBtn=document.getElementsByTagName('button')[5];
	var rooter=document.getElementById('root');
	var tree=[];
	var currentNode;
	var timer=null;
	var index=0;

	//深度优先遍历
	function dfOrder(node){
		if(node!=null){
			tree.push(node);
			 for (var i = 0; i < node.children.length; i++) {
				 dfOrder(node.children[i]);
			 }
		}
	}
	//广度优先遍历
	function bfOrder(node){
		if(node!=null){
			tree.push(node);
			bfOrder(node.nextElementSibling);
			node=tree[index++];
			bfOrder(node.firstElementChild);
		}
	}
    //颜色改变函数
	function changeColor(txt){
		var i=0;
		if(tree[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"")==txt){
			tree[i].style.backgroundColor='lightblue';
		}else{
			tree[i].style.backgroundColor='white';
			timer=setInterval(function(){
				i++;
				if(i<tree.length){
					tree[i-1].style.backgroundColor='white';
					console.log(tree[i].firstChild.nodeValue);
					if(tree[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"")==txt){
						tree[i].style.backgroundColor='orange';
						clearInterval(timer);

					}else {
						tree[i].style.backgroundColor='red';
					}
				}else {
					tree[tree.length-1].style.backgroundColor='white';
					clearInterval(timer);
				}
			}, 500);
		}
	}
	//点击节点颜色变化监听函数
	rooter.addEventListener('click', function(e){
		var divs=document.getElementsByTagName('div');
     	for (var i = 0; i < divs.length; i++) {
     		divs[i].style.backgroundColor='white';
     	}
        if(e.target){
        	e.target.style.backgroundColor='lightgreen';
        	currentNode=e.target;
        }
	});
	//添加节点函数
	addBtn.addEventListener('click', function(){
       var parent=document.createElement('div');
       var txt=document.getElementById('text').value;
       parent.innerHTML=txt;
       currentNode.appendChild(parent);
       dfOrder(currentNode);
	});
	//删除节点函数
	delBtn.addEventListener('click', function(){
       currentNode.parentNode.removeChild(currentNode);
       currentNode='';
	});
     //回复出厂设置函数
     function init(){
     	order=[];
     	index=0;
     	clearInterval(timer);
     	var divs=document.getElementsByTagName('div');
     	for (var i = 0; i < divs.length; i++) {
     		divs[i].style.backgroundColor='white';
     	}
     }
    //执行函数
    dfBtn.addEventListener('click',function(){
    	init();
    	dfOrder(rooter);
    	changeColor();
    });

    bfBtn.addEventListener('click',function(){
    	init();
    	bfOrder(rooter);
    	changeColor();
    });
    dfSearch.addEventListener('click',function(){
    	init();
    	dfOrder(rooter);
    	var txt=document.getElementById('text').value;
    	console.log(txt);
    	if(txt==''){
    		alert('请输入文字');
    	}else{
    		changeColor(txt);
    	}
    });
    bfSearch.addEventListener('click',function(){
    	init();
    	bfOrder(rooter);
    	var txt=document.getElementById('text').value;
    	console.log(txt);
    	if(txt==''){
    		alert('请输入文字');
    	}else{
    		changeColor(txt);
    	}
    });
}