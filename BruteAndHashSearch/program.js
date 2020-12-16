let fs = require('fs');
let arg = process.argv;
let inputFileName = "input.txt";
let string = fs.readFileSync(inputFileName).toString();
let t = arg[2];


console.log("Actual first coincidence: " + string.indexOf(t));
console.log("Brute Force search: " + BruteForce(string, t));
console.log("Quadratic hash search: " + Hash(string, t, GetQuadraticHash, GetNewQuadraticHash));
console.log("Rabin-Carp hash search: " + Hash(string, t, GetRabinCarpHash, GetNewRabinCarpHash));


function BruteForce(s, t)
{
    var res = new Array();
    for (let i = 0; i <= s.length - t.length; i++)
    {
        for (j = 0;j < t.length;j++)
        {
            if (s[i + j] != t[j])
            {
                break;
            }
            if (j == t.length - 1)
            {
                res.push(i);
            }
        }
    }
    if (res.length == 0)
        return -1;
    return res;
}

function GetQuadraticHash(s, len, startIndex)
{
    let h = 0;
    for (let i = startIndex; i < startIndex + len; i++)
        h += Math.pow(s.charCodeAt(i), 2)
    return h;
}

function GetRabinCarpHash(s, len, startIndex)
{
    let h = 0;
    for (let i = startIndex; i < startIndex + len; i++)
        h += s.charCodeAt(i) * Math.pow(2, len - i - 1)
    return h;
}

function  GetNewQuadraticHash(s, i, h, len)
{
    return h - Math.pow(s.charCodeAt(i - 1), 2) + Math.pow(s.charCodeAt(i + len - 1), 2);
}

function  GetNewRabinCarpHash(s, i, h, len)
{
    return (h - s.charCodeAt(i - 1) * Math.pow(2, len - 1 )) * 2 + s.charCodeAt(len + i - 1);
}

function Hash(s, t, startHash, newHash)
{
    res = new Array();
    let h = startHash(s, t.length, 0);
    let tHash = startHash(t, t.length, 0);
    if (h == tHash)
    {
        res.push(0);
    }
    for (let i = 1; i <= s.length - t.length; i++)
    {
        h = newHash(s, i, h, t.length);
        if (h == tHash && Check(s, t, i))
        {
            res.push(i)
        }
    }
    if (res.length == 0)
        return -1;
    return res;
}

function Check(string, temp, index)
{
    for(let i = 0; i < temp.length; i++)
    {
        if(temp[i] != string[index + i])
            return false;
    }
    return true;
}