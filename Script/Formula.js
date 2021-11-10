// event listener to for all functioon
function addEventListenerFormula(cell) {
    cell.addEventListener('blur', () => {
        let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);
        cellStorage.value = cell.innerText;
    })
}


// formula bar value on enter clicked
formulaBar.addEventListener('keydown', (event) => {
    let formulaBarValue = formulaBar.value;

    if (event.key == 'Enter' && formulaBarValue) {
        let value = evaluateFormula(formulaBarValue)
        if (value) {
            changeValueCell(value, formulaBarValue);
        }
    }

})

// eveluate function
function evaluateFormula(value) {
    let formula = value.slice(1);

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
function changeValueCell(evaluatedValue, formula) {
    let [cellUi, cellStorage] = uiAndDatabaseOfCell(cellAddressBar.value);

    // change ui of cell
    cellUi.innerText = evaluatedValue;

    // change storage of cell
    cellStorage.value = evaluatedValue;
    cellStorage.formula = formula;
}