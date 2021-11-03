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
            fontSize: '14',
            fontColor: '#000000',
            backgroundColor: '#f9fafbz'
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