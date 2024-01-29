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
  let currentProblemContainer = null; // Variable to hold the current problem container
  let musicProblems = { // Define an array of music problems for each category
    notes: [
      'Cb4/w', 'C4/w', 'C#4/w', 'Db4/w', 'D4/w', 'D#4/w', 'Eb4/w', 'E4/w', 'E#4/w', 'Fb4/w', 'F4/w', 'F#4/w',
      'Gb4/w', 'G4/w', 'G#4/w', 'Ab4/w', 'A4/w', 'A#4/w', 'Bb4/w', 'B4/w', 'B#4/w'
    ],

    chords: [
      '(Cb4 Eb4 Gb4)/w',
      '(Eb4 Gb4 Cb5)/w',
      '(Gb4 Cb5 Eb5)/w',
      '(C4 E4 G4)/w',
      '(E4 G4 C5)/w',
      '(G4 C5 E5)/w',
      '(C#4 E#4 G#4)/w',
      '(E#4 G#4 C#5)/w',
      '(G#4 C#5 E#5)/w',
      '(Db4 F4 Ab4)/w',
      '(F4 Ab4 Db5)/w',
      '(Ab4 Db5 F5)/w',
      '(D4 F#4 A4)/w',
      '(F#4 A4 D5)/w',
      '(A4 D5 F#5)/w',
      '(D#4 G4 A#4)/w',
      '(G4 A#4 D#5)/w',
      '(A#4 D#5 G5)/w',
      '(Eb4 G4 Bb4)/w',
      '(G4 Bb4 Eb5)/w',
      '(Bb4 Eb5 G5)/w',
      '(E4 G#4 B4)/w',
      '(G#4 B4 E5)/w',
      '(B4 E5 G#5)/w',
      '(E#4 A#4 C#5)/w',
      '(A#4 C#5 E#5)/w',
      '(C#5 E#5 A#5)/w',
      '(Fb4 Ab4 Cb5)/w',
      '(Ab4 Cb5 Fb5)/w',
      '(Cb5 Fb5 Ab5)/w',
      '(F4 A4 C5)/w',
      '(A4 C5 F5)/w',
      '(C5 F5 A5)/w',
      '(F#4 A#4 C#5)/w',
      '(A#4 C#5 F#5)/w',
      '(C#5 F#5 A#5)/w',
      '(Gb4 Bb4 Db5)/w',
      '(Bb4 Db5 Gb5)/w',
      '(Db5 Gb5 Bb5)/w',
      '(G4 B4 D5)/w',
      '(B4 D5 G5)/w',
      '(D5 G5 B5)/w',
      '(G#4 C5 D#5)/w',
      '(C5 D#5 G#5)/w',
      '(D#5 G#5 C6)/w',
      '(Ab4 C5 Eb5)/w',
      '(C5 Eb5 Ab5)/w',
      '(Eb5 Ab5 C6)/w',
      '(A4 C#5 E5)/w',
      '(C#5 E5 A5)/w',
      '(E5 A5 C#6)/w',
      '(A#4 D5 F5)/w',
      '(D5 F5 A#5)/w',
      '(F5 A#5 D6)/w',
      '(Bb4 D5 F5)/w',
      '(D5 F5 Bb5)/w',
      '(F5 Bb5 D6)/w',
      '(B4 D#5 F#5)/w',
      '(D#5 F#5 B5)/w',
      '(F#5 B5 D#6)/w',
      '(B#4 E#5 G#5)/w',
      '(E#5 G#5 B#5)/w',
      '(G#5 B#5 E#6)/w',      
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

  // let currentProblemContainer = null; // Variable to hold the current problem container

  newChallengeButton.addEventListener('click', () => {
    if (currentCategory && remainingProblems[currentCategory].length > 0) {
        let randomProblemIndex = Math.floor(Math.random() * remainingProblems[currentCategory].length);
        let selectedProblem = remainingProblems[currentCategory][randomProblemIndex];
        remainingProblems[currentCategory].splice(randomProblemIndex, 1);

        // Capture the problemContainer returned by renderVexFlowNotation
        currentProblemContainer = renderVexFlowNotation(selectedProblem);

        if (remainingProblems[currentCategory].length === 0) {
            // Your existing code for handling the empty problem set
        }
    } else {
      // No more problems left in the current category
      newChallengeButton.style.backgroundColor = '#ffd700'; // Using hex code for gold color
      newChallengeButton.style.color = 'grey';
      newChallengeButton.disabled = true; // Disable the button
    }

    // Clear the feedback message for the new problem
    let feedbackMsg = document.getElementById('feedback');
    if (feedbackMsg) {
        feedbackMsg.textContent = '';
    }
    if (currentProblemContainer) {
        currentProblemContainer.style.border = 'none'; // Clear the border
    }
  });

  // Event listeners for category buttons to enable the newChallengeButton again
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Resetting current category and problems logic...

      // Enable the newChallengeButton and reset its style
      newChallengeButton.disabled = false;
      newChallengeButton.style.backgroundColor = ''; // Reset to default or desired color
      newChallengeButton.style.color = ''; // Reset to default or desired text color
    });
});

// Mapping of music problems to their valid answers
let correctAnswersMapping = {
  'Cb4/w': ['cb', 'cb4'],
  'C4/w': ['c', 'c4'],
  'C#4/w': ['c#', 'c#4'],
  'Db4/w': ['db', 'db4'],
  'D4/w': ['d', 'd4'],
  'D#4/w': ['d#', 'd#4'],
  'Eb4/w': ['eb', 'eb4'],
  'E4/w': ['e', 'e4'],
  'E#4/w': ['e#', 'e#4'],
  'Fb4/w': ['fb', 'fb4'],
  'F4/w': ['f', 'f4'],
  'F#4/w': ['f#', 'f#4'],
  'Gb4/w': ['gb', 'gb4'],
  'G4/w': ['g', 'g4'],
  'G#4/w': ['g#', 'g#4'],
  'Ab4/w': ['ab', 'ab4'],
  'A4/w': ['a', 'a4'],
  'A#4/w': ['a#', 'a#4'],
  'Bb4/w': ['bb', 'bb4'],
  'B4/w': ['b', 'b4'],
  'B#4/w': ['b#', 'b#4'],
  '(Cb4 Eb4 Gb4)/w': 'cb major',
  '(Eb4 Gb4 Cb5)/w': 'cb major',
  '(Gb4 Cb5 Eb5)/w': 'cb major',
  '(C4 E4 G4)/w': 'c major',
  '(E4 G4 C5)/w': 'c major',
  '(G4 C5 E5)/w': 'c major',
  '(C#4 E#4 G#4)/w': 'c# major',
  '(E#4 G#4 C#5)/w': 'c# major',
  '(G#4 C#5 E#5)/w': 'c# major',
  '(Db4 F4 Ab4)/w': 'db major',
  '(F4 Ab4 Db5)/w': 'db major',
  '(Ab4 Db5 F5)/w': 'db major',
  '(D4 F#4 A4)/w': 'd major',
  '(F#4 A4 D5)/w': 'd major',
  '(A4 D5 F#5)/w': 'd major',
  '(D#4 G4 A#4)/w': 'd# major',
  '(G4 A#4 D#5)/w': 'd# major',
  '(A#4 D#5 G5)/w': 'd# major',
  '(Eb4 G4 Bb4)/w': 'eb major',
  '(G4 Bb4 Eb5)/w': 'eb major',
  '(Bb4 Eb5 G5)/w': 'eb major',
  '(E4 G#4 B4)/w': 'e major',
  '(G#4 B4 E5)/w': 'e major',
  '(B4 E5 G#5)/w': 'e major',
  '(E#4 A#4 C#5)/w': 'e# major',
  '(A#4 C#5 E#5)/w': 'e# major',
  '(C#5 E#5 A#5)/w': 'e# major',
  '(Fb4 Ab4 Cb5)/w': 'fb major',
  '(Ab4 Cb5 Fb5)/w': 'fb major',
  '(Cb5 Fb5 Ab5)/w': 'fb major',
  '(F4 A4 C5)/w': 'f major',
  '(A4 C5 F5)/w': 'f major',
  '(C5 F5 A5)/w': 'f major',
  '(F#4 A#4 C#5)/w': 'f# major',
  '(A#4 C#5 F#5)/w': 'f# major',
  '(C#5 F#5 A#5)/w': 'f# major',
  '(Gb4 Bb4 Db5)/w': 'gb major',
  '(Bb4 Db5 Gb5)/w': 'gb major',
  '(Db5 Gb5 Bb5)/w': 'gb major',
  '(G4 B4 D5)/w': 'g major',
  '(B4 D5 G5)/w': 'g major',
  '(D5 G5 B5)/w': 'g major',
  '(G#4 C5 D#5)/w': 'g# major',
  '(C5 D#5 G#5)/w': 'g# major',
  '(D#5 G#5 C6)/w': 'g# major',
  '(Ab4 C5 Eb5)/w': 'ab major',
  '(C5 Eb5 Ab5)/w': 'ab major',
  '(Eb5 Ab5 C6)/w': 'ab major',
  '(A4 C#5 E5)/w': 'a major',
  '(C#5 E5 A5)/w': 'a major',
  '(E5 A5 C#6)/w': 'a major',
  '(A#4 D5 F5)/w': 'a# major',
  '(D5 F5 A#5)/w': 'a# major',
  '(F5 A#5 D6)/w': 'a# major',
  '(Bb4 D5 F5)/w': 'bb major',
  '(D5 F5 Bb5)/w': 'bb major',
  '(F5 Bb5 D6)/w': 'bb major',
  '(B4 D#5 F#5)/w': 'b major',
  '(D#5 F#5 B5)/w': 'b major',
  '(F#5 B5 D#6)/w': 'b major',
  '(B#4 E#5 G#5)/w': 'b# major',
  '(E#5 G#5 B#5)/w': 'b# major',
  '(G#5 B#5 E#6)/w': 'b# major'
  // Continue for each problem...
};

//############################################################################################################################################
// FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION
//############################################################################################################################################

function renderVexFlowNotation(selectedProblem) {
  const VF = Vex.Flow;
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous content

  var vf = new VF.Factory({ renderer: { elementId: 'output' } });
  var score = vf.EasyScore();
  var system = vf.System();
  
  system.addStave({
    voices: [score.voice(score.notes(selectedProblem))]
  }).addClef('treble').addTimeSignature('4/4');
  vf.draw();

  // Create a container for the notation, input, and button
  const problemContainer = document.createElement('div');
  problemContainer.id = 'problemContainer';

  // Move the rendered notation into the container
  while (outputDiv.firstChild) {
    problemContainer.appendChild(outputDiv.firstChild);
  }

  // Add text input and submit button inside the container
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'userInput';
  problemContainer.appendChild(input);

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.onclick = function() { checkAnswer(input.value, selectedProblem); };
  problemContainer.appendChild(submitBtn);

  // Append the container to the output div
  outputDiv.appendChild(problemContainer);

  // Return the problemContainer element for further use
  return problemContainer;
}

//############################################################################################################################################
// FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION
//############################################################################################################################################

function checkAnswer(userInput,  selectedProblem) {
  // Normalize user input
  const normalizedInput = userInput.trim().toLowerCase();

  // Retrieve the array of valid answers for the selected problem
  const validAnswers = correctAnswersMapping[selectedProblem] || [];

  // Determine if the user's input is a valid answer
  const isCorrect = validAnswers.includes(normalizedInput);

  // Ensure the feedback message container exists and is correctly positioned
  let feedbackMsg = ensureFeedbackMsgExists(currentProblemContainer);

  // Update the feedback message based on whether the answer is correct
  if (isCorrect) {
    feedbackMsg.textContent = 'Nice! Correct!';
    feedbackMsg.style.color = 'green';
    currentProblemContainer.style.border = '2px solid green';
  } else {
    feedbackMsg.textContent = 'Not Quite! Try again!';
    feedbackMsg.style.color = 'red';
    currentProblemContainer.style.border = '2px solid red';
  }
}

//############################################################################################################################################
// FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION
//############################################################################################################################################

function ensureFeedbackMsgExists(currentProblemContainer) {
  // Try to find an existing feedback message container inside the current problem container
  let feedbackMsg = currentProblemContainer.querySelector('#feedback');

  // If it doesn't exist, create it and append it to the current problem container
  if (!feedbackMsg) {
    feedbackMsg = document.createElement('div');
    feedbackMsg.id = 'feedback';
    currentProblemContainer.appendChild(feedbackMsg);
  }

  return feedbackMsg;
}

//############################################################################################################################################
// FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION
//############################################################################################################################################

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
}); // This closes the document.addEventListener('DOMContentLoaded', () => { ... });
//############################################################################################################################################
// DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING DEBUGGING 
//############################################################################################################################################
// renderVexFlowNotation('C5/q, B4, A4, G4')