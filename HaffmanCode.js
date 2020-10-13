let fs = require('fs');
let arg = process.argv;
let inputStr = arg[2];
inputStr=inputStr.toString();
let alphabet = new Map();
let count = 0;
for(let i = 0;i<inputStr.length;i++)
{
    let elem=inputStr[i];
    if (elem in alphabet)
    {
        alphabet[elem]++;
    }
    else
    {
        count++;
        alphabet[elem] = 1;
    }
}
let codes = new Map();
let code = "";
for (let i = 0; i < Object.keys(alphabet).length; i++)
{
    let max = -1;
    let maxLet = "";
    for (let i of Object.keys(alphabet))
    {
        if (alphabet[i] > max)
        {
            max = alphabet[i];
            maxLet = i;
        }
    }
    alphabet[maxLet] = -1;
    if (i != Object.keys(alphabet).length - 1)
    {
        codes[maxLet] = (code+"0");
    }
    else
    {
        codes[maxLet] = (code);
    }
    code = code + "1";
}
console.log(codes)
let codedStr=""
for (let i = 0; i < inputStr.length; i++)
{
    codedStr += codes[inputStr[i]];
}
console.log(codedStr);
let currentCode = "";
let decodedStr = "";
let e = 0;
for (let i = 0; i<codedStr.length; i++)
{
    for (let j = 0; j<Object.values(codes).length; j++)
    {
        if (Object.values(codes)[j]==currentCode)
        {
            decodedStr += Object.keys(codes)[j]
            currentCode = "";
            continue;
        }
    }
    currentCode+=codedStr[i];
}
for (let j = 0;j<Object.values(codes).length;j++)
{
    if (Object.values(codes)[j] == currentCode)
    {
        decodedStr += Object.keys(codes)[j];
    }
}
console.log(decodedStr);
