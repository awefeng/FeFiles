function run(fn) {
    var gen = fn();
  
    function next(err, data) {
      var result = gen.next(data);
      if (result.done) return;
      result.value(next);
    }
  
    next();
  }
  
  function* g() {
    let res = yield 2 + 2
    let res1 = yield 2+ res
    return res1
  }
  
  run(g);