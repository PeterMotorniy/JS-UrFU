let fs = require('fs');
let arg = process.argv;
let inputFileName = "input.txt";
let temp = arg[2];
let string = fs.readFileSync(inputFileName).toString();

console.log("Actual  first coincidence: " + string.indexOf(temp));
console.log("Prefix search: " + PrefixAlgorithm(temp,string));
console.log("Automata search: " + AutomatSearch(temp, string));

function PrefixAlgorithm(template, string)
{
    let result = new Array()
    let pi = [];
    let templatePosition = 2;
    let k = 0;

    pi[0] = -1;
    pi[1] = 0;
    while (templatePosition < template.length) {
        if (template[templatePosition - 1] == template[k])
        {
            k++;
            pi[templatePosition] = k;
            templatePosition++;
        } else if (k > 0)
        {
            k = pi[k];
        } else
        {
            pi[templatePosition] = 0;
            templatePosition++;
        }
    }

    let foundIndex = 0;
    let i = 0;
    while (foundIndex + i < string.length)
    {
        if (template[i] == string[foundIndex + i])
        {
            if (i == template.length - 1)
            {
                result.push(foundIndex);
            }
            i = i + 1;
        } else
        {
            if (pi[i] > -1)
            {
                foundIndex = foundIndex + i - pi[i];
                i = pi[i];
            } else
            {
                i = 0;
                foundIndex = foundIndex + 1;
            }
        }
    }
    if (result.length == 0)
        return -1;
    return result;
}

function AutomatSearch(t, string)
{

    let result = new Array();
    m = t.length;
    alph = new Array();
    let indexes = new Array();
    for(i = 0; i < m; i++)
    {
        alph[t.charAt(i)] = 0;
    }
    del=new Array(m + 1);
    for(j = 0; j <= m; j++)
        del[j] = new Array();

    for(i in alph)
        del[0][i] = 0;
    for(j = 0; j < m; j++){
        prev = del[j][t.charAt(j)];
        del[j][t.charAt(j)] = j + 1;
        for(i in alph)
            del[j + 1][i] = del[prev][i];
    }
    let numb = 0;
    for(i in alph)
    {
        indexes[i] = numb;
        numb++;
    }
    s = new Array();
    for(j = 0; j <= m; j++)
    {
        s[j] = new Array();
        for(i in alph)
        {
            s[j].push(del[j][i]);

        }

    }
    let status = 0;
    for (let i = 0; i < string.length; i++)
    {
        let readLetter = string[i];
        if (indexes[readLetter] != undefined)
            status = (s[status][indexes[readLetter]]);
        else
            status = 0;
        if (status == t.length)
        {
            found = true;
            result.push(i - m + 1);
        }
    }
    if (result.length == 0)
        return -1;
    return result;
}