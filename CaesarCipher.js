let str = "Aaa";
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let frequenciesInPercents = [8.2, 1.5, 2.8, 4.3, 13.0, 2.2, 2.0, 6.1, 7.0, 0.15, 0.77, 4.0, 2.4, 6.7, 7.5, 1.9, 0.095, 6.0, 6.3, 9.1, 2.8, 0.98, 2.4, 0.15, 2.0, 0.074];
let alphabetFreq = new Map();
let frequencies = new Array();
for(let freq of frequenciesInPercents)
{
    frequencies.push(freq / 100);
}
for (let i = 0; i < alphabet.length; i++)
{
    alphabetFreq[alphabet[i]] = frequencies[i];
}

function Encode(str, alphabetUpper, shift)
{
    alphabetUpper = alphabetUpper.toUpperCase();
    let result = "";
    for(let char of str)
    {
        if (alphabetUpper.indexOf(char.toUpperCase()) == -1)
            result+=char;
        else
        {
            let index = alphabetUpper.indexOf(char.toUpperCase());
            index = (index + shift) % alphabetUpper.length;
            if (alphabetUpper.indexOf(char) != -1)
                result+=alphabetUpper[index];
            else
                result+=alphabetUpper[index].toLowerCase();

        }
    }
    return result;
}


console.log(Encode(str, alphabet, 27));
