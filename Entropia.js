let fs = require('fs');
let arg = process.argv;
fs.readFile(arg[2], (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let H=0;
    let str = data.toString();
    let alphabet = new Map();
    let count=0;
    for(let i =0;i<str.length;i++)
    {
        let elem=str[i];
        if (elem in alphabet)
        {
            alphabet[elem]++;
        }
        else
        {
            count++;
            alphabet[elem]=1;
        }
    }
    for(let i = 0;i<Object.values(alphabet).length;i++)
    {
        if (str.length!=0)
        {
            let p =(Object.values(alphabet)[i])/str.length;
            H+=p*Math.log2(p);
        }
        else
        {
            H=0;
        }
    }
    if(H==0)
    {
        console.log(H);
    }
    else
    {
        console.log(-1*H);
    }
});
