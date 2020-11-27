let string = "Anyone who reads Old and Middle English literary texts will be familiar with the mid-brown volumes of the EETS, with the symbol of Alfred's jewel embossed on the front cover. Most of the works attributed to King Alfred or to Aelfric, along with some of those by bishop Wulfstan and much anonymous prose and verse from the pre-Conquest period, are to be found within the Society's three series; all of the surviving medieval drama, most of the Middle English romances, much religious and secular prose and verse including the English works of John Gower, Thomas Hoccleve and most of Caxton's prints all find their place in the publications. Without EETS editions, study of medieval English texts would hardly be possible.";
let temp = "the";
console.log(PrefixAlgorithm(temp,string));
console.log(string.indexOf(temp));
console.log(AutomatSearch(temp, string));

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
