
      var ctx = document.getElementById('cmain').getContext('2d');
      ctx.canvas.width = document.getElementById('main').offsetWidth;
      ctx.canvas.height = document.getElementById('main').offsetHeight;

      var sorter = new Sorter('bubble');
      
      var selected = document.getElementById('bubble');

      var visualiser = new Visualiser(ctx);
      visualiser.setSorter(sorter);

      generateRandomData();

      visualiser.showData();

      function generateRandomData(n=100, llim=0,ulim=100) {
        var data = Array.from({length: n}, () => Math.floor(llim+Math.random() * (ulim-llim)));
        sorter.setData(data);
      }

      document.getElementById('randomdatabtn').addEventListener('click',
        () => {
          generateRandomData(Number(document.getElementById('randomntextbox').value)||100);
          visualiser.showData();
      });

      const inputElement = document.getElementById("inputdatabtn");
      inputElement.addEventListener("change", handleFiles, false);
      function handleFiles(e) {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = (function(e) {
          var data = e.target.result.split(',').map((x)=>Number(x));
          sorter.setData(data);
          visualiser.showData();
        });
        reader.readAsText(file);
      }

      Array.from(document.getElementsByClassName('algodiv')).forEach((elem)=>{
        elem.addEventListener('click', (e)=> {
          setSelectedAlgorithm(e.target.id);
        });
      });

      function setSelectedAlgorithm(algo) {
        sorter.setAlgorithm(algo);
        var checkmark = selected.removeChild(selected.lastElementChild);
        selected = document.getElementById(algo);
        selected.appendChild(checkmark);
      }

      document.getElementById('startbtn').addEventListener('click',()=>{
        visualiser.playAnim(0);

      });

      document.getElementById('speedtextbox').addEventListener('change',(e)=> {
        visualiser.speed = Number(e.target.value)||visualiser.speed;
        console.log(e.target.value);
      }
      );
