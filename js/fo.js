function sum(a){
  function temp(b){
		return sum(a + b)
  }
  temp.toString = function(){return a}
  return temp
}

console.log(sum(1))