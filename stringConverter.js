const map = new Map([
    ['alpha', 'α'],
    ['beta' , 'β'],
]);

function evalMath(str){
    let evaluatedString = "";
    let keys = str.split(" ");
    for(key of keys){
        let res = key;
        res = map.has(res) ? map.get(res) : res;
        evaluatedString += res;
    }
    return evaluatedString;
}

function isValidFormat(str, initStr, endStr){
    // endStr
    if (str.substring(str.length-endStr.length) != endStr)
        return false;

    // iniStr
    let noEndStr = str.substring(0,str.length-endStr.length);
    return noEndStr.lastIndexOf(initStr) != -1;
}

function evalString(str, initStr, endStr){
    let noEndStr = str.substring(0,str.length-endStr.length);
    let id = noEndStr.lastIndexOf(initStr);
    if(id == -1) return str;

    let headString  = str.substring(0,id);
    let validString = str.substring(
        id + initStr.length,
        str.length - endStr.length
    );
    return headString + evalMath(validString, initStr, endStr);
}
