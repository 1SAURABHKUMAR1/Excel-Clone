var boldButton = document.querySelector('.bold-button');
var italicButton = document.querySelector('.italic-button');
var underlineButton = document.querySelector('.underline-button');
var fontColor = document.querySelector('.font-color');
var backgroundColor = document.querySelector('.background-color');
var inputFontStyle = document.querySelector('.font-style');
var inputFontSize = document.querySelector('.font-size');
var alignment = document.querySelectorAll('.alignment')
var leftAlignButton = alignment[0];
var centerAlignButton = alignment[1];
var rightAlignButton = alignment[2];
var backgroundColorSvg = document.querySelector('#Vector_2_background');
var fontColorSvg = document.querySelector('#Vector_2_font');


// bold text
boldButton.addEventListener('click', () => {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    // changing cell ui 
    if (cellUi.style.fontWeight == 'bold') {
        cellUi.style.fontWeight = 'normal';
    } else {
        cellUi.style.fontWeight = 'bold';
    }

    //updating cell sheet db
    cellStorage.bold = !cellStorage.bold;

    // add active to tool
    addAndRemoveActiveTool(boldButton);

    // manage Local Storage
    manageLocalStorage();
})

// italic text
italicButton.addEventListener('click', () => {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    // changing cell ui 
    if (cellUi.style.fontStyle == 'italic') {
        cellUi.style.fontStyle = 'normal';
    } else {
        cellUi.style.fontStyle = 'italic';
    }

    //updating cell sheet db
    cellStorage.italic = !cellStorage.italic;

    // add active to tool
    addAndRemoveActiveTool(italicButton);

    // manage Local Storage
    manageLocalStorage();
})

//underline text
underlineButton.addEventListener('click', () => {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    // changing cell ui 
    if (cellUi.style.textDecoration == 'underline') {
        cellUi.style.textDecoration = 'none';
    } else {
        cellUi.style.textDecoration = 'underline';
    }

    //updating cell sheet db
    cellStorage.underline = !cellStorage.underline;

    // add active to tool
    addAndRemoveActiveTool(underlineButton);

    // manage Local Storage
    manageLocalStorage();
})

// background color text
backgroundColor.addEventListener('input', () => {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    // changing cell ui 
    cellUi.style.backgroundColor = backgroundColor.value;

    //updating cell sheet db
    cellStorage.backgroundColor = backgroundColor.value;

    // updating svg color
    backgroundColorSvg.style.fill = backgroundColor.value

    // manage Local Storage
    manageLocalStorage();
})

// font color text
fontColor.addEventListener('input', () => {

    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    // changing the cell ui
    cellUi.style.color = fontColor.value;

    // updating cell sheet db
    cellStorage.fontColor = fontColor.value;

    // updating svg color
    fontColorSvg.style.fill = fontColor.value;

    // manage Local Storage
    manageLocalStorage();
})

// change font size
inputFontSize.addEventListener('input', () => {

    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    // changing cell ui
    cellUi.style.fontSize = inputFontSize.value + 'px';

    // updating storage
    cellStorage.fontSize = inputFontSize.value;

    // manage Local Storage
    manageLocalStorage();
})

// change font style
inputFontStyle.addEventListener('input', () => {

    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    // chaning the cell ui
    cellUi.style.fontFamily = inputFontStyle.value;

    //updating the storage 
    cellStorage.fontFamily = inputFontStyle.value;

    // manage Local Storage
    manageLocalStorage();
})

// left center and right align 
alignment.forEach(element => {
    element.addEventListener('click', () => {

        let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

        let alignType = element.classList[1];

        //changing cell ui
        cellUi.style.textAlign = alignType;

        //updating cell storage
        cellStorage.textAlign = alignType;

        // manage Local Storage
        manageLocalStorage();

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
    })
})


// a function to add active on toolbar

function addAndRemoveActiveTool(tool) {
    if (tool.classList.contains('sheet-container-active')) {
        tool.classList.remove('sheet-container-active');
    }
    else {
        tool.classList.add('sheet-container-active');
    }
}