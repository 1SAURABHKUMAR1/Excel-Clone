// event listener to for all functioon
function addEventListenerFormula(cell) {
    cell.addEventListener('blur', () => {
        let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

        if (cell.innerText == cellStorage.value) {
            return;
        }

        cellStorage.value = cell.innerText;
        cellStorage.formula = '';

        // if hard codeed data changes change children value;
        removeChildrenAndParent(cellAddressBar.value);
        changeChildrenValue(cellAddressBar.value);
    })
}


// formula bar value on enter clicked
formulaBar.addEventListener('keypress', (event) => {
    let formulaBarValue = formulaBar.value;

    if ((event.key == 'Enter' || event.keyCode == 13) && formulaBarValue) {
        if (formulaBarValue[0] === '=') {
            let value = evaluateFormula(formulaBarValue);
            if (value) {

                // remove old parent and children if new formula
                let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);
                if (formulaBarValue != cellStorage.formula) {
                    removeChildrenAndParent(cellAddressBar.value);
                    addChildrenAndParent(formulaBarValue, cellAddressBar.value);
                    changeValueCell(value, formulaBarValue, cellAddressBar.value);
                    changeChildrenValue(cellAddressBar.value);
                }

            }
        }
    }

})

function removeChildrenAndParent(currentCell) {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(currentCell);
    let currentCellParent = cellStorage.parent;

    // erase element in cell parent which is stored as children
    currentCellParent.forEach(element => {
        let [cellUiParent, cellStorageParent] = uiAndDatabaseOfCell(element);
        cellStorageParent.children.splice(cellStorageParent.children.indexOf(currentCell), 1);
    })

    // erase all cell parent 
    cellStorage.parent = [];
}

// add children
function addChildrenAndParent(formula, currentCell) {

    if (/[A-Z]/.test(formula)) {
        formula = formula.slice(1).toUpperCase();
        let arrayOfFormula = formula.split(/[-+/*]/);
        let [cellUiCurrent, cellStorageCurrent] = uiAndDatabaseOfCell(currentCell);

        arrayOfFormula.forEach(element => {

            if (/[A-Z]/.test(element)) {
                let [cellUi, cellStorage] = uiAndDatabaseOfCell(element);
                if (!cellStorage.children.includes(currentCell)) {
                    cellStorage.children.push(currentCell);
                }
                if (!cellStorageCurrent.parent.includes(element)) {
                    cellStorageCurrent.parent.push(element);
                }
            }

        })
    }
}

// chnage children value when parent changes
function changeChildrenValue(currentCell) {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(currentCell);
    let childrenCells = cellStorage.children;

    childrenCells.forEach(element => {

        // if chidren == parent
        if (currentCell == element) {
            return;
        }

        let [cellUiChildren, cellStorageChildren] = uiAndDatabaseOfCell(element);
        let childrenNewValue = evaluateFormula(cellStorageChildren.formula);
        changeValueCell(childrenNewValue, cellStorageChildren.formula, element);
        changeChildrenValue(element);
    })
}

// eveluate function
function evaluateFormula(value) {
    let formula = value.slice(1).toUpperCase();

    // check if formula contains dependency of any child cell
    if (/[A-Z]/.test(formula)) {

        // formula evaluated contains depency of other cell
        let arrayOfFormula = formula.split(/[-+*/]/);

        for (let i = 0; i < arrayOfFormula.length; i++) {

            if (/[A-Z]/.test(arrayOfFormula[i])) {

                let [cellUi, cellStorage] = uiAndDatabaseOfCell(arrayOfFormula[i]);
                formula = formula.replaceAll(arrayOfFormula[i], cellStorage.value.length === 0 ? 0 : cellStorage.value);

            }
        }

        return eval(formula);
    }
    else {
        // formula cell doesnot conatains dependency of other cells
        return eval(formula);
    }

}

// change cellUi and cellStorage formula
function changeValueCell(evaluatedValue, formula, addressCell) {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(addressCell);

    // change ui of cell
    cellUi.innerText = evaluatedValue;

    // change storage of cell
    cellStorage.value = evaluatedValue;
    cellStorage.formula = formula;

    // manage Local Storage
    manageLocalStorage();
}