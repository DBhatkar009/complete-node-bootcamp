const fs = require('fs');

const textIn = fs.readFileSync("./txt/input.txt", 'utf-8');
console.log(textIn);

const textOut = `This is what about Avacado🥑 for: ${textIn}. \n Created On ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut); 

// const fname = "Dhananjay Bhatkar"
// console.log(fname);
