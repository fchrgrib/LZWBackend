
const {arrayOfAsciiString} = require("../../utils/utils");
const {rleCompress} = require("../rle/encoder");


function lzwCompress(compText){

    let result = ""
    let checkChars = compText.charAt(0)
    let arrOfAscii = arrayOfAsciiString()

    for (let i=0;i<compText.length;i++){
        if (arrOfAscii.includes(checkChars)){
            let check = 1;
            while (arrOfAscii.includes(checkChars)&&check<compText.length){
                checkChars += compText.charAt(i+check)
                check++
            }
            result += (i===compText.length-1)
                ? arrOfAscii.indexOf(checkChars.slice(0,check-1)).toString(2).padStart(8, '0')
                : `${arrOfAscii.indexOf(checkChars.slice(0,check-1)).toString(2).padStart(8, '0')} `
            i += check-2
        }else{
            arrOfAscii.push(checkChars)
            checkChars = compText.charAt(i)
            i--
        }
    }

    return result
}

module.exports = {
    lzwCompress
}