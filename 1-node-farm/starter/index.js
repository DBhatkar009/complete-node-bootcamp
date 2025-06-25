const fs = require('fs');

//Blocking, synchronous way 
// const textIn = fs.readFileSync("./txt/input.txt", 'utf-8');
// console.log(textIn);

// const textOut = `This is what about Avacado🥑 for: ${textIn}. \n Created On ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut); 

// const fname = "Dhananjay Bhatkar"
// console.log(fname);

// non-Blocking asynchronous way
fs.readFile("./txt/start.txt", 'utf-8', (err, data1) => {
    if(err) return console.log("ERROR..😮");
     
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);
            fs.readFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
                console.log('your data just written 😊');
                
            });
        });
    });
});

console.log('this will read');

