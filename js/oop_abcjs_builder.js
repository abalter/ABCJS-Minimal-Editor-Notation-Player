
function ABCJS_UI (abc_element, music_element, player_element)
{
    if (abc_element === music_element)
    {
        tabbed = true;
    }

    const abc_text = ABC_Tune(

    );

    let music;
    let player;

    return {
        set abc_text(text_to_set){text = text_to_set},
        get abc_text(){return text},


        



    }

}


function ABC_Tune()
{

}



// get the UI container
// parse UI options (e.g. tabbed textarea, download, player options, etc.)
// get the tune text or tune object (e.g. json, yaml)
// get the player options
// create html elements for textarea, canvas, and player
// add abc in the textarea element
// generate notation object
// add the notation svg in the canvas element
// create player (add options)
// add player in player element
// add elements to container  
// return ui object (textarea, canvas, player)

// Classes
// ------------------
// UI (contains textarea, canvas, and player elements, can be inserted into container)
// tune_editor (textarea, canvas, downloads, transpose, layout (side by side, above/below, tabbed))
// base player
// player with options
// tune (text, yaml, json)


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





/*
Hi Paul!

For good feeling, I'll start out that I just sponsored you at the lame amount of $3/month. Sorry, best I can do at this time.

I've been working on a couple of super simplistic apps for my own use/practice. One of them sadly stopped working due to the Vercel integration with The Session, but I think I can fix it.

https://github.com/abalter/search-thesession

https://github.com/abalter/ABCJS-Minimal-Editor-Notation-Player

The ABCJS-Minimal... I especially created to help me practice backup. I was trying to use some android apps but they had unfortunately limitations (happy to explain) and didn't work for me. Maybe eventually if I get mine working really well I'll publish it as an app.

What I'm contacting you about is that I would like to make my code for my apps a LOT better, and I have some more ideas of things I'd like to do, such as a better VS Code plugin and a widget for Rmarkdown and Jupyter notebooks (geeky datascience things).

I'm a scientific programmer not really a web programmer. Know just enough to be dangerous, as they say. 

In particular, I'd like to make the code I'm using more declarative in the sense of rather than being event-driven all the way through, I'd like to capture events and then do specific tasks in a linear order.

Obviously, what I should really do is to get to know your code really well and go from there. But as I'm trying to create more useful, open-sourced apps with abcjs to help the music world, I was wondering if, given my noble intentions and limitations as a programmer, you might give me a bit more direct help?

Thanks,

Ariel
*/


