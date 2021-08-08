console.log("in script3.js")

var tunes_template = $('#tune-and-player').html();
// console.log(tunes_template);


function renderABCJS(setting_id) 
{
  console.log("renderABCJS");

  textarea_id = `sid-${setting_id}-abc`;
  canvas_id = `sid-${setting_id}-paper`;
  warnings_id = `sid-${setting_id}-warnings`;
  audio_id = `#sid-${setting_id}-audio`
  audio_id = "#sid-" + setting_id + "-audio";
  console.log(audio_id);
  
  console.log("textarea:", textarea_id, "canvas:", canvas_id, "warnings:", warnings_id, "audio:", audio_id);

  abcjsEditor = new ABCJS.Editor(textarea_id, {
    canvas_id: canvas_id,
    warnings_id: warnings_id,
    synth: {
      el: audio_id,
      options: {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      },
    },
    abcjsParams: {
      add_classes: true,
      clickListener: clickListener,
    },
    selectionChangeCallback: selectionChangeCallback,
  });
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
  console.log("clickListener");

  var lastClicked = abcElem.midiPitches;
  if (!lastClicked) return;

  ABCJS.synth
    .playEvent(
      lastClicked,
      abcElem.midiGraceNotePitches,
      abcjsEditor.millisecondsPerMeasure()
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
    console.log(el);
  }
}



var abcjsEditor;

function createABC(setting_id) {
  textarea_id = `${setting_id}-abc`;
  canvas_id = `${setting_id}-paper`;
  warnings_id = `${setting_id}-warnings`;
  audio_id = `${setting_id}-audio`

  console.log("textarea:", textarea_id, "canvas:", canvas_id, "warnings:", warnings_id, "audio:", audio_id);

  abcjsEditor = new ABCJS.Editor(textarea_id, {
    canvas_id: canvas_id,
    warnings_id: warnings_id,
    synth: {
      el: audio_id,
      options: {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      },
    },
    abcjsParams: {
      add_classes: true,
      clickListener: clickListener,
    },
    selectionChangeCallback: selectionChangeCallback,
  });
};

function clickListener(
  abcElem,
  tuneNumber,
  classes,
  analysis,
  drag,
  mouseEvent
) {
  var lastClicked = abcElem.midiPitches;
  if (!lastClicked) return;

  ABCJS.synth
    .playEvent(
      lastClicked,
      abcElem.midiGraceNotePitches,
      abcjsEditor.millisecondsPerMeasure()
    )
    .then(function (response) {
      console.log('note played');
    })
    .catch(function (error) {
      console.log('error playing note', error);
    });
}

function selectionChangeCallback(start, end) {
  if (abcjsEditor) {
    var el = abcjsEditor.tunes[0].getElementFromChar(start);
    console.log(el);
  }
}