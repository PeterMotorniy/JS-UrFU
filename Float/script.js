let fs = require('fs');
let arg = process.argv;
if (arg[2] == "conv")
    fs.writeFileSync("out.txt", GetBinaryNumber(fs.readFileSync("in.txt").toString()));
if (arg[2] == "calc")
{
    let res = "";
    let arr = fs.readFileSync("in.txt").toString().split(" ");
    console.log(arr);
    if(arr[1] == '+')
        res = Sum(arr[0], arr[2]);
    if(arr[1] == '-')
        res = Subtract(arr[0], arr[2]);
    fs.writeFileSync("out.txt", res + " ~" + ToInt(res));


}
console.log(fs.readFileSync("in.txt").toString());
function Normalized(number)
{
    let binaryNumber = number.toString(2);
    let lengthOfNumber = 0;
    let before = new Array();
    let after = new Array();
    let sign = '0';
    if(binaryNumber[0] == '-')
    {
        sign = '1';
        binaryNumber = binaryNumber.substr(1);
    }

    let index = 0;
    while(binaryNumber[index] != '.' && index < binaryNumber.length)
    {
        before.push(binaryNumber[index]);
        index++;
    }
    index++
    while(index < binaryNumber.length)
    {
        after.push(binaryNumber[index]);
        index++;
    }
    if(before[0] == '0')
    {
        while(before[0] == 0)
        {
            before[0] = after[0];
            after.shift();
            lengthOfNumber--;
        }
    }
    else
    {
        while(before.length > 1)
        {
            after.unshift(before[before.length - 1]);
            before.pop();
            lengthOfNumber++;
        }
    }
    lengthOfNumber += 127;
    lengthOfNumber = lengthOfNumber.toString(2);
    let mantissa = after;
    while(mantissa.length > 23)
    {
        mantissa.pop();
    }
    while(mantissa.length < 23)
    {
        mantissa.push(0);
    }
    while(lengthOfNumber.length < 8)
    {
        lengthOfNumber = "0" + lengthOfNumber;
    }
    mantissa = mantissa.join("");
    return sign + " " + lengthOfNumber + " " + mantissa;
}

function Check(number)
{
    let digits = "0123456789";
    number = number.toString()
    if(number[0] != '-' && digits.indexOf(number[0]) == -1)
        return false;
    else
        number =number.substr(1);
    let dotCount = 0;
    for(i of number)
    {
        if(i == '.')
        {
            if(dotCount == 0)
            {
                dotCount++;
                continue;
            }
            else
                return false;
        }
        else if(digits.indexOf(i) == -1)
            return false;
    }
    return true;
}
function GetBinaryNumber(number)
{
    number = number * 1;
    if(number > ((2 - Math.pow(2, -23)) * Math.pow(2, 127)))
        return "0 11111111 000000000000000000000000";
    else if (number < -1 * ((2 - Math.pow(2, -23)) * Math.pow(2, 127)))
        return "1 11111111 000000000000000000000000";
    else if(!Check(number))
        return "0 11111111 10000000000000000000000";
    else if(Math.abs(number) < 2e-126 && Math.abs(number) >= 2e-149)
        return Denormalized(number);
    else if(number < 2e-149 && number > 0)
        return  "0 00000000 000000000000000000000000";
    else if (number > -2e-149 && number < 0)
        return "1 00000000 000000000000000000000000";
    else
        return Normalized(number);
}

function Denormalized(number)
{
    let binaryNumber = number.toString(2);
    let sign = '0';
    let length = "00000000";
    if(binaryNumber[0] == '-')
    {
        sign = '1';
        binaryNumber = binaryNumber.substr(1);
    }
    let nullsCount = binaryNumber.indexOf('1');
    nullsCount -= 2;
    let delta = nullsCount - 126;
    let mantissa = "";
    for(let i = 0; i < delta; i++)
    {
        mantissa = "0" + mantissa;
    }
    mantissa += (binaryNumber.substr(binaryNumber.indexOf('1'), 23));
    while (mantissa.length < 23)
    {
        mantissa += "0";
    }
    return sign + " " + length + " " + mantissa;
}

function Sum(a, b)
{
    arrA = GetBinaryNumber(a).split(" ");
    arrB = GetBinaryNumber(b).split(" ");
    let lengthA = arrA[1];
    let lengthB = arrB[1];
    let mantissaA = "1" + arrA[2];
    let mantissaB = "1" + arrB[2];
    if(arrA[0] != arrB[0] && lengthA == lengthB && mantissaA == mantissaB)
        return  "0 00000000 000000000000000000000000";
    let delta = Math.abs(parseInt(lengthA, 2) - parseInt(lengthB, 2));
    let resLength = 0;
    let resMantissa = "";
    let resSign = "0";

    if (lengthB < lengthA)
    {
        resLength = lengthA;
        for(let i = 0; i < delta; i++)
            mantissaB = '0' + mantissaB.substr(0, mantissaB.length - 1);
    }
    else if (lengthA < lengthB)
    {
        resLength = lengthB;
        for(let i = 0; i < delta; i++)
            mantissaA = '0' + mantissaA.substr(0, mantissaA.length - 1);
    }
    else
    {
        resLength = lengthA;
    }
    if(arrA[0] == arrB[0])
    {
        resMantissa = SumBinaryies(mantissaA, mantissaB);
        if(resMantissa.length > 24)
        {
            resLength = SumBinaryies(resLength, "00000001");
            resMantissa = resMantissa.substr(0, 24);
        }
        return arrA[0] + " " + resLength + " " + resMantissa.substr(1);

    }
    else
    {
        if(parseInt(mantissaA, 2) > parseInt(mantissaB, 2))
        {
            resSign = arrA[0];
            resMantissa = SubtractBinaries(mantissaA, mantissaB);

        }
        else if( parseInt(mantissaB, 2) > parseInt(mantissaA, 2))
        {
            resSign = arrB[0];
            resMantissa = SubtractBinaries(mantissaB, mantissaA);
        }
        let i = 0;
        while(resMantissa[i] != '1')
        {
            i++;
        }
        resMantissa = resMantissa.substr(i + 1);

        while (resMantissa.length < 23)
        {
            resMantissa = resMantissa + '0';
        }
        let str = "";
        str  = str + i.toString(2);
        while (str.length < 8)
            str = "0" + str;
        resLength = SubtractBinaries(resLength, str.toString(2));
        return resSign + " " + resLength + " " + resMantissa;
    }
}

function SumBinaryies(a, b)
{
    let extraSum = 0;
    let result = "";
    for(let i = a.length - 1; i >= 0; i--)
    {
        let firstDigit = a[i] * 1;
        let secondDigit = b[i] * 1;
        if(firstDigit + secondDigit + extraSum < 2)
        {
            result = firstDigit + secondDigit + extraSum + result;
            extraSum = 0;
        }
        else
        {
            result = (firstDigit + secondDigit + extraSum) % 2 + result;
            extraSum = 1;
        }
    }
    if(extraSum == 1)
    {
        result = "1" + result;
    }
    return result;
}

function SubtractBinaries(a, b)
{
    let extraSums = new Array();
    for(let i = 0; i < a.length; i++)
    {
        extraSums.push(0);
    }
    let result = "";
    for(let i = a.length - 1; i >= 0; i--)
    {
        let firstDigit = a[i] * 1;
        let secondDigit = b[i] * 1;
        if(firstDigit + extraSums[i] >= secondDigit)
        {
            result = (firstDigit + extraSums[i] - secondDigit) + result;
        }
        else
        {
            result = (2 - secondDigit) + result;
            let j = i - 1;
            while(a[j] != '1')
            {
                extraSums[j] = 1;
                j--;
            }
            extraSums[j] = -1;
        }
    }
    return result;

}

function Subtract(a, b)
{
    arrA = GetBinaryNumber(a).split(" ");
    arrB = GetBinaryNumber(b).split(" ");
    let lengthA = arrA[1];
    let lengthB = arrB[1];
    let mantissaA = "1" + arrA[2];
    let mantissaB = "1" + arrB[2];
    if(arrA[0] == arrB[0] && lengthA == lengthB && mantissaA == mantissaB)
        return  "0 00000000 000000000000000000000000";
    let delta = Math.abs(parseInt(lengthA, 2) - parseInt(lengthB, 2));
    let resLength = 0;
    let resMantissa = "";
    let resSign = "0";

    if (lengthB < lengthA)
    {
        resLength = lengthA;
        for(let i = 0; i < delta; i++)
            mantissaB = '0' + mantissaB.substr(0, mantissaB.length - 1);
    }
    else if (lengthA < lengthB)
    {
        resLength = lengthB;
        for(let i = 0; i < delta; i++)
            mantissaA = '0' + mantissaA.substr(0, mantissaA.length - 1);
    }
    else
    {
        resLength = lengthA;
    }
    if(arrA[0] != arrB[0])
    {
        let res = Sum(a, b);
        if(arrA[0] == '1' && arrB[0] == '0')
            res[0] = '1';
        return res;
    }
    else
    {
        if(parseInt(mantissaA, 2) > parseInt(mantissaB, 2))
        {
            if(arrA[0] == '0')
                resSign = '0';
            else
                resSign = '1';
            resMantissa = SubtractBinaries(mantissaA, mantissaB);

        }
        else if( parseInt(mantissaB, 2) > parseInt(mantissaA, 2))
        {
            if(arrA[0] == '0')
                resSign = '1';
            else
                resSign = '0';
            resMantissa = SubtractBinaries(mantissaB, mantissaA);
        }
        let i = 0;
        while(resMantissa[i] != '1')
        {
            i++;
        }
        resMantissa = resMantissa.substr(i + 1);

        while (resMantissa.length < 23)
        {
            resMantissa = resMantissa + '0';
        }
        let str = "";
        str  = str + i.toString(2);
        while (str.length < 8)
            str = "0" + str;
        resLength = SubtractBinaries(resLength, str.toString(2));
        return resSign + " " + resLength + " " + resMantissa;
    }
}

function ToInt(number)
{
    let arr = number.split(" ");
    let res = parseInt("1" + arr[2], 2) * Math.pow(2, parseInt(arr[1], 2) - 127 - 23);
    if(arr[0] == '1')
        res *= -1;
    return res
}
let a = Subtract(-7, -5.1);
console.log(a);
console.log(ToInt(a));
