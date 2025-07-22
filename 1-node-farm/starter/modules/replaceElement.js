module.exports = (temp, product) => {
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