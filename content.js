function oneTime(textArea){
    let useAdditionalSym = false;
    let useDiacritics    = true;
    let latexMode        = false;
    let keepSpace        = false;

    chrome.storage.sync.get({
        useAdditionalSym : false,
        useDiacritics    : true,
        latexMode        : false,
        keepSpace        : false
    }, function(items) {
        useAdditionalSym = items.useAdditionalSym;
        useDiacritics    = items.useDiacritics   ;
        latexMode        = items.latexMode       ;
        keepSpace        = items.keepSpace       ;
    });


    let cursorPos = textArea.selectionEnd;
    // console.log(cursorPos);
    let textVal   = textArea.value;
    let headStr   = textVal.substring(0,cursorPos);
    let tailStr   = textVal.substring(cursorPos);
    // console.log("head: " + headStr);
    // console.log('tail: ' + textVal.substring(cursorPos));
    let initStr = ";";
    let endStr  = ";";

    let valid = isValidFormat(headStr, initStr, endStr);
    // console.log(valid);
    if(valid){
        let noEndStr = headStr.substring(0, headStr.length - endStr.length);
        let id = noEndStr.lastIndexOf(initStr);
        let validString = noEndStr.substring(id + initStr.length);
        let converted    = evalMath(validString,
            useAdditionalSym, useDiacritics, latexMode, keepSpace
        );

        textArea.selectionStart = id;
        textArea.selectionEnd = cursorPos;
        document.execCommand('insertText', false, converted);
    }
}

function invokeNabla(textArea){
    // TODO: One key mode, Listener;
    // for  now, one key mode
    // console.log(textArea.value);
    oneTime(textArea);
}

document.addEventListener('keydown', function(event) {
    // 190 : Period
    if(event.keyCode == 190 && event.ctrlKey && !event.altKey && !event.shiftKey){
        const active = document.activeElement;
        if(active.type == 'textarea'){
            invokeNabla(active);
        }
        // console.log(active.type);
    }
});
