let s = "abcabc";
let T = "abc";
console.log(BoyerMooreSearch(s, T));
function BoyerMooreSearch(s,T)
{
    let shift1 = 0;
    let shift2 = GetShift2(T);
    N=new Array();
    m = T.length;
    for(j=0;j<m;j++)
        N[T.charAt(j)]=j+1;

    let res = new Array();
    let i = 0;
    while (i <=  s.length - m)
    {
        let l = Check(s, T, i + m - 1);
        let char = s[i + m - l - 1];
        if (l == m)
        {
            res.push(i)
            shift1 = 1;
        }
        else if (N[char] == undefined)
            shift1 = m;
        else
            shift1 = Math.max(1, m - N[char] - l)
        i += Math.max(shift1, shift2[l]);
    }
    if (res.length == 0)
        return -1;
    else
        return res;
}

function GetShift2(T)
{
    let shift2 = new Array();
    let newT = "";
    let suffix = "";
    for(let i = 0; i <= T.length; i++)
        newT += '*'

    newT += T;
    let badSymbol = T[T.length - 1];
    for(let j = newT.length - 2; j >= 0; j--)
    {
        if(newT[j - suffix.length] != badSymbol)
        {
            shift2.push(newT.length  - j - 1);
            break;
        }
    }
    for(let i = 1; i <= T.length; i++)
    {
        suffix = T[T.length - i] + suffix;
        badSymbol = T[T.length - i - 1];
        for(let j = newT.length - 2; j >= 0; j--)
        {
            if(Check(newT, suffix, j) == suffix.length && newT[j - suffix.length] != badSymbol)
            {
                shift2.push(newT.length  - j - 1);
                break;
            }
        }
    }
    return shift2;
}

function Check(string, T, index)
{
    let l = 0;
    let tIndex = T.length - 1;
    while((string[index] == T[tIndex] || string[index] == '*') && l < T.length)
    {
        l++
        tIndex--;
        index--;
    }
    return l;
}
