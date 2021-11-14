var allCells = document.querySelectorAll('.cell');

// a database or 2d array for sheet with all cell properties
var sheetDataBase = [];

// pushing all sheet properties to sheetDataBase
for (let i = 1; i <= rowTotal; i++) {
    let sheetRow = [];
    for (let j = 1; j <= columnTotal; j++) {
        let cellProperties = {
            bold: false,
            italic: false,
            underline: false,
            textAlign: 'left',
            fontFamily: 'Inter',
            fontSize: '16',
            fontColor: '#000000',
            backgroundColor: '#f9fafb',
            value: '',
            formula: '',
            children: '', // its children means cells which are dependent on this
            parent: '' // it is dependet on which cells
        }
        sheetRow.push(cellProperties);
    }
    sheetDataBase.push(sheetRow);
}

// function that returns cellArray and cell ui to be changed

function uiAndDatabaseOfCell(address) {

    let [row, col] = findRowAndCol(address);

    let cellUi = document.querySelector(`.cell[row="${row}"][column="${col}"]`);
    let cellDataBase = sheetDataBase[row - 1][col - 1];
    return [cellUi, cellDataBase];
}

// if data is present in local storage

if (localStorage.getItem('sheet')) {
    sheetDataBase = [];
    sheetDataBase = JSON.parse(localStorage.getItem('sheet'));
}

// load cell properties and value on load if local storage exists
for (let i = 1; i <= rowTotal; i++) {
    for (let j = 1; j <= columnTotal; j++) {
        let cell = document.querySelector(`.cell[row="${i}"][column="${j}"]`);
        let cellDB = sheetDataBase[i - 1][j - 1];

        // inner text
        cell.innerText = cellDB.value;

        // bold text
        if (cellDB.bold) {
            cell.style.fontWeight = 'bold'
        }

        //italic text
        if (cellDB.italic) {
            cell.style.fontStyle = 'italic'
        }

        //underline text
        if (cellDB.underline) {
            cell.style.textDecoration = 'underline';
        }

        // font color text
        cell.style.color = cellDB.fontColor;

        //alignment
        cell.style.textAlign = cellDB.textAlign;

        //background color
        cell.style.backgroundColor = cellDB.backgroundColor;

        // font style
        cell.style.fontFamily = cellDB.fontFamily;

        // font size
        cell.style.fontSize = cellDB.fontSize + 'px';
    }
}

// sheet name
if (localStorage.getItem('sheetName')) {
    fileName.value = localStorage.getItem('sheetName');
    documentName = fileName.value;
    document.title = documentName.charAt(0).toUpperCase() + documentName.slice(1);
} else {
    fileName.value = 'Sheet';
}