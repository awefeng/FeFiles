function Animal(name){
    this.name = name
}

Animal.sport = {run: 'norun'}

Animal.prototype.sport = {run: 'run'}

const cat = new Animal('cat')
const dog = new Animal("dog")

console.log(Object.getPrototypeOf(cat))

console.log(cat.constructor)

cat.sport = {run: 'xxx'}

console.log(Animal.prototype.sport)
console.log(cat.sport)

console.log(Animal.sport)

Animal.sport = {static: 's'}

console.log(Animal.sport)