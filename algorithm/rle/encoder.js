

function rleCompress(text){
    let result = ''
    let sumOfChar =1

    for(let i=0;i<text.length;i++){
        try{
            if (text.charAt(i)===text.charAt(i+1)) sumOfChar++
            else {
                result+=`${sumOfChar}${text.charAt(i)}`
                sumOfChar=1
            }

        }catch (e){
            result+=`${sumOfChar}${text.charAt(i)}`
        }
    }

    return result
}

module.exports = {rleCompress}