//node.js用
require('prototype');
var util=require('util');

//SheatData(出席番号,座席番号);
var SheatData=Class.create({
 initialize:function(human,sheat){
  this.humanNumber=human;
  this.sheatNumber=sheat;
 },
 toString:function(){
  return "("+this.humanNumber+","+this.sheatNumber+")";
 }
});

//人数,座席数
var memberLength=42;
var sheatLength=6*7;
var w=5;
var h=10;
var maxLength=(memberLength>sheatLength?memberLength:sheatLength);
var minLength=(memberLength<sheatLength?memberLength:sheatLength);
var maxData=(memberLength>sheatLength?"Human":"Sheat");
var minData=(memberLength<sheatLength?"Human":"Sheat");
if(maxData==minData){
 if(maxData=="Human"){
  minData="Sheat";
 }else{
  minData="Human";
 }
}
console.log(maxData+"\n"+minData);

function getSheatNum(y,x){
 return y*h+x;
}

//決まったデータ
var determinedSheatData=new Array(
 new SheatData(15-1,getSheatNum(0,0)),
 new SheatData(2-1,getSheatNum(0,5))
);

var determinedHumanList=new Array();
var determinedSheatList=new Array();
var randData=new Array();
var viewList=new Array();

var i;
//決定されているデータを抜き出す
for(i=0;i<determinedSheatData.length;i++){
 determinedHumanList.push(determinedSheatData[i].humanNumber);
 determinedSheatList.push(determinedSheatData[i].sheatNumber);
}

var minArr=eval("(determined"+minData+"List)");
var maxArr=eval("(determined"+maxData+"List)");
console.log(minArr);

//少ない方のデータを作る
for(i=0;i<minLength;i++){
 var flag=false;
 for(j=0;j<minArr.length;j++){
  if(i==minArr[j]){
   flag=true;
   break;
  }
 }
 if(flag){
  continue;
 }
 randData.push(i);
}
console.log(randData);

//randData[r]:少ない方の番号
//i:大きい方の番号
for(i=0;randData.length>0;i++){
 var flag=false;
 for(j=0;j<maxArr.length;j++){
  if(i==maxArr[j]){
   flag=true;
   break;
  }
 }
 if(flag){
  continue;
 }
 var r=Math.floor(Math.random()*randData.length);
 var sheatNum=(minData=="Sheat"?randData[r]:i);
 var humanNum=(minData=="Human"?randData[r]:i);
 console.log(""+sheatNum+":"+humanNum);
 determinedSheatData.push(
  new SheatData(humanNum,sheatNum)
 );
 randData.splice(r,1);
}

console.log(determinedSheatData);

//座席を基準に

for(i=0;i<determinedSheatData.length;i++){
 var dat=determinedSheatData[i];
 console.log(dat);
 viewList[dat.sheatNumber]=dat.humanNumber;
 //viewList[dat.humanNumber]=dat.humanNumber;
}
console.log("show viewList");
console.log(viewList);


for(i=0;i<h;i++){
 for(j=0;j<w;j++){
  var sheatNum=i*w+j;
  var str="";
  if(Object.isUndefined(viewList[sheatNum])){
   str="X";
   str=setLen(str,2," ");
  }else{
   str=""+(viewList[sheatNum]+1);
   str=setLen(str,2);
  }
  //console.log(sheatNum+":"+viewList[sheatNum]);
  util.print(str+"|");
 }
 util.print("\n");
}

function setLen(str,len,lenstr){
 if(Object.isUndefined(lenstr)){
  lenstr="0";
 }
 while(str.length<len){
  str=lenstr+str;
 }
 return str;
}



console.log("0,0",getSheatNum(0,0));
