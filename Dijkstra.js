let p = new Map();
p["+"] = 1;
p["-"] = 1;
p["*"] = 2;
p["/"] = 2;
p["^"] = 3;
p["("] = 0;
let stack = new Array();
s="(1+2*3^25^37)*(1-2)/(4-(1+2*4))";
//s = "2^3^4";
let total = "";
for (i=0;i<s.length;i++)
{
    if (s[i] == ")")
    {
        while(stack[stack.length - 1] != "(" )
        {
            total+= stack[stack.length - 1];
            stack.splice( - 1, 1);
        }
        stack.splice( - 1, 1);
    }
    else if (s[i] in p )
    {
        if (total.length > 0 && total[total.length - 1] != "," && !(total[total.length - 1] in p))
            total+=",";
        if (stack.length == 0 || p[s[i]] > p[stack[stack.length - 1]] || s[i] == "(" || s[i] == "^")
            stack.push(s[i]);
        else
        {
            while(p[s[i]] <= p[stack[stack.length - 1]]  )
            {
                if (s[i] != "(")
                    total+= stack[stack.length - 1];

                stack.splice( - 1, 1);
            }
            stack.push(s[i]);
        }
    }
    else
        if (s[i] != ")")
        total+=s[i];
}
for (i=1;i <= stack.length;i++)
    total +=stack[stack.length - i];
console.log(total);
