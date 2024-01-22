document.addEventListener('DOMContentLoaded', () => {
  // Define buttons
  const notesButton = document.getElementById('notesButton');
  const chordsButton = document.getElementById('chordsButton');
  const articulationButton = document.getElementById('articulationButton');
  const timeSignatureButton = document.getElementById('timeSignatureButton');
  const keySignatureButton = document.getElementById('keySignatureButton');
  const rhythmButton = document.getElementById('rhythmButton');
  const tempoButton = document.getElementById('tempoButton');
  const GenreAndStyle = document.getElementById('GenreAndStyleButton');
  const EarTraining = document.getElementById('EarTrainingButton');
  const newChallengeButton = document.getElementById('NewChallengeButton');
  const categoryButtons = document.querySelectorAll('.buttons button');
  let currentCategory = null;

  // Define an array of music problems for each category
  let musicProblems = {
    notes: [
      'C5/q, B4/q/r, A4/q/r, G4/q/r', 'D5/q, C5, B4, A4', 'E5/q, D5, C5, B4',
      'F5/q, E5, D5, C5', 'G5/q, F5, E5, D5', 'A5/q, G5, F5, E5',
      'B5/q, A5, G5, F5', 'C6/q, B5, A5, G5', 'D6/q, C6, B5, A5',
      'E6/q, D6, C6, B5', 'F6/q, E6, D6, C6', 'G6/q, F6, E6, D6'
    ],
    chords: [
      '(C4 E4 G4)/w',
      '(C#4 F4 G#4)/w',
      '(D4 F#4 A4)/w',
      '(Eb4 G4 Bb4)/w',
      '(E4 G#4 B4)/w',
      '(F4 A4 C4)/w',
      '(F#4 A#4 C#4)/w',
      '(G4 B4 D4)/w',
      '(Ab4 C4 Eb4)/w',
      '(A4 C#4 E4)/w',
      '(Bb4 D4 F4)/w',
      '(B4 D#4 F#4)/w'
             ]/*,*/
    // Define similar arrays for other categories
  };

  let remainingProblems = {};
  Object.keys(musicProblems).forEach(category => {
    remainingProblems[category] = [...musicProblems[category]];
  });

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Reset current category and style
        currentCategory = button.id.replace('Button', '');
        categoryButtons.forEach(btn => btn.style.cssText = '');
        button.style.border = 'thick solid';
        button.style.fontWeight = 'bold';

        // Reset the problems for the new category
        remainingProblems[currentCategory] = [...musicProblems[currentCategory]];

        // Reset the New Challenge Button style
        newChallengeButton.style.backgroundColor = '';
        newChallengeButton.style.color = '';

        // Remove the Try Again button if it exists
        const tryAgainButton = document.getElementById('tryAgainButton');
        if (tryAgainButton) {
            tryAgainButton.remove();
        }
    });
});

  newChallengeButton.addEventListener('click', () => {
    if (currentCategory && remainingProblems[currentCategory].length > 0) {
      let randomProblemIndex = Math.floor(Math.random() * remainingProblems[currentCategory].length);
      let selectedProblem = remainingProblems[currentCategory][randomProblemIndex];
      remainingProblems[currentCategory].splice(randomProblemIndex, 1);

      renderVexFlowNotation(selectedProblem);

      if (remainingProblems[currentCategory].length === 0) {
        newChallengeButton.style.backgroundColor = 'gold';
        newChallengeButton.style.color = 'grey';
        resetProblemsAndCreateTryAgainButton();
    }
    
    }
  });
});

function renderVexFlowNotation(selectedProblem) {
  const VF = Vex.Flow;
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  // Create an SVG renderer and attach it to the DIV element with ID 'output'.
  var vf = new VF.Factory({ renderer: { elementId: 'output' } });
  var score = vf.EasyScore();

  // Create a stave (a set of 5 horizontal lines) and add it to the system.
  var system = vf.System();
  system.addStave({
    voices: [score.voice(score.notes(selectedProblem))]
  }).addClef('treble').addTimeSignature('4/4');

  // Draw the notation.
  vf.draw();
}

// Test:
// renderVexFlowNotation('C5/q, B4, A4, G4')

function resetProblemsAndCreateTryAgainButton() {
  remainingProblems[currentCategory] = [...musicProblems[currentCategory]];

  // Change the NewChallengeButton style back if needed
  newChallengeButton.style.backgroundColor = '';
  newChallengeButton.style.color = '';

  // Create the Try Again button
  const tryAgainButton = document.createElement('button');
  tryAgainButton.textContent = 'Want to try again?';
  tryAgainButton.id = 'tryAgainButton';
  tryAgainButton.addEventListener('click', () => {
      remainingProblems[currentCategory] = [...musicProblems[currentCategory]];
      tryAgainButton.remove();
  });

  // Insert the Try Again button next to the New Challenge Button
  newChallengeButton.insertAdjacentElement('afterend', tryAgainButton);
}

function markProblemAsSolved() {
  // Implement functionality to add a green checkmark
  // This function should be called when a problem is answered correctly
}
