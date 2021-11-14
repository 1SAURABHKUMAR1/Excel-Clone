// button for copy
copyButton.addEventListener('click', () => {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    let text = cellUi.innerText;
    navigator.clipboard.writeText(text);
})

// button to cut
cutButton.addEventListener('click', () => {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    let text = cellUi.innerText;
    navigator.clipboard.writeText(text);
    cellUi.innerText = '';
    cellStorage.value = '';
    cellStorage.formula = '';

    // manage Local Storage
    manageLocalStorage();
})

// button for paste
pasteButton.addEventListener('click', () => {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    navigator.clipboard.readText()
        .then(text => {
            cellUi.innerText = text;
            cellStorage.value = text;
        })
        .catch(err => {
            console.log(err);
        })
})


// change title via fileName
fileName.addEventListener('change', () => {
    documentName = fileName.value;
    document.title = documentName.charAt(0).toUpperCase() + documentName.slice(1);
})