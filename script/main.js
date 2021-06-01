
function handleFileSelect(evt) {
    let files = evt.target.files;

    for (let i = 0, f; f = files[i]; i++) {

      if (!f.type.match('image.*')) {
        continue;
      };

      let reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          let div = document.createElement('div');
          div.className = 'img-block';
          div.innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>' + '<p class="thumb-text">',theFile.name,'</p>' + '<button class = "btn" onclick ="deleteData()">Delete</button>'].join('');
          document.getElementById('list').insertBefore(div, null);        
        };
      })(f);

      reader.readAsDataURL(f);
    };
  };

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  function saveData(el) {
    localStorage.setItem(el.id, JSON.stringify(el.value));
  };
  
  function getData() {
    let inp = document.getElementById("files");
    inp.value = JSON.parse(localStorage.getItem('files')) || "";
  };

  function deleteData(el){
      localStorage.removeItem(el.id, JSON.stringify(el.value))
  }

  