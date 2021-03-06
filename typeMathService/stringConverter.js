const simpleMap = new Map([
    ...symbolGreekMap,
    ...symbolSetAndLogicMap,
    ...symbolDomainMap,
    ...symbolEqualityMap,
    ...symbolCalculusMap,
    ...symbolMiscMap
]);
// const latexMath = new Map([
// const latexDiacritic = new Map([

// Replace series of character after c using map
function replaceScript(str, c, scriptMap){
    if (!str.includes(c)) return str;
    let keys = str.split(c);
    let unicode = "";
    for (ch of keys.pop()){
        unicode += scriptMap.has(ch) ? scriptMap.get(ch) : ch;
    }
    return keys.join("") + unicode;
}

function replaceSuperscript(str){
    return replaceScript(str, '^', superscriptMap);
}

function replaceSubscript(str){
    return replaceScript(str, '_', subscriptMap);
}

function isValidFormat(str, initStr, endStr){
    if(str.length <= endStr.length) return false;
    if(str.length <= endStr.length + initStr.length) return false;

    // endStr
    if (str.substring(str.length-endStr.length) != endStr)
        return false;

    // iniStr
    let noEndStr = str.substring(0,str.length-endStr.length);
    return noEndStr.lastIndexOf(initStr) != -1;
}

function addSpaceToOperator(str){
    if (str == '+') return " + ";
    if (str == '-') return " - ";
    if (str == '=') return " = ";
    if (str == '' ) return " ";
    return str;
}

function evalMath(str, useAdditionalSym, useDiacritics, latexMode, keepSpace){
    let evaluatedString = "";
    let keys = str.split(" ");
    for(key of keys){
        let res = key;
        res = replaceSuperscript(res);
        res = replaceSubscript(res);
        res = simpleMap.has(res) ? simpleMap.get(res) : res;
        if(!keepSpace)       res = addSpaceToOperator(res);
        if(useDiacritics)    res = latexDiacritic.has(res) ? latexDiacritic.get(res) : res;
        if(useAdditionalSym) res = latexMath.has(res)      ? latexMath.get(res)      : res;
        evaluatedString += res;
    }
    return evaluatedString;
}

function evalString(str, initStr, endStr, 
    useAdditionalSym, useDiacritics, latexMode, keepSpace)
{
    let noEndStr = str.substring(0, str.length - endStr.length);
    let id = noEndStr.lastIndexOf(initStr);
    if(id < 0) return str;

    let headString  = str.substring(0,id);
    let validString = str.substring(
        id + initStr.length,
        str.length - endStr.length
    );
    return headString + evalMath(validString, useAdditionalSym, useDiacritics, latexMode, keepSpace);
}

// replaceScript(str: String, c: Char, scriptMap: LinkedHashMap<Char,Char>): String{
// TODO: replaceScriptLatex(str: String, c: Char, scriptMap: LinkedHashMap<Char,Char>): String{
// TODO: replaceFracLatex(str: String): String{
// TODO: replaceDiacriticLatex(str: String): String{
// replaceSuperscript(str: String): String{
// replaceSubscript(str: String): String{
// TODO: replaceSuperscriptLatex(str: String): String{
// TODO: replaceSubscriptLatex(str: String): String{
// TODO: replaceStringLatex(str: String): String{
// TODO: replaceCustomStringLatex(str: String): String{
// isValidFormat(str: String, initStr: String, endStr: String): Boolean {
// addSpaceToOperator(str: String): String {
// TODO: evalFraction(str: String): String {
// TODO: (partial) evalMath(str: String,
// evalString(str: String, initStr: String, endStr: String,
