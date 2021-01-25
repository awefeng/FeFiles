function Student(name){
  if(!(this instanceof Student)){
    return new Student(name)
  }
    this.name = name
}

console.log(_new(Student, 'awefeng'))

function _new(...args){

	const constructor = args.shift()
  // 第一步
  const obj = Object.create(constructor.prototype)
  // 第二步 第三步
  const result = constructor.apply(obj, args)
  // 第四部
  return result === Object(result) ? result : obj
}

function Stu(){}
const f = Object.setPrototypeOf({}, Stu)
Stu.call(f)

return f