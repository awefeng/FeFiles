function arrange(name){
  const people = {}
  let promise = Promise.resolve()

  people.do = function(thing){
    promise = promise.then(()=>console.log(`Start to do ${thing}`))
    //console.log(`Start to do ${thing}`)
    return people
  }
  people.wait = function(times){
    promise = promise.then(async ()=>{
      console.log(`Wait for ${times}s `)
      await new Promise((resolve)=>setTimeout(resolve, times*1000))
    })
    return people
  }
  people.execute = function(){
    console.log(`${name} is notified`)
    return people
  }
  return people
}

//arrange('william').execute()

arrange('wu').do('eat').wait(5).do('run').execute()