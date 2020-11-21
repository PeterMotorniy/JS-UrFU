let factorialProgram = new Array();
factorialProgram[0] = "input 0 5";
factorialProgram[1] = "input 1 0";
factorialProgram[2] = "input 2 1";
factorialProgram[3] = "input 3 1";
factorialProgram[4] = "add 1 2 1";
factorialProgram[5] = "mult 3 1 3";
factorialProgram[6] = "if";
factorialProgram[7] = "compare 1 l 0 5";
factorialProgram[8] = "goto 3";
factorialProgram[9] = "print 3";
CompileProgram(factorialProgram);



let algorithmOfEuclid = new Array();
algorithmOfEuclid[0] = "input 0 12";
algorithmOfEuclid[1] = "input 1 16";
algorithmOfEuclid[2] = "if";
algorithmOfEuclid[3] = "compare 0 b 1 2";
algorithmOfEuclid[4] = "subtr 0 1 0";
algorithmOfEuclid[5] = "if";
algorithmOfEuclid[6] = "compare 1 b 0 2";
algorithmOfEuclid[7] = "subtr 1 0 1";
algorithmOfEuclid[8] = "if";
algorithmOfEuclid[9] = "compare 1 e 0 2";
algorithmOfEuclid[10] = "print 1";
algorithmOfEuclid[11] = "if";
algorithmOfEuclid[12] = "compare 1 e 0 2";
algorithmOfEuclid[13] = "break";
algorithmOfEuclid[14] = "if";
algorithmOfEuclid[15] = "compare 1 n 0 2";
algorithmOfEuclid[16] = "goto 1";
CompileProgram(algorithmOfEuclid);




function CompileProgram(comands)
{
    let varMemory = new Array();
    let cond = false;
    for (let i = 0;i < comands.length;i++)
    {
        let comand = comands[i];
        let comandArgs = comand.split(" ");
        if (comandArgs[0]== "input")
        {
            varMemory[comandArgs[1]] = comandArgs[2] * 1
        }
        else if (comandArgs[0]== "print")
        {
            console.log(varMemory[comandArgs[1]])
        }
        else if (comandArgs[0]== "goto")
        {
            i = comandArgs[1];
        }
        else if (comandArgs[0]== "compare" || comandArgs[0]== "true" || comandArgs[0]== "false")
        {
            if (comandArgs[0]== "true")
            {
                continue;
            }
            else if (comandArgs[0]== "false")
            {
                i++;
            }

            if (comandArgs[2]== "n")
            {
                if (varMemory[comandArgs[1]] == varMemory[comandArgs[3]])
                {
                    varMemory[comandArgs[4]] = false;
                }
                else
                {
                    varMemory[comandArgs[4]] = true;
                }
            }
            else if (comandArgs[2] == "f")
            {
                if (varMemory[comandArgs[1]] >= varMemory[comandArgs[3]])
                {
                    varMemory[comandArgs[4]] = true;
                }
                else
                {
                    varMemory[comandArgs[4]] = false;
                }


            }
            else if (comandArgs[2]== "t")
            {

                if (varMemory[comandArgs[1]] <= varMemory[comandArgs[3]])
                {
                    varMemory[comandArgs[4]] = true;
                }
                else
                {
                    varMemory[comandArgs[4]] = false;
                }
            }
            else if (comandArgs[2]== "b")
            {

                if (varMemory[comandArgs[1]] > varMemory[comandArgs[3]])
                {
                    varMemory[comandArgs[4]] = true;
                }
                else
                {
                    varMemory[comandArgs[4]] = false;
                }

            }
            else if (comandArgs[2]== "l")
            {

                if (varMemory[comandArgs[1]] < varMemory[comandArgs[3]])
                {
                    varMemory[comandArgs[4]] = true;
                }
                else
                {
                    varMemory[comandArgs[4]] = false;
                }

            }
            else if (comandArgs[2]== "e")
            {

                if (varMemory[comandArgs[1]] == varMemory[comandArgs[3]])
                {
                    varMemory[comandArgs[4]] = true;
                }
                else
                {
                    varMemory[comandArgs[4]] = false;
                }
            }
            if (cond)
            {
                cond = false
                if (!varMemory[comandArgs[4]] )
                {
                    i++;
                }
            }
        }
        else if (comandArgs[0] == "if")
        {
            cond = true;
        }
        else if (comandArgs[0] == "add")
        {
            varMemory[comandArgs[3]] = varMemory[comandArgs[1]] * 1 + varMemory[comandArgs[2]];
        }
        else if (comandArgs[0] == "mult")
        {
            varMemory[comandArgs[3]] = varMemory[comandArgs[1]] * varMemory[comandArgs[2]];
        }
        else if (comandArgs[0] == "subtr")
        {
            varMemory[comandArgs[3]] = varMemory[comandArgs[1]] - varMemory[comandArgs[2]];
        }
        else if (comandArgs[0] == "break")
        {
            break;
        }
    }
}
