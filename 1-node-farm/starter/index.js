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

const replaceElement = (temp, product) => {
   let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
   output = output.replace(/{%IMAGE%}/g, product.image);
   output = output.replace(/{%PRICE%}/g, product.price);
   output = output.replace(/{%QUANTITY%}/g, product.quantity);
   output = output.replace(/{%DESCRIPTION%}/g, product.description);
   output = output.replace(/{%VITAMIN-A & VITAMIN-B%}/g, product.nutrients);
   output = output.replace(/{%ID%}/g, product.id);
   output = output.replace(/{%FROM%}/g, product.from);

   if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'); 
   return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8'); 
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8'); 
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');  
const dataObj = JSON.parse(data); 

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    //Overview Page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
 
    const cardHolder = dataObj.map(el => replaceElement(tempCard, el)).join('');
    const output = tempOverview.replace(`{%PRODUCT_CARD%}`, cardHolder);  
        res.end(output); 

    //Product page   
    } else if(pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceElement(tempProduct, product);
        res.end(output);
   
    //Api    
    } else if(pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
         res.end(data)
    } 
    //Not Found
    else {
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