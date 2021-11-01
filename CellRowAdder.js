var columnTotal = 26;
var rowTotal = 100;

var rowContainer = document.querySelector('.row-address-container')
var columnContainer = document.querySelector('.col-address-container')
var cellsContainer = document.querySelector('.cells-container')
var cellAddressBar = document.querySelector('.address-bar');

// function to add row numbers  

for (let i = 0; i < rowTotal; i++) {
    let singleRowNumber = document.createElement('div');
    singleRowNumber.setAttribute('class', 'single-row-number')
    singleRowNumber.innerText = i + 1;
    rowContainer.appendChild(singleRowNumber);
}


// functions to add column numbers

for (let i = 0; i < columnTotal; i++) {
    let singleColumnNumber = document.createElement('div');
    singleColumnNumber.setAttribute('class', 'single-column-number');
    singleColumnNumber.innerText = String.fromCharCode(65 + i);
    columnContainer.appendChild(singleColumnNumber);
}


// functions to add cell 
// it first adds 26 cells in one row and add that row to the cellContainer .. .. . .. . 

for (let i = 0; i < rowTotal; i++) {
    let cellRow = document.createElement('div');
    cellRow.setAttribute('class', 'cell-row')
    for (let j = 0; j < columnTotal; j++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('contenteditable', 'true')
        cellRow.appendChild(cell);
        findCellAdrees(cell, i, j);
    }
    cellsContainer.appendChild(cellRow);
}

// function to print the cell number on click ont address bar

function findCellAdrees(cell, i, j) {
    cell.addEventListener('click', () => {
        cellAddressBar.innerText = `${i + 1}${String.fromCharCode(65 + j)}`;
        addOutlineCell(cell);
    })
}


// a function to add outline to cell 

var allCells = document.querySelectorAll('.cell');

function addOutlineCell(cell) {

    allCells.forEach(elements => {
        elements.classList.remove('active-cell');
    })

    cell.classList.add('active-cell');
}