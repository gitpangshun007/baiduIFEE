window.onload=function(){
	var menu=document.getElementById('menu');
	findNodes(nodes,menu);
    var divs=menu.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
    	//设定点击事件，隐藏或者显现
      divs[i].onclick=function(){
        if(this.nextElementSibling!=null){
           if(this.nextElementSibling.style.display=='none'){
           	  this.nextElementSibling.style.display='block';
           }else{
           	  this.nextElementSibling.style.display='none';
           }
        }
    }
    }


}
//构建目录树
function findNodes(nodes,parent){
	var node=document.createElement('ul');
	parent.appendChild(node);
	for (var i = 0; i < nodes.length; i++) {
		var li=document.createElement('li');
		var ul=parent.getElementsByTagName('ul')[0];
		ul.appendChild(li);
        var tree=document.createElement('div');
        tree.innerHTML=nodes[i].name;
        li.appendChild(tree);
        if(nodes[i].children){
        	findNodes(nodes[i].children,li);
        }
	}
}