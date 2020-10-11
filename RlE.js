let fs = require('fs');
let arg = process.argv;
let inf = arg[3];
let outf = arg[4];
if (arg[2]=="code")
{
    code(inf,outf);
}
if (arg[2]=="decode")
{
    decode(inf,outf);
}

function code(infile,outfile)
{
    let inText;
    let i = 0, n = 1;
    let resStr = '';
    inText = fs.readFileSync(infile);

    inText = inText.toString();

    while (i < inText.length){
        while(inText.charAt(i) == inText.charAt(i+n))
            n++;
        nJump = n;
        while( n >=255){
            resStr += '#' + String.fromCharCode(255) + inText.charAt(i);
            n -=255;
        }
        if ((n > 3) || (inText.charAt(i) == '#'))
            resStr += '#' + String.fromCharCode(n) + inText.charAt(i)
        else
            for(k = 0; k < n; k++)
                resStr += inText.charAt(i);
        i += nJump;
        n = 1;
    }
    fs.writeFileSync(outfile, resStr);
}
function decode(infile,outfile)
{
    let decodedStr="";
    let i =0;

    let outText=fs.readFileSync(infile);
    outText=outText.toString();
    while (i<outText.length-2)
    {
        let symb = outText.charAt(i);
        if(symb=='#')
        {


            decodedStr+=outText.charAt(i+2).repeat(outText.charCodeAt(i+1));


        }
        else
        {
            decodedStr+=outText.charAt(i);
        }
        i++;
    }
    if (outText.charAt(i-1)!='#')
    {
        decodedStr+=outText.charAt(i)
        decodedStr+=outText.charAt(i+1)
    }
    fs.writeFileSync(outfile, decodedStr);
}

