

function rleDecompress(text){
    let result = ''

    for (let i=0;i<text.length-1;i++){
        if (i%2===0) result+=text.charAt(i+1).repeat(parseInt(text.charAt(i)))
    }

    return result
}

module.exports =  {rleDecompress}