/**
 * 模拟迭代器生成器
 * @param {Array<any>} arr 
 */
function makeIterator(arr) {
  let it = {
    [Symbol.iterator]: function () {
      let start = 0
      return {
        next: () => {
          return start < arr.length ? {
            value: arr[start++]
          } : {
            done: true
          }
        }
      }
    }
  }
  return it
}

/*
const arrIter = makeIterator([1, 2, 3])

for (let item of arrIter) {
  console.log(item)
}

const students = ['awe', 'st', 'xxx']
const studentsIter = students[Symbol.iterator]()

console.log(studentsIter.next())
console.log(studentsIter.next())
console.log(studentsIter.next())
console.log(studentsIter.next())

const name = 'awefeng'
const nameIter = name[Symbol.iterator]()

console.log(nameIter.next()) 
*/

const awefeng = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
  }
}

for(let num of awefeng){
  console.log(num)
}