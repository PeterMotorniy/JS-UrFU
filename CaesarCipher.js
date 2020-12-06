let str = "abbbbbbbbbbbb";
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
            {
                result+=alphabetUpper[index].toLowerCase();
            }

        }
    }
    return result;
}

function Decode(str, alphabetUpper, alphabetFreq)
{
    let letter = "";
    let count = 0;
    for(let char of str)
    {
        if(alphabetUpper.indexOf(char.toUpperCase()) != -1)
        {
            letter = char;
            break;
        }
    }
    letter = letter.toUpperCase();
    for(let char of str)
    {
        if(char.toUpperCase() == letter)
        {
            count++;
        }
    }
    let freq = count / str.length;
    let delta = Number.MAX_VALUE;
    let newLetter = "";
    console.log(freq);
    for(let char in alphabetFreq)
    {
        if(Math.abs(freq - alphabetFreq[char]) < delta)
        {
            delta = Math.abs(freq - alphabetFreq[char]);
            newLetter = char;
        }
        console.log(letter + " " + char + " " + delta)
    }
    let shift = alphabetUpper.indexOf(newLetter) - alphabetUpper.indexOf(letter);
    console.log(Encode(str, alphabetUpper, shift));
}


console.log(Encode(str, alphabet, 2));
Decode(str, alphabet, alphabetFreq);
