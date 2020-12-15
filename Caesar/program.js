let fs = require('fs');
let arg = process.argv;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let statisticsFileName = "stat.txt";
let inputFileName = "text.txt";
let codeFileName = "code.txt";
let decodeFileName = "decode.txt";
let shift = 13;

let code = Encode(alphabet, fs.readFileSync(inputFileName).toString(), shift);
fs.writeFileSync(codeFileName, code);
fs.writeFileSync(decodeFileName, Decode(alphabet, code));

function GetFrequencies(alphabet, text)
{
    alphabet = alphabet.toUpperCase();
    let frequencies = new Map();
    for(let letter of alphabet)
        frequencies[letter] = 0;

    for(let symbol of text)
    {
        if(alphabet.indexOf(symbol.toUpperCase()) != -1)
                frequencies[symbol.toUpperCase()] += 1/text.length;
    }
    return frequencies;
}

function Encode(alphabet, text, shift)
{
    alphabet = alphabet.toUpperCase();
    let result = "";
    for(let symbol of text)
    {
        let newSymbol = '';
        if(alphabet.indexOf(symbol.toUpperCase()) != -1)
            newSymbol = alphabet[(alphabet.indexOf(symbol.toUpperCase()) + shift) % alphabet.length];
        else
            newSymbol = symbol;

        if(symbol.toUpperCase() != symbol)
            newSymbol = newSymbol.toLowerCase();
        result += newSymbol.toString();
    }
    return result;
}

function Decode(alphabet, text)
{
    alphabet = alphabet.toUpperCase();
    let frequencies = GetFrequencies(alphabet, fs.readFileSync(statisticsFileName).toString());
    let newFrequencies = GetFrequencies(alphabet, text);
    let minDelta = Number.MAX_VALUE;
    let totalShift = 0;
    for(let shift = 0; shift < alphabet.length; shift++)
    {
        let delta = 0;
        for(let i = 0; i < alphabet.length; i++)
        {
            delta += Math.pow(newFrequencies[alphabet[i]] - frequencies[alphabet[(i + shift) % alphabet.length]], 2);
        }
        if(delta < minDelta)
        {
            minDelta = delta;
            totalShift = shift;
        }
    }
    return Encode(alphabet, text, totalShift);
}