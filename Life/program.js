let sizeInCellsNumber = 0;
let spaceBetweenCells = 7;
let cellSize = 50;
let aliveColor = "#37d792";
let deadColor = "#737773";
let aliveCells = new Array();

function InitializeCanvas()
{
    sizeInCellsNumber = document.getElementById("size").value;
    let canvasSize = sizeInCellsNumber * cellSize + (sizeInCellsNumber - 1) * spaceBetweenCells;
    let canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style = "border:1px solid #000000;";
    canvas.addEventListener("dblclick", function(event)
    {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        ChangeColor(x, y);
    });
    let oldCanvas = document.getElementById("myCanvas");
    oldCanvas.remove();
    document.body.append(canvas);
    InitizlizeCells(canvasSize);
}

function InitizlizeCells(sizeInPixels)
{
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    aliveCells = new Array();
    for(let x = 0; x < sizeInCellsNumber; x++)
    {
        aliveCells[x] = new Array();
        for (let y = 0; y < sizeInCellsNumber; y++)
        {
            aliveCells[x][y] = false;
        }
    }
    Redraw();
}

function ChangeColor(xCoordinate, yCoordinate)
{
    for(let x = 0; x < sizeInCellsNumber; x++)
    {
        for(let y = 0; y < sizeInCellsNumber; y++)
        {
            let newX = x * (cellSize + spaceBetweenCells);
            let newY = y * (cellSize + spaceBetweenCells);
            if(xCoordinate >= newX && yCoordinate >= newY && xCoordinate <= newX + cellSize && yCoordinate <= newY + cellSize)
                aliveCells[x][y] = !aliveCells[x][y];
        }
    }
    Redraw();
}

function MakeNextGeneration()
{
    let neighboursNumber = new Array();
    let newAliveCells = new Array();
    for(let x = 0; x < sizeInCellsNumber; x++)
    {
        newAliveCells[x] = new Array();
        neighboursNumber[x] = new Array();
        for (let y = 0; y < sizeInCellsNumber; y++)
        {
            newAliveCells[x][y] = false;
            neighboursNumber[x][y] = 0;
        }
    }
    for(let x = 0; x < sizeInCellsNumber; x++)
    {
        for(let y = 0; y < sizeInCellsNumber; y++)
        {
            let counter = 0;
            for(let deltaX = -1; deltaX <= 1; deltaX++)
            {
                let newX = (x + deltaX + 1 * sizeInCellsNumber) % sizeInCellsNumber;
                for(let deltaY = -1; deltaY <= 1; deltaY++)
                {
                    let newY = (y + deltaY + 1 * sizeInCellsNumber) % sizeInCellsNumber;
                    if(aliveCells[newX][newY] && !(deltaY == 0 && deltaX == 0))
                        counter++;
                }
            }
            neighboursNumber[x][y] = counter;
        }
    }
    for(let x = 0; x < sizeInCellsNumber; x++)
    {
        for (let y = 0; y < sizeInCellsNumber; y++)
        {
            if(!aliveCells[x][y] && neighboursNumber[x][y] == 3)
                newAliveCells[x][y] = true;
            if(aliveCells[x][y] && (neighboursNumber[x][y] < 2 || neighboursNumber[x][y] > 3))
                newAliveCells[x][y] = false;
            if (aliveCells[x][y] && (neighboursNumber[x][y] == 3 || neighboursNumber[x][y] == 2))
                newAliveCells[x][y] = true;

        }
    }
    aliveCells = newAliveCells;
    Redraw();
}

function Redraw()
{
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
    for(let x = 0; x < sizeInCellsNumber; x++)
    {
        for(let y = 0; y < sizeInCellsNumber; y++)
        {
            let newY = y * (cellSize + spaceBetweenCells);
            let newX = x * (cellSize + spaceBetweenCells);
            if(aliveCells[x][y])
                ctx.fillStyle = aliveColor;
            else
                ctx.fillStyle = deadColor;
            ctx.fillRect(newX, newY, cellSize, cellSize);
        }
    }
}