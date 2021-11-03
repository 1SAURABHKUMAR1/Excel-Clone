var allCells = document.querySelectorAll('.cell');

//  function to chnage toolbar for every cell
for (let i = 0; i <= allCells.length; i++) {
    addEventListenerToCell(allCells[i]);
}

// funcition to change toolbar
function addEventListenerToCell(cell) {

    cell.addEventListener('click', () => {

        let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

        // font style button
        inputFontStyle.value = cellStorage.fontFamily;

        // font size
        inputFontSize.value = cellStorage.fontSize;

        //bold button
        if (cellStorage.bold) {
            addActive(boldButton);
        } else {
            removeActive(boldButton)
        }

        //italic button
        if (cellStorage.italic) {
            addActive(italicButton);
        } else {
            removeActive(italicButton)
        }

        //underline button 
        if (cellStorage.underline) {
            addActive(underlineButton);
        } else {
            removeActive(underlineButton)
        }

        // alignment 
        let alignType = cellStorage.textAlign;
        if (alignType === 'left') {
            leftAlignButton.classList.add('sheet-container-active')
            centerAlignButton.classList.remove('sheet-container-active')
            rightAlignButton.classList.remove('sheet-container-active')
        }
        else if (alignType === 'center') {
            leftAlignButton.classList.remove('sheet-container-active')
            centerAlignButton.classList.add('sheet-container-active')
            rightAlignButton.classList.remove('sheet-container-active')
        }
        else if (alignType === 'right') {
            leftAlignButton.classList.remove('sheet-container-active')
            centerAlignButton.classList.remove('sheet-container-active')
            rightAlignButton.classList.add('sheet-container-active')
        }

        // font color
        fontColor.value = cellStorage.fontColor;

        // background color
        backgroundColor.value = cellStorage.backgroundColor;
    })
}

// add active class list
function addActive(button) {
    button.classList.add('sheet-container-active');
}

// remove active class list
function removeActive(button) {
    button.classList.remove('sheet-container-active');
}