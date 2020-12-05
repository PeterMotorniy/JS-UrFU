let str = "Yeah man can you hear me";
let alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let alphabetLower = alphabetUpper.toLowerCase();

let alphabetUpperFreq = new Map();
let alphabetLowerFreq = new Map();
for(let char of alphabetUpper)
{
    alphabetUpperFreq[char] = 0;
}
let frequenciesInPercents = [8.2, 1.5, 2.8, 4.3, 13.0, 2.2, 2.0, 6.1, 7.0, 0.15, 0.77, 4.0, 2.4, 6.7, 7.5, 1.9, 0.095, 6.0, 6.3, 9.1, 2.8, 0.98, 2.4, 0.15, 2.0, 0.074];
let frequencies = new Array();
for(let freq of frequenciesInPercents)
{
    frequencies.push(freq / 100);
}
for (let i = 0; i < alphabetUpper.length; i++)
{
    alphabetUpperFreq[alphabetUpper[i]] = frequencies[i];
    alphabetLowerFreq[alphabetUpper[i].toLowerCase()] = frequencies[i];
}
console.log(alphabetLowerFreq);

function Encode(str, alphabetLower, shift)
{
    let alphabetUpper = alphabetLower.toUpperCase();
    let result = "";
    for(let char of str)
    {
        if (alphabetLower.indexOf(char) == -1 && alphabetUpper.indexOf(char) == -1)
            result+=char;
        else if (alphabetUpper.indexOf(char) != -1)
        {
            index = alphabetUpper.indexOf(char);
            index = (index + shift) % alphabetUpper.length;
            result+=alphabetUpper[index];
        }
        else
        {
            index = alphabetLower.indexOf(char);
            index = (index + shift) % alphabetLower.length;
            result+=alphabetLower[index];
        }
    }
    return result;
}
let a = Encode(str, alphabetLower, 24);
console.log(a == "Wcyf kyl ayl wms fcyp kc");
