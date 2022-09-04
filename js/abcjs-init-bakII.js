<<<<<<< HEAD
var abcjsEditor;

let tunes_list_path = "tunes/tune_list.txt";
let tune_selector = document.getElementById("tune-selector");
let abc_display = document.getElementById('abc-display');

window.onload = function()
{
    console.log("windows onload");
    tune_selector.value = "dan_breens"
    tune_selector.selectedIndex = 1;
    fetchTune("dan_breens.abc");
    selectionChangeCallback();
    // Show Error When Use Fetch Method With Import Method
    fetch(tunes_list_path,  {mode: 'no-cors'})
    .then(response =>
    {
        console.log("response:", response);
        return response
    })
    .then(data => 
    {
        console.log("data:", data)
        return data.text()
    })
    .then(Normal =>
    {
        // console.log("Normal:", Normal)
        console.log("got tunelist");
        console.log("tune_list");
        // document.getElementById("tune-list").innerHTML = Normal.split("\n").join("<br/>\n");
        
        let  tune_list = Normal.split("\n").sort();
        addTunesToSelector(tune_list);
    })
    .catch(err =>
    {
        console.log('Fetch problem show: ' + err.message);
    });
}

function updateTune()
{
  console.log("updateTune");

  let abcjsEditor = new ABCJS.Editor(
    'abc-display', 
    {
      canvas_id: 'paper',
      warnings_id: 'warnings',
      synth: {
        el: '#audio',
        options: {
          displayLoop: true,
          displayRestart: true,
          displayPlay: true,
          displayProgress: true,
          displayWarp: true,
          chordsOff: true,
          program: 74, //22, 69
          // defaultQpm: 1,
          // qpm: 1
        },
      },
      abcjsParams: {
        responsive: "resize",
        add_classes: true,
        clickListener: clickListener,
        format: {
          // gchordfont: "Georgia",
          // wordsfont: "Courier",
          // vocalfont: "Courier"
        }
      },
      selectionChangeCallback: selectionChangeCallback,
    }
  );
  
  console.log("tune updates, formatting abcjs-container");

  let abcjs_container_height = $('.abcjs-container').css('height');
  let abcjs_container_padding = $('.abcjs-conteiner').css('padding');
  let paper_height = $('#paper').css('height');
  let paper_padding = $('#paper').css('padding');
  let svg_height = $('#paper').find('svg').css('height');
  let svg_padding = $('#paper').find('svg').css('padding');

  svg_height = document.getElementById('paper').getElementsByTagName('svg')[0].getBoundingClientRect().height;


  console.log(
    'abcjs_container_height:', abcjs_container_height,
    'abcjs_container_padding', abcjs_container_padding,
    'paper_height', paper_height,
    'paper_padding', paper_padding,
    'svg_height', svg_height,
    'svg_padding', svg_padding
  );

  $('div.abcjs-container').css('height', svg_height);
  $('div.abcjs-container')[0].style.height = svg_height;
}


  // var annotations = document.getElementsByClassName("abcjs-annotation");
  // console.log(annotations);
  // console.log(typeof(annotations));
  // for (key in annotations)
  // {
  //   el = annotations[key];
  //   console.log(el);
  //   console.log(typeof(el));
  //   if (typeof(el) == "object")
  //   {
  //     console.log("el", el);
  //     console.log(typeof(el));
  //     var y = parseInt(el.getAttribute("y"));
  //     console.log("old y", y);
  //     el.setAttribute("y", y + 170);
  //     console.log("new y", el.getAttribute("y"));
  //   }
  // }

  // var chords = document.getElementsByClassName("abcjs-chord")
  // console.log(chords);
  // console.log(typeof(chords));
  // for (key in chords)
  // {
  //   el = chords[key];
  //   console.log("key", key, "chord", el);
  //   console.log(typeof(el));

  //   if (typeof(el) == "object")
  //   {
  //     console.log("el", el);
  //     console.log(typeof(el));
  //     var y = parseInt(el.getAttribute("y"));
  //     console.log("old y", y);
  //     el.setAttribute("y", y + 170);
  //     console.log("new y", el.getAttribute("y"));
  //   }
  // }
// };

function clickListener(
  abcElem,
  tuneNumber,
  classes,
  analysis,
  drag,
  mouseEvent
) 
{
  var lastClicked = abcElem.midiPitches;
  if (!lastClicked) return;

  ABCJS.synth
    .playEvent(
      lastClicked,
      abcElem.midiGraceNotePitches
      // abcjsEditor.millisecondsPerMeasure()
    )
    .then(function (response) {
      console.log('note played');
    })
    .catch(function (error) {
      console.log('error playing note', error);
    });
}

function selectionChangeCallback(start, end) 
{
  console.log("selectionChangeCallback");

  if (abcjsEditor) {
    var el = abcjsEditor.tunes[0].getElementFromChar(start);
    console.log("abcjsEditor el", el);
  }
}

function fetchTune(tune_filename)
{
    console.log("fetchTune:", tune_filename);

    // get tune filename
    // let tune_filename = event.target.value;
    // tune_filename = tune_selector.nodeValue;

    console.log("tune filename:", tune_filename);

    // get tune text
    fetch('tunes/' + tune_filename,  {mode: 'no-cors'})
    .then( response => {
        console.log("response:", response);
        return response
    })
    .then(  data => {
        console.log("data:", data)
        return data.text()
    })
    .then(Normal => {
        // console.log("Normal:", Normal)
        console.log("got tune text");
        let tune_textarea = document.getElementById("abc-display");
        // console.log("tune textarea:", tune_textarea);
        tune_textarea.value = Normal;
        tune_textarea.style.height = "auto";
        tune_textarea.style.height = (tune_textarea.scrollHeight) + "px";
        updateTune();
    })
    .catch( err => {
        console.log('Fetch problem show: ' + err.message);
    });
}

// let tunes_list_path = "tunes/tune_list.txt";
// let tune_selector = document.getElementById("tune-selector");
// let abc_display = document.getElementById('abc-display');

abc_display.addEventListener('change', (event) => 
{
    console.log("event:", event);

    // get tune filename
    let tune_filename = event.target.value;
    fetchTune(tune_filename);
    selectionChangeCallback();
});

tune_selector.addEventListener('change', (event) => 
{
    console.log("event:", event);

    // get tune filename
    let tune_filename = event.target.value;
    fetchTune(tune_filename);
    selectionChangeCallback();
});


// Show Error When Use Fetch Method With Import Method
// fetch(tunes_list_path,  {mode: 'no-cors'})
//     .then(response =>
//     {
//         console.log("response:", response);
//         return response
//     })
//     .then(data => 
//     {
//         console.log("data:", data)
//         return data.text()
//     })
//     .then(Normal =>
//     {
//         // console.log("Normal:", Normal)
//         console.log("got tunelise");
//         // document.getElementById("tune-list").innerHTML = Normal.split("\n").join("<br/>\n");
        
//         let  tune_list = Normal.split("\n").sort();
//         addTunesToSelector(tune_list);
//     })
//     .catch(err =>
//     {
//         console.log('Fetch problem show: ' + err.message);
//     });



function addTunesToSelector(tune_list)
{
    tune_selector.add(new Option("", ""));
    tune_list.forEach( tune_name =>
    {
        console.log("adding tune: ", tune_name);
        let tune_option = new Option(tune_name, tune_name + ".abc");
        tune_selector.add(tune_option);
        // tune_selector.appendChild(tune_option);
    });
=======
var abcjsEditor;

let tunes_list_path = "tunes/tune_list.txt";
let tune_selector = document.getElementById("tune-selector");
let abc_display = document.getElementById('abc-display');

function fetchTune(tune_filename)
{
    console.log("fetchTune:", tune_filename);

    // get tune filename
    // let tune_filename = event.target.value;
    // tune_filename = tune_selector.nodeValue;

    console.log("tune filename:", tune_filename);

    // get tune text
    fetch('tunes/' + tune_filename)
    .then( response => {
        console.log("response:", response);
        return response
    })
    .then(  data => {
        console.log("data:", data)
        return data.text()
    })
    .then(Normal => {
        // console.log("Normal:", Normal)
        console.log("got tune text");
        let tune_textarea = document.getElementById("abc-display");
        console.log("tune textarea:", tune_textarea);
        tune_textarea.value = Normal;
        tune_textarea.style.height = "auto";
        tune_textarea.style.height = (tune_textarea.scrollHeight) + "px";
        updateTune();
    })
    .catch( err => {
        console.log('Fetch problem show: ' + err.message);
    });
}

function updateTune()
{
  console.log("updateTune");

  let abcjsEditor = new ABCJS.Editor(
    'abc-display', 
    {
      canvas_id: 'paper',
      warnings_id: 'warnings',
      synth: {
        el: '#audio',
        options: {
          displayLoop: true,
          displayRestart: true,
          displayPlay: true,
          displayProgress: true,
          displayWarp: true,
          chordsOff: true,
          program: 74, //22, 69
          // defaultQpm: 1,
          // qpm: 1
        },
      },
      abcjsParams: {
        responsive: "resize",
        add_classes: true,
        clickListener: clickListener,
        format: {
          // gchordfont: "Georgia",
          // wordsfont: "Courier",
          // vocalfont: "Courier"
        }
      },
      selectionChangeCallback: selectionChangeCallback,
    }
  );
  
  console.log("tune updates, formatting abcjs-container");


  // I can't remember, but I belive these are here so that the 
  // canvas updates to the size of the tune. It would be great to 
  // get rid of some of these if I can.
  let abcjs_container_height = $('.abcjs-container').css('height');
  let abcjs_container_padding = $('.abcjs-conteiner').css('padding');
  let paper_height = $('#paper').css('height');
  let paper_padding = $('#paper').css('padding');
  let svg_height = $('#paper').find('svg').css('height');
  let svg_padding = $('#paper').find('svg').css('padding');

  svg_height = document.getElementById('paper').getElementsByTagName('svg')[0].getBoundingClientRect().height;

  console.log(
    'abcjs_container_height:', abcjs_container_height,
    'abcjs_container_padding', abcjs_container_padding,
    'paper_height', paper_height,
    'paper_padding', paper_padding,
    'svg_height', svg_height,
    'svg_padding', svg_padding
  );

  $('div.abcjs-container').css('height', svg_height);
  $('div.abcjs-container')[0].style.height = svg_height;

}

window.onload = function()
{
    console.log("windows onload");

    fetch(tunes_list_path,  {mode: 'no-cors'})
    .then(response =>
    {
        console.log("response:", response);
        return response;
    })
    .then(data => 
    {
        console.log("data:", data)
        return data.text()
    })
    .then(Normal =>
    {
        // console.log("Normal:", Normal)
        console.log("got tunelist");
        
        console.log("filling selector");
        let tune_list = Normal.split("\n").sort();
        addTunesToSelector(tune_list);

        parseURL();
    })
    .catch(err =>
    {
        console.log('Fetch problem show: ' + err.message);
    });
}

function parseURL()
{
    console.log("parseURL");

    var url = new URL(window.location);
    console.log("url: ", url);

    var tune_name = url.searchParams.get("tune");
    console.log("tune: ", tune_name);

    if (tune_name != null)
    {

        let tune_filename = tune_name + ".abc";
        console.log("fetchTune:", tune_filename);
        $(tune_selector).val(tune_filename);
        fetchTune(tune_filename);
    }
}


function clickListener(
  abcElem,
  tuneNumber,
  classes,
  analysis,
  drag,
  mouseEvent
) 
{
  var lastClicked = abcElem.midiPitches;
  if (!lastClicked) return;

  ABCJS.synth
    .playEvent(
      lastClicked,
      abcElem.midiGraceNotePitches
      // abcjsEditor.millisecondsPerMeasure()
    )
    .then(function (response) {
      console.log('note played');
    })
    .catch(function (error) {
      console.log('error playing note', error);
    });
}

function selectionChangeCallback(start, end) 
{
  console.log("selectionChangeCallback");

  if (abcjsEditor) {
    var el = abcjsEditor.tunes[0].getElementFromChar(start);
    console.log("abcjsEditor el", el);
  }
}


abc_display.addEventListener('change', (event) => 
{
    console.log("abc_display.addEventListener");
    console.log("event:", event);
    console.log("event.target.value:", event.target.value);

    updateTune();
});

tune_selector.addEventListener('change', (event) => 
{
    console.log("tune_selector.addEventListener");
    console.log("event:", event);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log("params: ", params);

    // get tune filename
    let tune_filename = event.target.value;
    let tune_name = tune_filename.replace(/\..*/, "");
    console.log("tune_filename:", tune_filename);

    // set rest url
    const url = new URL(window.location);
    url.searchParams.set('tune', tune_name);
    window.history.pushState({}, '', url);

    parseURL();

});


function addTunesToSelector(tune_list)
{
    tune_selector.add(new Option("Select a Tune", ""));
    tune_list.forEach( tune_name =>
    {
        console.log("adding tune: ", tune_name);
        let tune_option = new Option(tune_name, tune_name + ".abc");
        tune_selector.add(tune_option);
    });
>>>>>>> ac87c00b984f2e09d74fdaf130527b6f973acbb7
}