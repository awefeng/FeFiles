class Walker {
    constructor() {
      this.promise = Promise.resolve()
    }
    sleep(s) {
      this.promise = this.promise.then(function () {
        console.log('sleep')
        return new Promise(resolve => setTimeout(resolve, 1000 * s))
      })
      return this
    }
    walk(s) {
      this.promise = this.promise.then(function () {
        console.log('walk')
        return new Promise(resolve => setTimeout(resolve, 1000 * s))
      })
      return this
    }
    exec() {
        return this.promise
    }
  }
  
  new Walker().sleep(1).walk(2).sleep(3).walk(4)