var abcjsEditor;

window.onload = updateTune();

function updateTune()
{
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
          program: 21,
          defaultQpm: 1,
          qpm: 1
        },
      },
      abcjsParams: {
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