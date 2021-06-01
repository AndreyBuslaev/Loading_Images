
function handleFileSelect(evt) {
    let files = evt.target.files;

    for (let i = 0, f; f = files[i]; i++) {

      if (!f.type.match('image.*')) {
        continue;
      }

      let reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          let div = document.createElement('div');
          div.className = 'img-block'
        //   let button = document.createElement('button');
        //   button.className = 'btn';
        //   button.innerHTML = 'Delete';
        div.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>' + '<p class="thumb-text">',theFile.name,'</p>' + '<button class = "btn">Delete</button>'].join('');
            document.getElementById('list').insertBefore(div, null)           
        //   document.getElementById('list').insertBefore(button, null);
        };
      })(f);

      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


  