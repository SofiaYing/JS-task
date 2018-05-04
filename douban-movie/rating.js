function rating($node,num){
  var starsArr = []
  var numSplit = num.toString().split('.');
  var i,j,k;
  var starFull = Math.floor(numSplit[0]/2);
  var starHalf;
  if (numSplit[1]>4){
    starHalf = 1;
  }
  else{starFull = 0}
  var starBlank = 5 - starFull - starHalf;
  for(i=0;i<starFull;i++){
   starsArr[i] = $('<span class="starFull"></span>');
   return j=i+1;
  }
  if(starHalf==1){
    starsArr[j]=$('<span class="starHalf"></span>');
    return k = j+1;
  }
  else{ return k = j;}
  for(k;k<starBlank;k++){
    starsArr[k] = $('<span class="starBlank"></span>');
   }
  for(var n = 0 ;n<starsArr.length;n++){
    $node.append(starsArr[n]);
  }
}