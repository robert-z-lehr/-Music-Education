document.addEventListener('DOMContentLoaded', () => {
  
  const newButton = document.getElementById('newChallengeButton');
  const notesButton = document.getElementById('notesButton');

  // Define an array of 12 music notes problems as examples
  let musicProblems = [
    'C5/q, B4, A4, G4', 'D5/q, C5, B4, A4', 'E5/q, D5, C5, B4',
    'F5/q, E5, D5, C5', 'G5/q, F5, E5, D5', 'A5/q, G5, F5, E5',
    'B5/q, A5, G5, F5', 'C6/q, B5, A5, G5', 'D6/q, C6, B5, A5',
    'E6/q, D6, C6, B5', 'F6/q, E6, D6, C6', 'G6/q, F6, E6, D6'
  ];

  let remainingProblems = [...musicProblems];

  notesButton.addEventListener('click', () => {
    if (remainingProblems.length > 0) {
      let randomProblemIndex = Math.floor(Math.random() * remainingProblems.length);
      let selectedProblem = remainingProblems[randomProblemIndex];
      remainingProblems.splice(randomProblemIndex, 1);

      renderVexFlowNotation(selectedProblem);
    } else {
      notesButton.textContent = "Complete!";
      notesButton.disabled = true;
    }
  });

  newButton.addEventListener('click', () => {
    if (remainingProblems.length > 0) {
      let randomProblemIndex = Math.floor(Math.random() * remainingProblems.length);
      let selectedProblem = remainingProblems[randomProblemIndex];
      remainingProblems.splice(randomProblemIndex, 1);

      renderVexFlowNotation(selectedProblem);
    } else {
      notesButton.textContent = "Complete!";
      notesButton.disabled = true;
    }
  });

});

function renderVexFlowNotation(problem) {
  const VF = Vex.Flow;
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  var vf = new VF.Factory({renderer: {elementId: 'output'}});
  var score = vf.EasyScore();
  var system = vf.System();

  system.addStave({
    voices: [score.voice(score.notes(problem))]
  }).addClef('treble').addTimeSignature('4/4');

  vf.draw();
}

function markProblemAsSolved() {
  // Implement functionality to add a green checkmark
  // This function should be called when a problem is answered correctly
}
