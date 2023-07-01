const {binaryToInt,arrayOfAsciiString,mapOfAsciiString} = require("../../utils/utils")

function lzwDecompress(binary){
    const decimal = binaryToInt(binary)
    const pattern = 'undefined'
    let arrOfAscii = arrayOfAsciiString()
    let result = ''
    let checkChars = arrOfAscii[decimal[0]]
    const replace = /undefined/g;

    for (let i=0;i<decimal.length;i++){
        try {
            result += arrOfAscii[decimal[i]]
            checkChars += arrOfAscii[decimal[i+1]][0]
            let check=1
            while (arrOfAscii.includes(checkChars)) {
                checkChars+=arrOfAscii[decimal[i+1]][check]
                check++
            }
            (checkChars.match(pattern))?arrOfAscii.push(checkChars.replace(replace,'')):arrOfAscii.push(checkChars)
            checkChars = arrOfAscii[decimal[i+1]]
        }catch (e) {
            if (!arrOfAscii.includes(checkChars+arrOfAscii[decimal[i]][0])) arrOfAscii.push(checkChars+arrOfAscii[decimal[i]][0])
            checkChars = arrOfAscii[decimal[i+1]]
        }
    }

    return result
}

module.exports = {
    lzwDecompress
}