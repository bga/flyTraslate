; (c) MIT License

; config
primaryLang := "ru"
seconaryLang := "en"
seconaryLangRegExpTest := "[a-zA-Z]"

stringTrim(s) {
  return RegExReplace(s, "^\s+|\s+$", "")
}

_winGetClass(id) {
  out := ""
  WinGetClass out, ahk_id %id%
  return out
}

isCmd() {
  return _winGetClass(WinExist("A")) == "ConsoleWindowClass"
}

copyText() {
  if(isCmd()) {
    return ""
  }
  lastClipboad := clipboardAll

  text := ""
  clipboard := ""
  
  SendInput ^{Ins} ; copy
  ClipWait 0.01
  text := clipboard
  
  clipboard := lastClipboad
  return text
}


; { alt + > } 
!vkBE::
  text := stringTrim(copyText())
  direction := ""
  if(RegExMatch(text, seconaryLangRegExpTest) != 0) {
    direction=%seconaryLang%-%primaryLang%
  }
  else {
    direction := primaryLang . "-" . seconaryLang
  }
  Run %A_ScriptDir%\flyTranslate.hta "translateDirection=%direction%" "word=%text%", , Hide
return
