/*
Music Theory Application [javascript file]
*/

// Create a global variable named 'VF' to store the VexFlow namespace after loading the library
let VF;

/*
QUESTION FUNCTIONS SECTION - start
QUESTION FUNCTIONS SECTION - start
QUESTION FUNCTIONS SECTION - start
*/

// TIME SIGNATURE FUNCTION | TIME SIGNATURE FUNCTION | TIME SIGNATURE FUNCTION | TIME SIGNATURE FUNCTION | TIME SIGNATURE FUNCTION | 
function generateTimeSignatureQuestion() {
    const questionDiv = document.getElementById("timeSignatureQuestion");
    questionDiv.innerHTML = ''; // Clear the container

    // Create a container for the button and the VexFlow object
    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.alignItems = 'flex-start'; // Align items at the start of the container
    questionDiv.appendChild(controlsAndStaffContainer);

    // Create a container for the button and text box (vertical layout)
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column'; // Stack items vertically
    controlsAndStaffContainer.appendChild(controlsContainer);

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'What does this time signature tell us?';
    controlsContainer.appendChild(label); // Append the label to the controls container for vertical alignment

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'New Time Signature';
    button.addEventListener('click', generateTimeSignatureQuestion);
    controlsContainer.appendChild(button); // Append the button to the controls container

    // Create and append the text box below the button
    const textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.setAttribute('maxlength', '200');
    textBox.setAttribute('placeholder', 'Type your answer here...');
    textBox.style.marginTop = '10px'; // Add some space between the button and the text box
    controlsContainer.appendChild(textBox); // Append the text box to the controls container

    // Container for the VexFlow object
    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1'; // Allow the staff container to take up remaining space
    staffContainer.style.paddingLeft = '20px'; // Add some space between the controls and the staff
    controlsAndStaffContainer.appendChild(staffContainer);

    // Set up VexFlow and draw the staff inside the staff container
    const renderer = new VF.Renderer(staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(500, 150); // Set the size of the staff
    const context = renderer.getContext();
    const stave = new VF.Stave(0, 0, 400); // Adjust starting position if needed
    const timeSignatures = ["4/4", "3/4", "2/4", "6/8", "5/4", "7/8"];
    const selectedTimeSignature = timeSignatures[Math.floor(Math.random() * timeSignatures.length)];
    stave.addTimeSignature(selectedTimeSignature);
    stave.setContext(context).draw();
}

// KEY SIGNATURE FUNCTION | KEY SIGNATURE FUNCTION | KEY SIGNATURE FUNCTION | KEY SIGNATURE FUNCTION | KEY SIGNATURE FUNCTION |
function generateKeySignatureQuestion() {
    const questionDiv = document.getElementById("keySignatureQuestion");
    questionDiv.innerHTML = ''; // Clear the container

    // Create a container for the button and the VexFlow object
    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.alignItems = 'flex-start'; // Align items at the start of the container
    questionDiv.appendChild(controlsAndStaffContainer);

    // Create a container for the button and text box (vertical layout)
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column'; // Stack items vertically
    controlsAndStaffContainer.appendChild(controlsContainer);

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'Identify the key signature:';
    controlsContainer.appendChild(label); // Append the label to the controls container for vertical alignment

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'New Key Signature';
    button.addEventListener('click', generateKeySignatureQuestion);
    controlsContainer.appendChild(button); // Append the button to the controls container

    // Create and append the text box below the button
    const textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.setAttribute('maxlength', '200');
    textBox.setAttribute('placeholder', 'Type your answer here...');
    textBox.style.marginTop = '10px'; // Add some space between the button and the text box
    controlsContainer.appendChild(textBox); // Append the text box to the controls container

    // Container for the VexFlow object
    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1'; // Allow the staff container to take up remaining space
    staffContainer.style.paddingLeft = '20px'; // Add some space between the controls and the staff
    controlsAndStaffContainer.appendChild(staffContainer);

    // Set up VexFlow and draw the staff inside the staff container
    const renderer = new VF.Renderer(staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(500, 150); // Set the size of the staff
    const context = renderer.getContext();
    const stave = new VF.Stave(0, 0, 400); // Adjust starting position if needed

    // Define an array of possible key signatures and select one at random
    const keySignatures = [
        "C", "G", "D", "A", "E", "B", "F#", "C#",
        "F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"
    ];
    const selectedKeySignature = keySignatures[Math.floor(Math.random() * keySignatures.length)];

    // Use the randomly selected key signature
    stave.addClef("treble").addKeySignature(selectedKeySignature);
    stave.setContext(context).draw();
}

// RHYTHM QUESTION FUNCTION | RHYTHM QUESTION FUNCTION | RHYTHM QUESTION FUNCTION | RHYTHM QUESTION FUNCTION | RHYTHM QUESTION FUNCTION | 
function generateRhythmQuestion() {
    const questionDiv = document.getElementById("rhythmQuestion");
    questionDiv.innerHTML = ''; // Clear the container

    // Create a container for the button and the VexFlow object
    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.alignItems = 'flex-start';
    questionDiv.appendChild(controlsAndStaffContainer);

    // Create a container for the button and text box (vertical layout)
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsAndStaffContainer.appendChild(controlsContainer);

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'Clap the rhythm shown:';
    controlsContainer.appendChild(label);

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'New Rhythm';
    button.addEventListener('click', generateRhythmQuestion);
    controlsContainer.appendChild(button);

    // Create and append the text box below the button
    const textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.setAttribute('maxlength', '200');
    textBox.setAttribute('placeholder', 'Type your answer here...');
    textBox.style.marginTop = '10px';
    controlsContainer.appendChild(textBox);

    // Container for the VexFlow object
    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1';
    staffContainer.style.paddingLeft = '20px';
    controlsAndStaffContainer.appendChild(staffContainer);

    // Set up VexFlow and draw the staff inside the staff container
    const renderer = new VF.Renderer(staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(500, 150);
    const context = renderer.getContext();
    const stave = new VF.Stave(0, 0, 400);
    stave.addClef("percussion");
    stave.setContext(context).draw();

    // Define rhythm patterns and select one
    const rhythmPatterns = [
        ["q", "q", "q", "q"], 
        ["8", "8", "q", "q", "q"],
        ["q", "8", "8", "q", "q"],
        ["q", "q", "8", "8", "q"],
        ["16", "16", "16", "16", "q", "q"]
    ];
    const selectedPattern = rhythmPatterns[Math.floor(Math.random() * rhythmPatterns.length)];

    // Generate and draw notes based on the selected rhythm pattern
    const notes = selectedPattern.map(duration => new VF.StaveNote({
        keys: ["b/4"],
        duration: duration
    }));
    const beams = VF.Beam.generateBeams(notes.filter(note => note.duration !== "q" && note.duration !== "h" && note.duration !== "w"));
    VF.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(beam => beam.setContext(context).draw());
}

// SINGLE NOTE QUESTION FUNCTION | SINGLE NOTE QUESTION FUNCTION | SINGLE NOTE QUESTION FUNCTION | SINGLE NOTE QUESTION FUNCTION |
function generateSingleNoteQuestion() {
    const questionDiv = document.getElementById("singleNoteQuestion");
    questionDiv.innerHTML = ''; // Clear the container

    // Create a container for the button and the VexFlow object
    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.alignItems = 'flex-start';
    questionDiv.appendChild(controlsAndStaffContainer);

    // Create a container for the button and text box (vertical layout)
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.flexDirection = 'column';
    controlsAndStaffContainer.appendChild(controlsContainer);

    // Create and append the question label above everything
    const label = document.createElement('p');
    label.textContent = 'Identify the note shown:';
    controlsContainer.appendChild(label);

    // Create and append the button
    const button = document.createElement('button');
    button.textContent = 'New Note';
    button.addEventListener('click', generateSingleNoteQuestion);
    controlsContainer.appendChild(button);

    // Create and append the text box below the button
    const textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.setAttribute('maxlength', '200');
    textBox.setAttribute('placeholder', 'Type your answer here...');
    textBox.style.marginTop = '10px';
    controlsContainer.appendChild(textBox);

    // Container for the VexFlow object
    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1';
    staffContainer.style.paddingLeft = '20px';
    controlsAndStaffContainer.appendChild(staffContainer);

    // Set up VexFlow and draw the staff inside the staff container
    const renderer = new VF.Renderer(staffContainer, VF.Renderer.Backends.SVG);
    renderer.resize(250, 200);
    const context = renderer.getContext();
    const stave = new VF.Stave(0, 0, 200);
    stave.addClef("treble").setContext(context).draw();

    // Generate and draw a random note
    const notes = [
        "c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4",
        "c#/4", "d#/4", "e#/4", "f#/4", "g#/4", "a#/4", "b#/4",
        "cb/4", "db/4", "eb/4", "fb/4", "gb/4", "ab/4", "bb/4"
    ];
    const selectedNote = notes[Math.floor(Math.random() * notes.length)];
    const note = new VF.StaveNote({ keys: [selectedNote], duration: "q" });
    VF.Formatter.FormatAndDraw(context, stave, [note]);
}


/* What this function does:
    * To be determined
*/
function generateArticulationQuestion() {
    // Logic for generating a new articulation question
}

/* What this function does:
* To be determined
*/
function generateAccidentalQuestion() {
    // Logic for generating a new accidental question
}

/* What this function does:
* To be determined
*/
function generateClefQuestion() {
    // Logic for generating a new clef question
}

/* What this function does:
* To be determined
*/
function generateChordQuestion() {
// Logic for generating a new chord question
}

// Add more functions for other types of questions (e.g., generateKeySignatureQuestion, generateRhythmQuestion, etc.) following the same structure as generateTimeSignatureQuestion()

/*
QUESTION FUNCTIONS SECTION - end
QUESTION FUNCTIONS SECTION - end
QUESTION FUNCTIONS SECTION - end
*/

// Function to initialize all music theory questions
function initializeMusicTheoryQuestions() {
    generateTimeSignatureQuestion();
    generateKeySignatureQuestion();
    generateRhythmQuestion();
    generateSingleNoteQuestion();
    generateArticulationQuestion(); // Make sure this function is defined
    generateAccidentalQuestion(); // Make sure this function is defined
    generateClefQuestion(); // Make sure this function is defined
    generateChordQuestion(); // Make sure this function is defined
    // Initialize other types of questions here...
}

// Function to set up the renderer and clear previous content
function clearAndSetUpRenderer(elementId) {
    const div = document.getElementById(elementId);
    div.innerHTML = '';
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 150);
    const context = renderer.getContext();
    return { div, context };
}

// Function to select a random element from an array
function selectRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Function to add a new question button
function addNewQuestionButton(div, buttonText, onClickFunction) {
    const btn = document.createElement('button');
    btn.textContent = buttonText;
    btn.onclick = onClickFunction;
    div.appendChild(btn);
}

// Function to append a question label
function appendQuestionLabel(div, labelText) {
    div.insertAdjacentHTML('beforeend', `<p>${labelText}</p>`);
}

// Function to render sheet music using VexFlow
function renderSheetMusic() {
    const div = document.getElementById('sheetMusicContainer');
    div.innerHTML = ''; // Clear existing content

    const VF = Vex.Flow;
    const width = 500; // Width of each stave
    const heightPerStave = 150; // Height per stave, adjust as needed
    const numberOfStaves = 4; // Total number of staves
    const measuresPerStave = 2; // Number of measures per stave

    div.style.width = `${width}px`;
    div.style.height = `${heightPerStave * numberOfStaves}px`;
    div.style.overflowY = 'auto';

    let staveYPosition = 10; // Initial Y position for the first stave

    for (let i = 0; i < numberOfStaves; i++) {
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(width, heightPerStave);
        const context = renderer.getContext();

        for (let j = 0; j < measuresPerStave; j++) {
            const staveXPosition = 10 + (width / measuresPerStave) * j;
            const staveWidth = width / measuresPerStave - 20; // Leave some margin on each side
            const stave = new VF.Stave(staveXPosition, staveYPosition, staveWidth);

            if (i === 0 && j === 0) {
                stave.addClef('treble');
            }
            stave.setContext(context).draw();

            // Create notes for the measure
            const notes = [
                new VF.StaveNote({ keys: ['d/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['f#/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['g/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['a/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['b/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['a/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['g/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['f#/5'], duration: '16' }),
                // Repeat the pattern to fill the measure
                new VF.StaveNote({ keys: ['d/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['f#/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['g/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['a/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['b/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['a/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['g/5'], duration: '16' }),
                new VF.StaveNote({ keys: ['f#/5'], duration: '16' })
            ];

            // Create beams for the 16th notes
            const beams = VF.Beam.generateBeams(notes);

            // Create a voice and add notes
            const voice = new VF.Voice({num_beats: 4, beat_value: 4});
            voice.addTickables(notes);

            // Format and draw the voice
            new VF.Formatter().joinVoices([voice]).format([voice], staveWidth);
            voice.draw(context, stave);

            // Draw beams
            beams.forEach(beam => beam.setContext(context).draw());
        }

        staveYPosition += heightPerStave; // Move down for the next set of staves
    }
}


// Function to download the rendered sheet music as PNG
function downloadAsPNG() {
    html2canvas(document.getElementById('sheetMusicContainer')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'sheet-music.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Function to download the rendered sheet music as PDF
function downloadAsPDF() {
    html2canvas(document.getElementById('sheetMusicContainer')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        // Access jsPDF from a namespaced property under window
        const pdf = new window.jspdf.jsPDF(); 
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('sheet-music.pdf');
    });
}


// Function to load the VexFlow library and set up the application
function loadVexFlowScript() {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/vexflow/3.0.9/vexflow-min.js";
    script.onload = () => {
        VF = Vex.Flow;
        initializeMusicTheoryQuestions();
    };
    document.head.appendChild(script);
}

// Function to set up event listeners for download buttons
function setUpDownloadButtons() {
    document.getElementById('downloadPdfBtn').addEventListener('click', downloadAsPDF);
    document.getElementById('downloadAsPngBtn').addEventListener('click', downloadAsPNG);
}

// Main function to start the application
function main() {
    loadVexFlowScript();
    document.addEventListener('DOMContentLoaded', function() {
        setUpDownloadButtons();
        renderSheetMusic(); // Make sure to render the sheet music once everything is loaded
    });
}

// Call the main function to start the application
main();