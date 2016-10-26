window.onload=function () {
	waterfall('main','box');
	var dateInt = {"date":[{"src":'P_04.jpg'},{"src":'P_05.jpg'},{"src":'P_06.jpg'},{"src":'P_07.jpg'}]};
	window.onscroll = function () {
		if (checkScrollSlide()) {
			var oParent = document.getElementById('main');
			//将数据块渲染到当前页面的尾部
			for(var i=0;i<dateInt.date.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/"+dateInt.date[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}

}
function waterfall(parent,box) {
	//将main下的所有class为box的元素全部取出来
	var oParent = document.getElementById(parent);
	var oBoxs   = getByClass(oParent,box);

	//计算整个页面显示的列数（页面宽／box的宽）
	var oBoxW = oBoxs[0].offsetWidth;//offsetWidth = content宽＋padding*2 +  border*2 +左padding

	//获取页面宽度／oBoxW
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);

	//设置main的宽
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto;';

	//存储每行高度的数组
	var hArr=[];
	for (var i=0;i<oBoxs.length;i++){
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight)
		}else{
			var minH  = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH+'px';
			oBoxs[i].style.left = oBoxW*index+'px';
			// oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
			hArr[index]+= oBoxs[i].offsetHeight;
		} 
	}
}
//根据class获取元素
function getByClass(parent,clsName) {
	var boxArr=new Array(),//用来存储获取到的所有class为box的数组
		oElements=parent.getElementsByTagName('*');
		for ( var i = 0; i < oElements.length - 1; i++) {
			if (oElements[i].className==clsName) {
				boxArr.push(oElements[i]);
			}
		}
		return boxArr;
}

function getMinhIndex(arr,val) {
	for (var i in arr) {
		if (arr[i]==val) {
			return i;
		}
	}
}

//检测是否具备了滚条加载数据块的条件
function checkScrollSlide() {
	var oParent = document.getElementById('main');
	var oBox = getByClass(oParent,'box');
	var lastBoxH = oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
	var height = document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;

}