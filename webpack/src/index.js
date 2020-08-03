import {add} from './math'
function helloComp(str){
  const el = document.createElement("div")
  el.innerHTML = add('hello,', str)
  return el
}

document.body.appendChild(helloComp('awefeng'))
