const fs =require('fs')
const process = require('process')
const axios = require('axios')

function handleOutput(text,outPut){
    if(outPut){
        fs.writeFile(outPut,text,'utf8',(err)=>{
            console.log("ERROR",err)
            process.exit(1)
        
        })
    }else{
        console.log(text);
    }

}
function cat(path,outPut){
    fs.readFile(path,'utf8', (err,data)=>{
        if (err){
            console.log('ERROR',err);
            process.exit(1);
        }else{
            handleOutput(data,outPut);
        }
    });
}
async function webCat(url){
    try{
        let res = await axios.get(url);
        handleOutput(res.data,outPut)
    } catch(err){
        console.log("ERROR:",err)
        process.exit(1)
    }

}
let path;
let outPut;
if (process.argv[2] === '--out') {
    outPut = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}
if  (path.includes('http')){
    webCat(path,outPut)
}else{
    cat(path,outPut)
}
