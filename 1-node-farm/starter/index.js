const fs = require('fs');
const http = require('http');
const url = require('url');
//////////////////////////////////////////////////////////////////////////////////////////////
// Files
//Blocking, synchronous way 
// const textIn = fs.readFileSync("./txt/input.txt", 'utf-8');
// console.log(textIn);

// const textOut = `This is what about Avacado🥑 for: ${textIn}. \n Created On ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut); 

// const fname = "Dhananjay Bhatkar"
// console.log(fname);

// non-Blocking asynchronous way
// fs.readFile("./txt/start.txt", 'utf-8', (err, data1) => {
//     if(err) return console.log("ERROR..😮");
     
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.readFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
//                 console.log('your data just written 😊');
                
//             });
//         });
//     });
// });

// console.log('this will read');

//////////////////////////////////////////////////////////////////////////////////////////////
// Server

 const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8'); 
            const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){

        res.end('You are on OVERVIEW!'); 
    } else if(pathName === '/product'){

        res.end('You are on PRODUCT!');
    } else if(pathName === '/Api') {
            res.writeHead(202, {'Content-type': 'Application/json'});
            res.end(data);
   

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'This is Node.js Server!'
        });
        res.end('<h1>PAGE NOT FOUND!!</h1>');
    }
})

server.listen(3000, '127.0.0.1', () => {
 console.log('Server is listening on 3000 portal');
 
})