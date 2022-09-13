console.log("in abcjs-init.js");

var debug_level = 2;

function debug(level, message)
{
  if (debug_level >= level)
  {
    console.log(new Error);
    console.log(message); 
  }
}

debug(0, "in abcjs-init.js");

var abcjsEditor;

let tunes_list_path = "tunes/tune_list.txt";
let tune_selector = document.getElementById("tune-selector");
let abc_display = document.getElementById('abc-display');
let tune_textarea = document.getElementById("abc-display");

// $(tune_textarea).on('click', function(e) 
// {
//     debug(1, "text area clicked");
//     // e.preventDefault();
//     // updateTune();
// });

window.onload = function()
{
    debug(1, "windows onload");
    tune_selector.value = "dan_breens"
    tune_selector.selectedIndex = 1;
    fetchTune("dan_breens.abc");
    selectionChangeCallback();
    // Show Error When Use Fetch Method With Import Method
    fetch(tunes_list_path,  {mode: 'no-cors'})
    .then(response =>
    {
        debug(2, "response: " + response);
        return response;
    })
    .then(data => 
    {

        debug(2, "data: " + data)
        return data.text()
    })
    .then(Normal =>
    {
        // console.log("Normal:", Normal)
        debug(1, "got tunelist");
        // document.getElementById("tune-list").innerHTML = Normal.split("\n").join("<br/>\n");
        
        let tune_list = Normal.split("\n").sort();
        addTunesToSelector(tune_list);
    })
    .catch(err =>
    {
        debug(1, 'Fetch problem show: ' + err.message);
    });
}



function updateTune()
{
  debug(1, "updateTune");   

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
  
  debug(1, "tune updates, formatting abcjs-container");

  // let abcjs_container_height = $('.abcjs-container').css('height');
  let abcjs_container_padding = $('.abcjs-container').css('padding');
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
  debug(1, "clickListener")
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
  debug(1, "selectionChangeCallback");
  debug(1, "start: " + start + "  end: " + end);

  if (abcjsEditor) {
    debug(2, "abcjsEditir is True")
    var el = abcjsEditor.tunes[0].getElementFromChar(start);
    debug(2, "abcjsEditor el: ", el);
  }
}

function fetchTune(tune_filename)
{
    debug(1, "fetchTune")
    debug(2, "tune_filename: " + tune_filename);

    // get tune filename
    // let tune_filename = event.target.value;
    // tune_filename = tune_selector.nodeValue;

    // get tune text
    fetch('tunes/' + tune_filename,  {mode: 'no-cors'})
    .then( response => {
        debug(2, "response: " + response);
        return response;
    })
    .then(  data => {
        debug(2, "data: " + data)
        return data.text();
    })
    .then(Normal => {
        debug(2, "Normal: got tune text");
        // let tune_textarea = document.getElementById("abc-display");
        debug(3, "tune textarea: " + tune_textarea);
        tune_textarea.value = Normal;
        tune_textarea.style.height = "auto";
        tune_textarea.style.height = (tune_textarea.scrollHeight) + "px";
        updateTune();
    })
    .catch( err => {
        debug(2, 'Fetch problem show: ' + err.message);
    });
}

// let tunes_list_path = "tunes/tune_list.txt";
// let tune_selector = document.getElementById("tune-selector");
// let abc_display = document.getElementById('abc-display');

abc_display.addEventListener('change', (event) => 
{
    debug(2, "abc_display.addEventListener-event:" + event);

    // get tune filename
    let tune_filename = event.target.value;
    fetchTune(tune_filename);
    selectionChangeCallback();
});

tune_selector.addEventListener('change', (event) => 
{
    debug(2, "tune_selector.addEventListener - event: " + event);

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
    debug(1, "addTunesToSelector");
    debug(3, "tune_list: " + tune_list)
    tune_selector.add(new Option("", ""));
    tune_list.forEach( tune_name =>
    {
        debug(3, "adding tune: " + tune_name);
        let tune_option = new Option(tune_name, tune_name + ".abc");
        tune_selector.add(tune_option);
        // tune_selector.appendChild(tune_option);
    });
}