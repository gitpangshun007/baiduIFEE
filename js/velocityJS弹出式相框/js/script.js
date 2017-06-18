$(function(){
	var container=$('#container');
	var top=$('.top');
	var logo=$('.logo');
	var context=$('.context');
	var btn=$('.btn');
	var imgs=$('.img');
	var cover=$('#cover');
	var wrap=$('.wrap');
	console.log(container);
	//进入
	$.Velocity.RegisterEffect('ps.slideUpIn',{
		defaultDuration:300,
		calls:[
          [{opacity:[1,0],translateY:[0,200]}]
		]
	});
	//退出
	$.Velocity.RegisterEffect('ps.slideDownOut',{
		defaultDuration:300,
		calls:[
          [{opacity:[0,1],translateY:[200,0]}]
		]
	});
	//图片放大入场
	$.Velocity.RegisterEffect('ps.scaleIn',{
		defaultDuration:300,
		calls:[
          [{opacity:[1,0],scale:[1,0.3]}]
		]
	});
//入场动画
	var seqInit=[{
		elements:container,
		properties:'ps.slideUpIn',
		options:{
			delay:300
		}
	},{
		elements:logo,
		properties:'ps.slideUpIn',
		options:{
			sequenceQuene:false,
			delay:300
		}
	}];
//点击后动画
    var seqOut=[{
		elements:container,
		properties:'ps.slideDownOut',
		options:{
			delay:300
		}
    },{
		elements:cover,
		properties:'ps.slideUpIn',
		options:{
			sequenceQuene:false
		}
    },{
		elements:imgs,
		properties:'ps.scaleIn',
		options:{
			sequenceQuene:false
		}
    }];

    $.Velocity.RunSequence(seqInit);
//点击事件
    btn.on('click',function(){
    	$.Velocity.RunSequence(seqOut);
    });

});