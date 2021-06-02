function addImage(fileName, imageSrc) {
    let div = document.createElement('div');
    div.className = 'img-block';

    const image = new Image();
    image.src = imageSrc;
    image.title = fileName;
    image.classList.add('thumb');

    const para = document.createElement('p');
    para.classList.add('thumb-text');
    para.innerHTML = fileName;

    const button = document.createElement('button');
    button.classList.add('btn');
    button.addEventListener('click',() => deleteFile(div, fileName));
    button.innerHTML = 'Delete';

    div.appendChild(image);
    div.appendChild(para);
    div.appendChild(button);
    document.getElementById('list').insertBefore(div, null);
}

function handleFileSelect(evt) {
    let files = evt.target.files;

    for (let f of files) {
        if (!f.type.match('image.*')) {
            continue;
        }

        let reader = new FileReader();

        reader.onload = (function (theFile) {
            return function (e) {
                const imageSrc = e.target.result;
                const fileName = theFile.name;
                addImage(fileName, imageSrc);
                saveFile(fileName, imageSrc);
            };
        })(f);

        reader.readAsDataURL(f);
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function saveFile(fileName, src) {
    localStorage.setItem(fileName, src);
}

function loadFiles() {
    for (const fileName of Object.keys(localStorage)) {
        addImage(fileName, localStorage.getItem(fileName));
    }
}

function deleteFile(div, fileName) {
   div.classList.add('img-block-deleted');
    setTimeout(()=> {
    div.parentElement.removeChild(div);
    localStorage.removeItem(fileName);
    },2000)  
}

window.addEventListener('load', loadFiles);










