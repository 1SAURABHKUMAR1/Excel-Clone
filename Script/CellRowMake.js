var columnTotal = 26;
var rowTotal = 100;

var rowContainer = document.querySelector('.row-address-container')
var columnContainer = document.querySelector('.col-address-container')
var cellsContainer = document.querySelector('.cells-container')
var cellAddressBar = document.querySelector('.address-bar');
var formulaBar = document.querySelector('.formula-bar');
var copyButton = document.querySelector('.copy-button');
var cutButton = document.querySelector('.cut-button');
var pasteButton = document.querySelector('.paste-button');
var deleteButton = document.querySelector('.delete-button');


// function to add row numbers  

for (let i = 1; i <= rowTotal; i++) {
    let singleRowNumber = document.createElement('div');
    singleRowNumber.setAttribute('class', 'single-row-number')
    singleRowNumber.innerText = i;
    rowContainer.appendChild(singleRowNumber);
}


// functions to add column numbers

for (let i = 1; i <= columnTotal; i++) {
    let singleColumnNumber = document.createElement('div');
    singleColumnNumber.setAttribute('class', 'single-column-number');
    singleColumnNumber.innerText = String.fromCharCode(65 + i - 1);
    columnContainer.appendChild(singleColumnNumber);
}


// functions to add cell 
// it first adds 26 cells in one row and add that row to the cellContainer .. .. . .. . 

for (let i = 1; i <= rowTotal; i++) {
    let cellRow = document.createElement('div');
    cellRow.setAttribute('class', 'cell-row')
    for (let j = 1; j <= columnTotal; j++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('contenteditable', 'true');
        cell.setAttribute('spellcheck', 'false');
        // attribute to find cell
        cell.setAttribute('row', i);
        cell.setAttribute('column', j);
        cellRow.appendChild(cell);
        displayCellToAddressBar(cell, i, j);
    }
    cellsContainer.appendChild(cellRow);
}

// function to print the cell number on click ont address bar

function displayCellToAddressBar(cell, i, j) {
    cell.addEventListener('click', () => {
        cellAddressBar.value = `${String.fromCharCode(65 + j - 1)}${i}`;
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

// event listener to focus on cell given addreess
cellAddressBar.addEventListener('keydown', (key) => {
    if (key.keyCode === 13 || key.key === 'Enter') {
        if (cellAddressBar.value !== "") {
            focusOnCell(cellAddressBar.value);
        }
        else {
            alert('Please check the entered value...')
        }
    }
})

// a function to focus on cell when given cell address 
function focusOnCell(value) {
    let [row, col] = findRowAndCol(value);

    if (row > 100) {
        alert('Out of Bound')
        return;
    }

    let cellToFocus = document.querySelector(`.cell[row="${row}"][column="${col}"]`);
    addOutlineCell(cellToFocus);
    cellToFocus.focus();
}

// a function to find row and col using address value
function findRowAndCol(address) {

    let row = String(address.slice(1));
    let col = String(address.charCodeAt(0) - 64);
    return [row, col];

}

// // website onload focus on first cell
window.onload = function () {
    focusOnCell('A1');
    cellAddressBar.value = `${String.fromCharCode(65)}${1}`;
}


// manage local storage
function manageLocalStorage() {
    localStorage.setItem('sheet', JSON.stringify(sheetDataBase));
}