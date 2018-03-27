var input = document.getElementById("input");
var btnLeftIn = document.getElementById("leftIn");
var btnRightIn = document.getElementById("rightIn");
var btnLeftOut = document.getElementById("leftOut");
var btnRightOut = document.getElementById("rightOut");
var showItem = document.getElementById("show");
var btnSort = document.getElementById("btnSort");
var count = 0;
var myArr = [];
// 方法一：左侧入事件绑定
// btnLeftIn.addEventListener("click",function leftIn(){
//     var flag=isInput(input);
//     if(flag==true){
//         insertShow("left",showItem,input);
//     }
//     initInput(input);
// },false);
//方法二：左侧入事件绑定test
btnLeftIn.addEventListener("click",function(){
  leftIn(input.value);
  createList(myArr,showItem);
  initInput(input);
},false)
btnRightIn.addEventListener("click",function(){
  rightIn(input.value);
  createList(myArr,showItem);
  initInput(input);
},false);
//方法一：右侧入事件绑定
// btnRightIn.addEventListener("click",function rightIn(){
//     var flag = isInput(input.value);
//     if(flag==true){
//         insertShow("right",showItem,input);
//     }
//     initInput(input);
// },false)
//左侧出
btnLeftOut.addEventListener("click",function leftOut(){
    delShow("left",showItem);
    initInput(input);
},false)
//右侧出
btnRightOut.addEventListener("click",function rightOut(){
    delShow("right",showItem);
    initInput(input);
},false)
//排序
btnSort.addEventListener("click",function (){
    sort(bubbleSort,stateBubble);
},false)

//判断输入内容是否满足要求
function isInput(inputData){
    // var inputData = ele.value;
    if (inputData==''){
        alert("请输入内容");
        return false;
    }
    else if(isNaN(inputData)){
        alert("请输入一个数字");
        return false;
    }
    else if(Number(inputData)<10||Number(inputData)>100){
        alert("请输入10-100以内的整数");
        return false;
    }
    else{
        return true;
    }
}
//方法二：左侧入函数
function leftIn(num){
    var flag = isInput(num);
    if(flag){
        if(count<60&&count>=0){
            myArr.unshift(num);
            count++;
        }
        else{
            alert("队列元素数目已到达上限");
        }
    }
}
//右侧入
function rightIn(num){
  var flag = isInput(num);
  if(flag){
    if(count<60&&count>=0){
      myArr.push(num);
    }
  }
}
//方法二：创建li
function createList(arr,ele){
    ele.innerHTML="";     //要将内容清空，不然数组元素会不断重复加入
    for(var i=0;i<arr.length;i++){
        var node=document.createElement("li");
        node.id="item"+i;
        node.style.height=arr[i]*2+"px";
        node.innerHTML=arr[i];
        node.setAttribute("class","list");
        ele.appendChild(node);
    }
} 

//方法一：插入元素
function insertShow(ops,ele,val){
    var node = document.createElement("li");
    var inputData = val.value; 
    node.setAttribute("class","list");
    node.style.height = inputData*2+"px";    //动态设置添加元素的高度
    var count = ele.childNodes.length;
    console.log(count);
    if(count>=0&&count<59){      //判断队列元素是否已满
        if(ops==="left"){
            ele.insertBefore(node,ele.firstChild);
        }
        else if(ops==="right"){
            ele.appendChild(node);
        }
    }
    else{
        alert("队列元素数目已到达上限");
    }

}
//方法一：删除元素
function delShow(ops,ele){
    if(count===0){
        alert("当前队列已为空！请先添加数字");
    }
    else{
        if(ops==="left"){
            var valLeft = ele.firstChild.innerHTML;
            var mesLeft = confirm("是否删除"+valLeft+"?");
            if(mesLeft){
                myArr.shift();
                ele.removeChild(ele.firstChild);
                count--;
            }
            else{
                initInput(input);
            }

        }
        else if(ops==="right"){
            var valRight = ele.lastChild.innerHTML;
            var mesRight = confirm("是否删除"+valRight+"?");
            if(mesRight){
                myArr.pop(); 
                ele.removeChild(ele.lastChild);
                count--;
            }
            else{
                initInput(input);
            }
        }
    }
}
//初始化
function initInput(ele){
    ele.value='';
    ele.focus();
}
//收集li中元素保存成数组元素
function dataTOArr(ele){
    var data=[];
    for(var i=0;i<ele.length;i++){
        data.push(ele.value);
    }
    return data;
}
//冒泡排序
var stateBubble=[]; //用来存储每一次交换后的数组状态
function bubbleSort(arr){
    var num = arr.length;
    for(outer=num;outer>1;outer--){
        var flag = true;
        for(var inner=0;inner<outer-1;inner++){
            if(arr[inner]>arr[inner+1]){
                var temp = arr[inner];
                arr[inner] = arr[inner+1];
                arr[inner+1] = temp;
                flag = false;
            }
            stateBubble.push(JSON.parse(JSON.stringify(arr))); 
            //JSON.parse(JSON.stringify(arr))实现了深拷贝，不改变原数组
        }
        if(flag){
            break;
        }
    }
    //stateBubble.push(JSON.parse(JSON.stringify(arr))); 
}
//可视化排序过程
function sort(sortAlgorithm,stateKind){
    sortAlgorithm(myArr);
    var timer=setInterval(function(){
        //每一百秒取一次state中的第一个数组
    //setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    //setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
    //由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。
    //setInterval(code,millisec[,"lang"])
    //code	必需。要调用的函数或要执行的代码串。
    //millisec	必须。周期性执行或调用 code 之间的时间间隔，以毫秒计。
    if(stateKind.length>0){
        var stateArr=stateKind.shift();
        //从状态数组集合中取出第一次交换后的数组的状态
        //注意如果放在if条件外层，最后会少执行一次creatList()。
        createList(stateArr,showItem);
    }else{
        clearInterval(timer);
    }
},100);
}