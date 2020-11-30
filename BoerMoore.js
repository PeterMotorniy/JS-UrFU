let s = "fhgkdjhgfjkljgklfdjgjdfhjgkdjflkgk"
let T = "kd"
console.log(BoyerMooreSearch(s,T))

function BoyerMooreSearch(s,T)
{
    N=new Array();
    m = T.length;
    for(j=0;j<m;j++)
        N[T.charAt(j)]=j+1;

    let res = new Array();
    let i = 0;
    while (i <=  s.length - m)
    {
        let l = 0;
        while (s[i + m - 1 - l] == T[m - 1 - l])
        {
            if (l == m)
                break
            l++;
        }
        if (l == m)
            res.push(i)
        let char = s[i + m - l - 1];
        if (N[char] == undefined)
            i += m;
        else
            i+= Math.max(1, m - N[char] - l)
    }
    if (res.length == 0)
        return -1;
    else
        return res;
}
