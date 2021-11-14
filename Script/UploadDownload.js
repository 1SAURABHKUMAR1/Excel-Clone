// download function
function downloadFunction() {
    let nameOfFile = fileName.value;
    nameOfFile = nameOfFile.charAt(0).toUpperCase() + nameOfFile.slice(1);

    let downloadJson = JSON.stringify(sheetDataBase);

    // making a blob
    let fileBlob = new Blob([downloadJson], { type: 'application/json' });
    const a = document.createElement('a'); // making a a tag
    a.href = URL.createObjectURL(fileBlob);
    a.download = nameOfFile == '' ? 'Sheet' : nameOfFile; // file name
    a.click();
}

//upload function
function uploadFunction() {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.addEventListener('change', () => {
        let fileReader = new FileReader();
        let files = input.files[0];
        let nameOfFile = input.files[0].name;

        fileReader.readAsText(files);

        fileReader.addEventListener('load', () => {
            let sheetDB = JSON.parse(fileReader.result);

            // delete oold sheet
            deleteButton.click();

            // add uploaded sheet 
            sheetDataBase = sheetDB;

            // filename
            documentName = nameOfFile.slice(0, nameOfFile.length - 5);
            fileName.value = documentName;

            // manageLocalStorage
            manageLocalStorage();

            // click on all cells to show value
            window.location.reload();

        })
    })
}

// event listener on button to download
uploadButton.addEventListener('click', uploadFunction);

// event listener on button to upload
downloadButton.addEventListener('click', downloadFunction);