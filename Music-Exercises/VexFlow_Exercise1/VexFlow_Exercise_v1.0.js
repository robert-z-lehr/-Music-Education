document.addEventListener('DOMContentLoaded', () => {
  const notesButton = document.getElementById('notesButton');
  const chordsButton = document.getElementById('chordsButton');
  const rhythmsButton = document.getElementById('rhythmsButton');
  const articulationButton = document.getElementById('articulationButton');

  notesButton.addEventListener('click', () => {
    renderVexFlowNotation('notes');
  });

  chordsButton.addEventListener('click', () => {
    renderVexFlowNotation('chords');
  });

  rhythmsButton.addEventListener('click', () => {
    renderVexFlowNotation('rhythms');
  });

  articulationButton.addEventListener('click', () => {
    renderVexFlowNotation('articulation');
  });
});

function renderVexFlowNotation(category) {
  const VF = Vex.Flow;

  // Clear the VexFlow output container
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  // Create an SVG renderer and attach it to the DIV element with ID 'output'.
  var vf = new VF.Factory({renderer: {elementId: 'output'}});
  var score = vf.EasyScore();
  var system = vf.System();

  if (category === 'notes') {
    system.addStave({
      voices: [score.voice(score.notes('C5/q, B4, Bb4, A4'))]
    }).addClef('treble').addTimeSignature('4/4');
  } else if (category === 'chords') {
    system.addStave({
      voices: [score.voice(score.notes('C5/q, C#5, D5/h'))]
    }).addClef('treble').addTimeSignature('4/4');
  } else if (category === 'rhythms') {
    system.addStave({
      voices: [score.voice(score.notes('C#5/q, B4, A4, G#4'))]
    }).addClef('treble').addTimeSignature('4/4');
  } else if (category === 'articulation') {
    system.addStave({
      voices: [score.voice(score.notes('C#5/q, B4, A4, G#4'))]
    }).addClef('treble').addTimeSignature('4/4');
  }

  vf.draw();

  // Create and append a textbox to the right of the notation
  var textbox = document.createElement('input');
  textbox.type = 'text';
  textbox.placeholder = 'Enter your answer';
  textbox.classList.add('notation-textbox');
  outputDiv.appendChild(textbox);
}
