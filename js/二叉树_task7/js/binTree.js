//定义变量
var preBtn=document.getElementById('pre');
var inBtn=document.getElementById('in');
var lastBtn=document.getElementById('last');
var stopBtn=document.getElementById('stop');
var rooter=document.getElementById('root');
var binTree=[];
var timer=null;
//监听点击事件
preBtn.onclick=function(){
	reset();
	preOrder(rooter);
	changeColor();
}
inBtn.onclick=function(){
	reset();
	inOrder(rooter);
	changeColor();
}
lastBtn.onclick=function(){
	reset();
	lastOrder(rooter);
	changeColor();
}
stopBtn.onclick=function(){
    clearInterval(timer);
	reset();
}
//遍历函数
function preOrder(node){
	if(!(node==null)){
		binTree.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

function inOrder(node){
	if(!(node==null)){
		inOrder(node.firstElementChild);
		binTree.push(node);
		inOrder(node.lastElementChild);
	}
}

function lastOrder(node){
	if(!(node==null)){
		lastOrder(node.firstElementChild);
		lastOrder(node.lastElementChild);
		binTree.push(node);
	}
}

//颜色改变函数
function changeColor(){
	var i=0;
    timer=setInterval(function(){
    	i++;
    	if(i<binTree.length){
    	binTree[i-1].style.backgroundColor='white';
    	binTree[i].style.backgroundColor='red';
    }else{
    	clearInterval(timer);
    	reset();
    }
    }, 800);

}
//恢复默认
function reset(){
	for (var i = 0; i < binTree.length; i++) {
		binTree[i].style.backgroundColor='white';
	}
}
