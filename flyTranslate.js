;(function(global, undefined) {
  var join = function() {
    return [].slice.call(arguments, 0).join("")
  }
  var fetchTranslation = function(translateDirection, word, callback) {
    var script = document.createElement("script")
    var scriptInsertDomNode = document.getElementsByTagName("head")[0]
    global.callback = function(obj) {
      scriptInsertDomNode.removeChild(script)
      callback(obj)
    }
    script.src = "".concat('https://dictionary.yandex.net/dicservice.json/lookupMultiple?ui=ru&srv=tr-text&sid=c5e4739c.5aa93729.88d8b6e6&text=', encodeURIComponent(word), '&dict=', encodeURIComponent(translateDirection), '.regular&flags=103&callback=callback')
    scriptInsertDomNode.insertBefore(script, scriptInsertDomNode.firstChild)
  }

  var main = function(args) {
    var htmlEncode = function(s) {
      return he.encode(s)
    }
    fetchTranslation(args["translateDirection"], args["word"], function(data) {
      trDom.innerHTML = "".concat(
        "<ul class=def>", 
        ((data[args["translateDirection"]] || [])["regular"] || []).map(function(def) {
          return join(
            "<li class=def>", 
            join(
              "<span class=text>", htmlEncode(def["text"]), "</span>", 
              "<br>", 
              "<span class=pos>/", htmlEncode((def["pos"] || { text: "" })["text"]), "/</span>", 
              "<ul class=tr>", 
              (def["tr"] || []).map(function(tr) {
                return join(
                  "<li class=tr>",
                  join(
                    [{ text: tr["text"]}].concat(tr["syn"] || []).map(function(syn) {
                      return join(
                        "<span class=syn>", htmlEncode(syn["text"]), "</span>"
                      )
                    }).join(", "), 
                    (function() {
                      var means = tr["mean"] || []
                      if(means.length > 0) {
                        return join(
                          "<br>", 
                          "<span class=means>(", 
                          join(
                            means.map(function(mean) {
                              return join(
                                "<span class=mean>", htmlEncode(mean["text"]), "</span>"
                              )
                            }).join(", ")
                          ), 
                          ")</span>" 
                        )
                      }
                      else {
                        return ""
                      }
                    })(), 
                    "<ul class=ex>", 
                    join(
                      (tr["ex"] || []).map(function(ex) {
                        return join(
                          "<li class=ex>", 
                          join(
                            "<span class=ex>", htmlEncode(ex["text"]), "</span>", 
                            " - ", 
                            (ex["tr"] || []).map(function(tr) {
                              return join(
                                "<span class=tr>", htmlEncode(tr["text"]), "</span>"
                              )
                            }).join(", ")
                          ), 
                          "</li>"  
                        )
                      }).join(" ")
                    ), 
                    "</ul>"
                  ), 
                  "</li>"
                )
              }).join(" "), 
              "</ul>" 
            ),
            "</li>"
          )
        }).join(" "), 
        "</ul>"
      )
      var getDomExpandedSize = function(dom) {
        var outerBox = function(a, b) {
          return {
            top: [
              Math.min(a.top[0], b.top[0]), 
              Math.min(a.top[1], b.top[1])
            ], 
            bottom: [
              Math.max(a.bottom[0], b.bottom[0]), 
              Math.max(a.bottom[1], b.bottom[1])
            ] 
          } 
        }
        var getDomChildren = function(dom) {
          var $r = []
          var i = -1; while(++i < dom.childNodes.length) {
            if(dom.childNodes[i].nodeType == 1) {
              $r.push(dom.childNodes[i])
            }
          }
          return $r
        }
        var parseDecimal = function(s) {
          return parseInt(s, 10)
        }
        var parseBorder = function(s) {
          return {
            "thin": 2, 
            "medium": 4,  
            "thick": 6 
          }[s] || parseDecimal(s)
        }
        var iter = function(dom) {
          var domBoundingClientRect = dom.getBoundingClientRect()
          var computedStyle = dom.currentStyle
          var $r = {
            top: [
              domBoundingClientRect.left - parseDecimal(computedStyle.marginLeft), 
              domBoundingClientRect.top - parseDecimal(computedStyle.marginTop)
            ],  
            bottom: [
              domBoundingClientRect.right + parseDecimal(computedStyle.marginRight), 
              domBoundingClientRect.bottom + parseDecimal(computedStyle.marginBottom)
            ] 
          }
          if(dom.currentStyle.display != "inline") {
            //# ignore infintite expand of block to right
            $r.bottom[0] = $r.top[0]
          }
          $r = ([$r]
            .concat(getDomChildren(dom).map(function(dom) {
              return iter(dom)
            }))
            .reduce(function(a, b) {
              return outerBox(a, b)
            })
          )
          if(dom.currentStyle.display != "inline") {
            //# ignore infintite expand of block to right
            $r.bottom[0] += parseDecimal(computedStyle.marginRight) + parseBorder(computedStyle.borderRightWidth) + parseDecimal(computedStyle.paddingRight)
          }
          return $r
        }
        var $r = iter(dom)
        return $r
      }
      var windowVerticalBorderSize = 55 + 42
      var windowHorizontalBorderSize = 26
      if(location.pathname.match(/\.hta$/)) {
        windowVerticalBorderSize = 22 + 6
        windowHorizontalBorderSize = 6 + 6
      }
      //var x = topDom.getBoundingClientRect()
      //alert([x.left, x.right, x.top, x.bottom, trDom.offsetWidth, trDom.clientWidth, trDom.scrollWidth, trDom.offsetHeight, trDom.clientHeight, trDom.scrollHeight, document.body.scrollWidth, document.body.scrollHeight, document.documentElement.scrollWidth, document.documentElement.scrollHeight].join(" "))
      0 && setTimeout(function() {
        var size = getDomExpandedSize(document.body)
        var size = getDomExpandedSize(trDom)
        //alert([trDom.getElementsByTagName("span")[0].getBoundingClientRect().left].join(" "))
        alert([trDom.offsetLeft, trDom.offsetParent.tagName].join(" "))
        var div = document.createElement("div")
        div.innerHTML = ""
        div.style.cssText = "border: 1px red solid; position: absolute;"
        div.style.left = size.top[0] + "px"
        div.style.top = size.top[1] + "px"
        div.style.width = (size.bottom[0] - size.top[0]) + "px"
        div.style.height = (size.bottom[1] - size.top[1])+ "px"
        alert(div.style.cssText)
        document.body.appendChild(div)
        
      })
      var size = getDomExpandedSize(trDom)
      var windowSize = [size.bottom[0] + windowHorizontalBorderSize, size.bottom[1] + windowVerticalBorderSize] 
      window.resizeTo(windowSize[0], windowSize[1])
      //# window to center of screen
      //alert([screen.availWidth, screen.availHeight, screen.left, screen.availTop, screen.top].join("^"))
      window.moveTo(
        (screen.width - windowSize[0]) / 2, 
        (screen.height - windowSize[1]) / 2
      )
    })
  }      
  
  window.onload = function() {
    document.onkeyup = function() {
      if(event.keyCode == 27) {
        window.close()
      }
    }
    var args = (function() {
      var $r = {  }
      if(location.pathname.match(/\.hta$/)) {
        var argsString = oHTA.commandLine
        var parseArgs = (function() {
          var wordRE = /\S+/.source;
          var doubleQuotedStringRE  = /\"([^\\\"]*\\.)*[^\"]*\"/.source;
          var quotedStringRE = doubleQuotedStringRE.replace(/\"/g, '\'');

          var splitRE = RegExp(
            [
              doubleQuotedStringRE,
              quotedStringRE,
              wordRE,
            ]
            .map(function(s) {
              return "".concat("(", s, ")")
            })
            .join('|')
          , 'g');

          return function(s) {
            var match = null
            var out = []
            splitRE.lastIndex = 0
            while(splitRE.lastIndex < s.length && (match = splitRE.exec(s))) {
              var a = match[0]
              if(a.charAt(0).match(/^[\"\']/)) {
                a = a.slice(1, -1)
              }
              out.push(a)
            }
            return out
          };
        })()
        parseArgs(argsString).slice(1).map(function(argString) {
          var x = argString.split("=")
          if(x.length == 2) {
            $r[decodeURIComponent(x[0])] = decodeURIComponent(x[1])
          }
          else if(x.length == 1) {
            $r[decodeURIComponent(x[0])] = ""
          }
          else {
            throw "Incorrect format"
          }
        })        
      }
      else {
        var argsString = location.search
        argsString.slice(1).split("&").map(function(argString) {
          var x = argString.split("=")
          if(x.length == 2) {
            $r[decodeURIComponent(x[0])] = decodeURIComponent(x[1])
          }
          else if(x.length == 1) {
            $r[decodeURIComponent(x[0])] = ""
          }
          else {
            throw "Incorrect format"
          }
        })        
      }
      return $r
    })()
    
    main(args)
  }
})(this)
