let string = "In mathematics, a differential equation is an equation that relates one or more functions and their derivatives.[1] In applications, the functions generally represent physical quantities, the derivatives represent their rates of change, and the differential equation defines a relationship between the two. Such relations are common; therefore, differential equations play a prominent role in many disciplines including engineering, physics, economics, and biology.";
let t = "func";

console.log(BruteForce(string, t))
console.log(Hash(string, t, GetQuadraticHash, GetNewQuadraticHash))
console.log(Hash(string, t, GetRabinCarpHash, GetNewRabinCarpHash))
console.log(string.indexOf(t))


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
        if (h == tHash)
        {
            res.push(i)
        }
    }
    if (res.length == 0)
        return -1;
    return res;
}
