/*定义音频数据*/
var musicArry = [{
	name: '曹格', music: '背叛', musicSrc: 'song/曹格 - 背叛.mp3', imgSrc: 'images/曹格.jpg'}, {
		name: '赵雷', music: '成都', musicSrc: 'song/赵雷 - 成都.mp3', imgSrc: 'images/赵雷.jpg'}, {
			name: 'alan-walker', music: 'Faded', musicSrc: 'song/Faded.mp3', imgSrc: 'images/alan-walker.jpg'}];
/*定义提取元素对象*/
function $(selector){
	return document.querySelector(selector);
}
/*定义播放器对象*/
function Player(musicArry){
    this.musicArry=musicArry;//音频数据
    this.audio=$('audio');//audio
    this.imgZone=$('.right');//图片区域
    this.img=$('.right img');//图片
    this.singerName=$('.artist');//歌手名字
    this.musicName=$('.topic');//歌曲名字
    this.download=$('.download');//下载按钮
    this.deg=0;//初始图片旋转角度
    this.imgTimer=null;//图片旋转定时器
    this.barTimer=null;//进度条进度定时器
    this.audio.volume=0.5;//默认音量
    this.random=false;//随机播放初始值
    this.someClickEvent();
}
Player.prototype={
	//初始化函数
	init:function(index){
		var index=index || 0;
		    this.singerName.innerHTML=this.musicArry[index].name;
		    this.musicName.innerHTML=this.musicArry[index].music;
        this.audio.src=this.musicArry[index].musicSrc;
        this.img.src=this.musicArry[index].imgSrc;
        this.deg=0;
        this.download.href=this.musicArry[index].musicSrc;
        this.audio.dataset.index=index;
        this.audio.currentTime=0;
        this.setImgRoll();
//这里用到bind(this),来将this.displayBar这个函数绑定到当前的对象上，否则没法运行下去，
//并且只有在监听事件中使用
        this.audio.addEventListener('canplay', this.displayBar.bind(this));
	},
	//图片旋转函数
	setImgRoll:function(){
		clearInterval(this.imgTimer);
		  this.imgTimer=setInterval(()=>{
			this.deg+=0.5;
			this.imgZone.style.transform='rotate('+this.deg+'deg)';
		}, 50);
		this.clickNext();
	},
   //播放下一曲函数
	clickNext:function(){
		var next=$('.next');
		var index=this.audio.dataset.index;
	//这里要用箭头函数，否则this的指向有问题
        next.onclick=() => {
        	if(this.random){
        		index=Math.floor(Math.random()*this.musicArry.length);
        	}else{
        		index=++index % this.musicArry.length;
        	}
        	$('.timeStart').innerHTML='00:00';
        	$('.timeEnd').innerHTML='/00:00';
        	$('.move_progress').style.width=0;
        	$('.circle').style.left='3px';
        	this.init(index);
          if($('.play').title!='播放'){
            this.audio.play();
          }
        }
	},
	someClickEvent:function(){
		var self=this;
		var laba=$('.broadcast i');
		var jiantou=$('.arrow i');
		var add=$('.add');
		var loop=$('.loop i');
		var fav=$('.favorite i');
		var play=$('.play i');
		var trash=$('.trash i');
		var upload=$('.upload');
    var horn=$('.horn');
//增加按钮
        add.onclick=function(){
//click()可以模拟在dom上的一次点击
          upload.click();
        }
//收藏按钮切换
        fav.onclick=function(){
          if(fav.className=='iconfont icon-shoucang'){
          	  fav.className='iconfont icon-xin';
          }else if(fav.className=='iconfont icon-xin'){
          	  fav.className='iconfont icon-shoucang';
          }
        }
//箭头按钮
        jiantou.onclick=function(){
          if(jiantou.className=='iconfont icon-jiantou'){
          	  jiantou.className='iconfont icon-danquxunhuan';
          }else if(jiantou.className=='iconfont icon-danquxunhuan'){
          	  jiantou.className='iconfont icon-jiantou';
          }
        }
//循环随机按钮
       loop.onclick=function(){
       	  if(self.audio.loop==false){
            self.audio.loop=true;
            loop.className='iconfont icon-xunhuan';
          }else{
            self.audio.loop=false;
            loop.className='iconfont icon-suiji';
          }
       }
//播放暂停按钮
       play.onclick=function(){
       	 if(play.className=='iconfont icon-bofang'){
          	  play.className='iconfont icon-tag35';
              this.title='暂停';
          	  self.audio.play();
          }else if(play.className=='iconfont icon-tag35'){
          	  play.className='iconfont icon-bofang';
              this.title='播放';
          	  self.audio.pause();
          }
       }
//点击喇叭
       laba.onclick=function(){
          if(horn.style.display=='none'){
            horn.style.display='block';
          }else{
            horn.style.display='none';
          }
       }
//调节音量
       $('.horn_bar').onclick=function(event){
          var horn_x=event.clientY;
          var horn_top=self.getScreenOffsetTop($('.horn_circle'));
          var horn_speed=horn_x-horn_top;
          var horn_distance=this.offsetHeight;
          var percent=Math.abs(horn_speed)/horn_distance;
          self.audio.volume=percent;
          if(percent>1){
            percent=1;
          }else if(percent<0){
            percent=0;
          }
          $('.horn_progress').style.height=percent*100+'%';
          $('.horn_circle').style.bottom=percent*100+'%';
       }
//删除按钮
       trash.onclick=function(){
       	 self.musicArry.splice(self.audio.dataset.index,1);
       	 if(self.musicArry.length==0){
       	 	alert('歌曲已经空了，别删了');
       	 }else{
       	 	self.init();
       	 }
       },
       $('.progress').addEventListener('mousedown', function(event){
             var circle=$('.circle');
             var barWidth=$('.progress').offsetWidth;
             var moveBar=$('.move_progress');
             var progressWidth;
             var circleLeft;
             move(event);
             this.addEventListener('mousemove',move);
             document.addEventListener('mouseup',function(){
                  this.removeEventListener('mousemove', move);
             }.bind(this));
             function move(event){
                 var x=event.clientX;
                 circleLeft=x-self.getScreenOffsetLeft(circle);
                 progressWidth=Math.floor(circleLeft/barWidth*100)+'%';
                 moveBar.style.width=progressWidth;
                 circle.style.left=progressWidth;
//这里不能用    progressWidth来计算，因为progressWidth是个字符串
                 self.audio.currentTime=Math.floor(circleLeft/barWidth*self.audio.duration);
             } 
       });
	},
  displayBar:function(){
    var timeStart=$('.timeStart');
    var timeEnd=$('.timeEnd');
    var audio=this.audio;
    var duration=Math.floor(audio.duration);
    var progress=$('.move_progress');
    var circle=$('.circle');
    var m;//运行的分钟
    var s;//运行的秒数
    var barWidth;//进度条的宽度
//结束时的时间
    var endM=Math.floor(duration / 60);
    var endS=Math.floor(duration % 60);
    endM=endM>=10?endM:'0'+endM;
    endS=endS>=10?endS:'0'+endS;
    timeEnd.innerHTML='/'+endM+':'+endS;
//开启运行时间定时器
    clearInterval(this.barTimer);
    this.barTimer=setInterval(function(){
       var currentTime=Math.floor(audio.currentTime);
       m=Math.floor(currentTime / 60);
       s=Math.floor(currentTime % 60);
       m=m>=10?m:'0'+m;
       s=s>=10?s:'0'+s;
       timeStart.innerHTML=m+':'+s;
//这里如果用this.audio会出现问题，因为this的上下文不对
       width=(audio.currentTime/audio.duration*100).toFixed(2)+'%';
       progress.style.visibility = 'visible';
       progress.style.width=width;
       circle.style.left=width;
    }, 500);
  },
//以下两个函数是获得元素到最终的父元素的距离，是叠加的
  getScreenOffsetLeft:function(ele){
      var left=0;
      while(ele){
        left+=ele.offsetLeft;
        ele=ele.offsetParent;
      }
      return left;
  },
  getScreenOffsetTop:function(ele){
      var top=0;
      while(ele){
        top+=ele.offsetTop;
        ele=ele.offsetParent;
      }
      return top;
  }
}
var Player=new Player(musicArry);
Player.init();

