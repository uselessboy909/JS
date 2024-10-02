var strStr = function(haystack : string, needle : string) : number {
  for(let i = 0; i < haystack.length; i++){
    if(haystack.substring(i, needle.length) == needle){
      return i;
    }
  }
  return -1;
};
console.log(strStr("sadbutsad", "sad"))