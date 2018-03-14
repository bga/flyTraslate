;(function() {
  
var yes = !0, no = !1
var Object = this.Object, Array = this.Array

if(Object.getOwnPropertyDescriptor == null) {
  Object.getOwnPropertyDescriptor = function(obj, name) {
    if(!{  }.hasOwnProperty.call(obj, name)) {
      return null
    }
    else {
      var desc = {  }
      var get = null
      var set = null
      if({  }.__lookupGetter__) {
        get = {  }.__lookupGetter__.call(obj, name)
        set = {  }.__lookupSetter__.call(obj, name)
      }
      if(get || set) {
        if(get) {
          desc.get = get
        }
        if(set) {
          desc.set = set
        }
      }
      else {
        desc.value = obj[name]
        desc.writable = yes
      }
      //# assiming that we can not detect it in es3
      desc.enumeratible = yes
      desc.configurable = yes
      return desc
    }
  }
}

if(Object.getPropertyDescriptor == null) {
  Object.getPropertyDescriptor = function(obj, name) {
    var desc = null
    loop_12: for(;;) {
      if(obj == null) {
        break loop_12
      }
      if(Object().hasOwnProperty.call(obj, name)) {
        break loop_12
      }
      obj = Object.getPrototypeOf(obj)
    }
    if(obj == null) {
      return null
    }
    else {
      return Object.getOwnPropertyDescriptor(obj, name)
    }
  }
}

if(Object.create == null) {
  Object.create = function(proto) {
    var f = function() {
    }
    f.prototype = proto
    return new f()
  }
}

if(Object.getPrototypeOf == null) {
  Object.getPrototypeOf = function(obj) {
    if(obj.hasOwnProperty('constructor')) {  
      var _constructor = obj.constructor

      if(delete(obj.constructor)) {
        if('constructor' in obj) {
          var proto = obj.constructor.prototype
          obj.constructor = _constructor
          return proto
        }
        else {
          obj.constructor = _constructor
          return null
        }
      }
      else {
        return null
      }
    }
    else {
      return obj.constructor.prototype
    }
  }
}

;(function() {
  var wses = "[\u0009\u000D\u0020\u000B\u000C\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]"
  if("".trim == null) {
    String.prototype.trim = function() {
      return this.replace(RegExp("^" + wses + "+|" + wses + "+$", "g"), "")
    }
  }
  if("".trimLeft == null) {
    String.prototype.trimLeft = function() {
      return this.replace(RegExp("^" + wses + "+", "g"), "")
    }
  }
  if("".trimRight == null) {
    String.prototype.trimRight = function() {
      return this.replace(RegExp(wses + "+$", "g"), "")
    }
  }
})()

if([].indexOf == null) {
  Array.prototype.indexOf = function(value, begin) {
    var end = this.length
    
    if(begin == null) {  
      begin = -1
    }
    else if(begin < 0) {
      begin += end - 1
      
      if(begin < -1) {
        begin = -1
      }
    }
    else if(begin >= end) {
      return -1
    }
    else {
      --begin
    }
    
    while(++begin < end && this[begin] !== value) {
      
    }
    
    return (begin !== end) ? begin : -1
  }
}

if([].lastIndexOf == null) {
  Array.prototype.lastIndexOf = function(value, end) {
    var len = this.length
    
    if(end == null) {
      end = len
    }
    else if(end < 0) {
      end += len + 1;
      
      if(end < 1) {
        return -1
      }
    }
    else if(end >= len) {
      end = len
    }
    else {
      ++end
    }
    
    while(end-- && this[end] !== value) {
      
    }
    
    return end
  }
}

if(Object.keys == null) {
  var unenumerableObjPropNames = (function() {
    var possibleUnenumerableObjPropNames = "constructor __defineGetter__ __proto__ __parent__ __count__ __defineSetter__ eval hasOwnProperty isPrototypeOf __lookupGetter__ __lookupSetter__ __noSuchMethod__ propertyIsEnumerable toSource toLocaleString toString unwatch valueOf watch".split(/\s+/)
    var obj = {  }
    var i = possibleUnenumerableObjPropNames.length; while(i--) {
      obj[possibleUnenumerableObjPropNames[i]] = 1
    }
    for(var i in obj) {
      possibleUnenumerableObjPropNames.splice(possibleUnenumerableObjPropNames.indexOf(i), 1)
    }
    return possibleUnenumerableObjPropNames
  })()

  Object.keys = function(obj) {
    var out = []
    for(var k in obj) {
      if(obj.hasOwnProperty(k)) {
        out.push(k)
      }
    }
    var i = unenumerableObjPropNames.length; while(i--) {
      var propName = unenumerableObjPropNames[i]
      if(obj.hasOwnProperty(propName)) {
        out.push(propName)
      }
    }
    return out
  }
}

if(Object.getOwnPropertyNames == null) {
  Object.getOwnPropertyNames = Object.keys
}

var forceInstall = 0
var hasOwnProperty = function(obj, k) {
  return {  }.hasOwnProperty.call(obj, k)
}

if(forceInstall || [].forEach == null) {
  Array.prototype.forEach = function(f, that) {
    var i = -1; while(++i < this.length) {
      if(hasOwnProperty(this, i)) {
        f.call(that, this[i], i, this)
      }
    }
  }
}
if(forceInstall || [].map == null) {
  Array.prototype.map = function(f, that) {
    var out = []
    var i = -1; while(++i < this.length) {
      if(hasOwnProperty(this, i)) {
        out[i] = f.call(that, this[i], i, this)
      }
    }
    return out
  }
}
if(forceInstall || [].filter == null) {
  Array.prototype.filter = function(f, that) {
    var out = []
    var i = -1; while(++i < this.length) {
      if(hasOwnProperty(this, i)) {
        if(f.call(that, this[i], i, this)) {
          out.push(this[i]) 
        }
      }  
    }
    return out
  }
}
if(forceInstall || [].every == null) {
  Array.prototype.every = function(f, that) {
    var i = -1; while(++i < this.length) {
      if(hasOwnProperty(this, i)) {
        if(!f.call(that, this[i], i, this)) {
          return no 
        }
      }  
    }
    return yes
  }
}
if(forceInstall || [].some == null) {
  Array.prototype.some = function(f, that) {
    var i = -1; while(++i < this.length) {
      if(hasOwnProperty(this, i)) {
        if(f.call(that, this[i], i, this)) {
          return yes 
        }
      }  
    }
    return no
  }
}
if(forceInstall || [].reduce == null) {
  Array.prototype.reduce = function(f, init) {
    var i = 0

    if(arguments.length == 1) {
      while(i < this.length && !hasOwnProperty(this, i)) {
        i = i + 1
      }
      if(i < this.length) {
        init = this[i]
        i = i + 1
      }
    }  
    while(i < this.length) {
      if(hasOwnProperty(this, i)) {
        init = f(init, this[i], i, this)
      }
      i = i + 1
    }
    return init
  }
}
if(forceInstall || [].reduceRight == null) {
  Array.prototype.reduceRight = function(f, init) {
    var i = this.length - 1

    if(arguments.length == 1) {
      while(i >= 0 && !hasOwnProperty(this, i)) {
        i = i - 1
      }
      if(i >= 0) {
        init = this[i]
        i = i - 1
      }
    }  
    while(i >= 0) {
      if(hasOwnProperty(this, i)) {
        init = f(init, this[i], i, this)
      }
      i = i - 1
    }
    return init
  }
}

var fixCaller = function(proto, name) {
  var oldMethod = proto[name]
  proto[name] = function() {
    return oldMethod.apply(this, arguments)
  }
}

;"forEach map filter some every reduce reduceRight sort".split(/\s+/).forEach(function(name) {
  fixCaller(Array.prototype, name)
})

;"replace".split(/\s+/).forEach(function(name) {
  fixCaller(String.prototype, name)
})

}).call((1, eval)("this"))
