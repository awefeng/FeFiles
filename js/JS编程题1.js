function Animal(name,color){
  this.name = name;
  this.color = color;
}
Animal.prototype.say = function(){
  return `I'm a ${this.color} ${this.name}`;
}
Animal.bind = function(_, name){
  function Some(color){
    this.color = color
    this.name = name
  }
  Some.prototype = Object.create(Animal.prototype)
  Some.prototype.constructor = Some
  return Some
}

const Cat = Animal.bind(null,'cat');
const cat = new Cat('white');
console.log(cat.say())
console.log(cat instanceof Cat)
console.log(cat instanceof Animal)
if(cat.say() === "I'm white cat" && cat instanceof Cat && cat instanceof Animal){
  console.log('sunccess');
}