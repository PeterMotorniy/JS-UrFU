let fs = require ('fs');
let inputStr = fs.readFileSync('input.txt').toString();
let alphabet = new Array();
let huffmanTree = new Array();

function Node(symbol, freq, used, parent, code){
    this.parent = parent;
    this.letter = symbol;
    this.used = used;
    this.freq = freq;
    this.code = code;
}

for(let i = 0; i < inputStr.length; i++)
{
    alphabet [inputStr.charAt(i)] = 0;
}

for(let i = 0; i < inputStr.length; i++)
{
    alphabet [inputStr.charAt(i)]++;
}

for(i in alphabet){
    let newNode = new Node(i, alphabet[i], false, null, '');
    huffmanTree.push(newNode);
}

let treeLength = huffmanTree.length;
for (let i = 0; i < treeLength - 1; i++){
    let firstMinInd = -1;
    let firstMinFrequency = inputStr.length;
    let secondMinInd = -1;
    let secondMinFrequency = inputStr.length;
    for(let j = 0; j < huffmanTree.length; j++){
        if((huffmanTree[j].used == 0) && (huffmanTree[j].freq <= firstMinFrequency))
        {
            secondMinInd = firstMinInd;
            firstMinInd = j;
            secondMinFrequency = firstMinFrequency;
            firstMinFrequency = huffmanTree[j].freq;
        }
        else if ((huffmanTree[j].used == 0) && (huffmanTree[j].freq <= secondMinFrequency))
        {
            secondMinInd = j;
            secondMinFrequency = huffmanTree[j].freq;
        }

    }
    huffmanTree.push(new Node(huffmanTree[secondMinInd].letter + huffmanTree[firstMinInd].letter, firstMinFrequency + secondMinFrequency, false, null, ''));
    huffmanTree[firstMinInd].used = true;
    huffmanTree[secondMinInd].used = true;
    huffmanTree[firstMinInd].parent = huffmanTree.length - 1;
    huffmanTree[secondMinInd].parent = huffmanTree.length - 1;
    huffmanTree[firstMinInd].code = '0';
    huffmanTree[secondMinInd].code = '1';
}

if (treeLength > 1)
{
    for (let i = 0; i < treeLength; i++)
    {
        let par = huffmanTree[huffmanTree[i].parent];
        while (par.parent != null)
        {
            huffmanTree[i].code = par.code + huffmanTree[i].code;
            par = huffmanTree[par.parent];
        }
    }
}
else
{
    huffmanTree[0].code = '0';
}

for (let i = 0; i < treeLength; i++)
{
    console.log(huffmanTree[i].letter + " : " + huffmanTree[i].code);
}


let codeString = "";
for (let i = 0; i < inputStr.length; i++)
{
    for (let j = 0; j < treeLength; j++)
    {
        if (inputStr[i] == huffmanTree[j].letter)
        {
            codeString += huffmanTree[j].code;
            break;
        }
    }
}
console.log("Encoded string:")
console.log(codeString);

let decodeString = "";
let codes = "";
for (let i = 0; i < codeString.length; i++)
{
    codes += codeString[i];
    for (let j = 0; j < treeLength; j++)
    {
        if (codes == huffmanTree[j].code)
        {
            decodeString += huffmanTree[j].letter;
            codes = "";
            break;
        }
    }
}
console.log("Decoded string:")
console.log(decodeString);
