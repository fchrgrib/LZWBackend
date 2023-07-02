function binaryToAscii(binaryCode) {
    const binaryArray = binaryCode.split(' ');
    const decimalArray = binaryArray.map(binary => parseInt(binary, 2));
    return String.fromCharCode(...decimalArray);
}

function arrayOfAsciiString(){
    let result =[]
    for (i=0;i<256;i++){
        result.push(String.fromCharCode(i))
    }
    return result
}

function mapOfAsciiString(){
    let result = new Map()
    for (i=0;i<256;i++){
        result.set(i,String.fromCharCode(i))
    }
    return result
}

function binaryToInt(binary){
    const arrOfBinary = binary.split(" ")
    let result = []
    for(const bin of arrOfBinary){
        result.push(parseInt(bin,2))
    }
    return result.filter((value)=>!isNaN(value))
}

module.exports = {
    binaryToAscii,
    arrayOfAsciiString,
    binaryToInt,
    mapOfAsciiString
}