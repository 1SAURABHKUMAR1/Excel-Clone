deleteButton.addEventListener('click', () => {

    // clear whole text
    allCells.forEach(element => {
        element.innerText = '';
        element.style.fontWeight = 'normal';
        element.style.fontStyle = 'normal';
        element.style.textDecoration = 'none';
        element.style.backgroundColor = '#f9fafb';
        element.style.color = '#000000';
        element.style.textAlign = 'left';
        element.style.fontSize = '16px';
        element.style.fontFamily = 'Inter';

    })

    // reset whole array
    sheetDataBase = [];
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
            }
            sheetRow.push(cellProperties);
        }
        sheetDataBase.push(sheetRow);
    }

    // focus on first cell after deletion
    focusOnCell('A1');
    cellAddressBar.value = `${String.fromCharCode(65)}${1}`;

    // chnange sheet name
    documentName = 'Sheet';
    fileName.value = documentName;

    // manage local storage
    manageLocalStorage();

});