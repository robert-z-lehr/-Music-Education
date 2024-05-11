/*
Music Theory Application [javascript file]
*/

//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v V
//  IMPORT DEPENDENCIES & DEFINE OBJECTS  IMPORT DEPENDENCIES & DEFINE OBJECTS  IMPORT DEPENDENCIES & DEFINE OBJECTS  
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

// Create a global variable named 'VF' to store the VexFlow namespace after loading the library
let VF;

// Import necessary classes from the VexFlow library.
const { Renderer, TickContext, Stave, StaveNote, Accidental } = Vex.Flow;

// Select the HTML div element where the music notation will be rendered.
const div = document.getElementById("output");

// Initialize the renderer for the SVG format.
const renderer = new Renderer(div, Renderer.Backends.SVG);

// (Configure) Set the size of the SVG canvas where the music notation will appear.
renderer.resize(1560, 1000);

// Get the context of the renderer, which is necessary for drawing.
const context = renderer.getContext();

// Initialize a TickContext, which is necessary for managing the timing and positioning of notes.
const tickContext = new TickContext();

// Change 'const' to 'let' to allow reassignment
let stave = new Stave(10, 10, 1550).addClef("treble");

// Draw the stave on the SVG canvas.
stave.setContext(context).draw();

// Define an array of possible note durations.
const durations = ["8", "4", "2", "1"];

// Define an array of clefs
const clefs = ['treble', 'bass'];

// Generate an array of note configurations, each with a note letter, accidental, and octave.
// For each note configuration, create a StaveNote object.
// The map function transforms each note configuration into a StaveNote.
// Adjusting the octave for treble clef to stay mostly on the staff

// Define notes for treble and bass clefs
const trebleNotes = [
    ["a", "", "4"],
    ["a", "b", "4"],
    ["a", "#", "4"],
    ["b", "", "4"],
    ["b", "b", "4"],
    ["b", "#", "4"],
    ["c", "", "4"],
    ["c", "b", "4"],
    ["c", "#", "4"],
    ["d", "", "4"],
    ["d", "b", "4"],
    ["d", "#", "4"],
    ["e", "", "4"],
    ["e", "b", "4"],
    ["e", "#", "4"],
    ["f", "", "4"],
    ["f", "b", "4"],
    ["f", "#", "4"],
    ["g", "", "4"],
    ["g", "b", "4"],
    ["g", "#", "4"]
];
const bassNotes = [
    ["a", "", "3"],
    ["a", "b", "3"],
    ["a", "#", "3"],
    ["b", "", "3"],
    ["b", "b", "3"],
    ["b", "#", "3"],
    ["c", "", "3"],
    ["c", "b", "3"],
    ["c", "#", "3"],
    ["d", "", "3"],
    ["d", "b", "3"],
    ["d", "#", "3"],
    ["e", "", "3"],
    ["e", "b", "3"],
    ["e", "#", "3"],
    ["f", "", "3"],
    ["f", "b", "3"],
    ["f", "#", "3"],
    ["g", "", "3"],
    ["g", "b", "3"],
    ["g", "#", "3"]
];
// Prepare the TickContext for formatting by calculating the positions of tickables (notes).
tickContext.preFormat().setX(1540);  // Adjust to a value close to the end of your new stave width

// This array will hold groups of SVG elements that represent notes currently displayed on the stave.
const visibleNoteGroups = [];

//////////// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//  SET UP?  SET UP?  SET UP?  SET UP?  SET UP?  SET UP?  SET UP?  SET UP?  SET UP?  SET UP?  SET UP?  SET UP?  
//////////// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

//--------------------------------------------------------------------------------------------------------------//

//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v
//  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS   
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

// Function to get a random note from the appropriate range
function getRandomNote() {
    let noteArray = stave.clef === "treble" ? trebleNotes : bassNotes;
    const noteIndex = Math.floor(Math.random() * noteArray.length);
    const note = noteArray[noteIndex];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    return new StaveNote({
        clef: stave.clef,
        keys: [note],
        duration: duration.toString()
    });
}

// Update your addNote function to use this new method
function addNote() {
    console.log("Attempting to add a note...");
    let notesArray = stave.clef === "treble" ? trebleNotes : bassNotes;

    if (notesArray.length === 0) {
        console.log("No more notes available.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * notesArray.length);
    const [letter, accidental, octave] = notesArray[randomIndex];

    const duration = durations[Math.floor(Math.random() * durations.length)];
    console.log(`Creating note: ${letter}${accidental}/${octave} with duration: ${duration}`);

    const note = new StaveNote({
        clef: stave.clef,
        keys: [`${letter}${accidental}/${octave}`],
        duration: duration
    });

    if (accidental) {
        note.addAccidental(0, new Accidental(accidental));
    }

    tickContext.addTickable(note).preFormat().setX(1540);
    console.log("TickContext formatted and note added.");

    const noteGroup = context.openGroup();
    note.setContext(context).setStave(stave).draw();
    context.closeGroup();
    console.log("Note drawn on stave.");

    // Start off-screen to the right within the visible container
    // noteGroup.style.transform = 'translateX(0px)';
    window.getComputedStyle(noteGroup).transform;
    console.log("Initial transform applied.");
    noteGroup.classList.add("scroll");

    // Allow the transition to start smoothly
    setTimeout(() => {
        noteGroup.classList.add("scrolling");
        console.log("Scrolling class added, animation should start.");
    }, 100);  // Ensures CSS catches up to start transition

    visibleNoteGroups.push(noteGroup);
    console.log("Note group added to visible groups.");
}

// Listen for clef changes and redraw stave if needed
function handleClefChange() {
    const currentTime = new Date().getTime();
    if (currentTime % 2 === 0) {
        const newClef = stave.clef === "treble" ? "bass" : "treble";
        stave.setClef(newClef);
        context.clear();  // Clear the existing drawing
        stave.setContext(context).draw();
        console.log(`Clef changed to ${newClef}`);
    }
}

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
    label.textContent = 'Identify the major key signature:';
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
        ["16", "16", "16", "16", "q", "q"],
        ["1", "2", "q", "8", "16", "32"],
        ["3", "3", "2", "q", "8", "8", "16", "16"],
        ["1"]
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
// Function to render sheet music using VexFlow
function renderSheetMusic() {
    const sheetMusicContainer = document.getElementById('sheetMusicContainer');
    sheetMusicContainer.innerHTML = '';

    const controlsAndStaffContainer = document.createElement('div');
    controlsAndStaffContainer.style.display = 'flex';
    controlsAndStaffContainer.style.flexDirection = 'column';
    sheetMusicContainer.appendChild(controlsAndStaffContainer);

    const controlsContainer = document.createElement('div');
    controlsAndStaffContainer.appendChild(controlsContainer);

    const label = document.createElement('p');
    label.textContent = 'View downloadable sheet music:';
    controlsContainer.appendChild(label);

    const button = document.createElement('button');
    button.textContent = 'Generate Sheet Music';
    button.addEventListener('click', function() {
        renderDetailedMusicNotation(document.getElementById('staffContainer'));
    });
    controlsContainer.appendChild(button);

    const staffContainer = document.createElement('div');
    staffContainer.style.flexGrow = '1';
    staffContainer.id = 'staffContainer';
    controlsAndStaffContainer.appendChild(staffContainer);

    // Initial rendering to show blank staves or a basic setup
    renderVexFlowMusic(staffContainer);
}

// Function to set up and draw initial staves (can be empty or with a basic clef)
function renderVexFlowMusic(container) {
    const VF = Vex.Flow;
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(500, 600); // Set width and total height for multiple staves
    const context = renderer.getContext();
    let stave = new VF.Stave(10, 10, 480);
    stave.addClef('treble').setContext(context).draw();
}

// Function to render detailed music notation as per user's button click
function renderDetailedMusicNotation(container) {
    const VF = Vex.Flow;
    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(500, 600); // Adjust as necessary
    const context = renderer.getContext();
    context.clear(); // Clear previous contents

    let startY = 10;
    const staveWidth = 480;
    for (let i = 0; i < 4; i++) { // Example to draw 4 staves
        let stave = new VF.Stave(10, startY, staveWidth);
        if (i === 0) {
            stave.addClef("treble").addTimeSignature("4/4");
        }
        stave.setContext(context).draw();

        // Draw notes example
        const notes = [
            new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
            new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
            new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
            new VF.StaveNote({ keys: ["f/4"], duration: "q" })
        ];

        const voice = new VF.Voice({num_beats: 4, beat_value: 4});
        voice.addTickables(notes);
        new VF.Formatter().joinVoices([voice]).format([voice], staveWidth - 10);
        voice.draw(context, stave);

        startY += 150; // Move down for the next stave
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
// Main function to initialize the application
function main() {
    loadVexFlowScript(); // Load VexFlow and other dependencies
    document.addEventListener('DOMContentLoaded', function() {
        setUpDownloadButtons();
        renderSheetMusic(); // Initially render sheet music setup
    });
}

// Call the main function to start the application
main();

//////////// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  FUNCTIONS  
//////////// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

//----------------------------------------------------------------------------------------------------------------------//

//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v
//  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS   
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//////////// v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v

// Listen for clicks on the "Add Note" button and add a note to the stave from the appropriate array (if there are any notes left)
document.getElementById("add-note").addEventListener("click", (e) => {
    document.getElementById("animation-container").style.borderColor = "black";
    console.log("Add Note button clicked");

    // Determine which array to use based on the current clef
    let notesArray = stave.clef === "treble" ? trebleNotes : bassNotes;

    if (notesArray.length === 0) {
        console.log("No more notes available.");
        return;
    }

    handleClefChange(); // Handle clef changes based on condition
    addNote(); // Add note function that now correctly handles noteGroup scope
});

// Listen for clicks on the "Right Answer" button and animate the correctly answered note moving upwards.
document.getElementById("right-answer").addEventListener("click", (e) => {
    document.getElementById("animation-container").style.borderColor = "green";
    if (visibleNoteGroups.length === 0) return;
    
    // Remove the first note group from the array and animate it
    const group = visibleNoteGroups.shift();
    group.classList.add("correct");

    // Force a reflow to ensure the transform applies immediately
    window.getComputedStyle(group).transform;

    // Extract the x translation value from the computed style and apply the transform
    const transformMatrix = window.getComputedStyle(group).transform;
    const x = transformMatrix.split(",")[4].trim();
    group.style.transform = `translate(${x}px, -800px)`;
});

// Listen for clicks on the "Wrong Answer" button and animate the correctly answered note moving upwards.
document.getElementById("wrong-answer").addEventListener("click", (e) => {
    document.getElementById("animation-container").style.borderColor = "red";
    if (visibleNoteGroups.length === 0) return;
    
    // Remove the first note group from the array and animate it
    const group = visibleNoteGroups.shift();
    group.classList.add("incorrect");

    // Force a reflow to ensure the transform applies immediately
    window.getComputedStyle(group).transform;

    // Extract the x translation value from the computed style and apply the transform
    const transformMatrix = window.getComputedStyle(group).transform;
    const x = transformMatrix.split(",")[4].trim();
    group.style.transform = `translate(${x}px, 800px)`;
});

// Listen for clicks on the "Too Slow" button and animate the correctly answered note moving upwards.
document.getElementById("not-fast-enough-answer").addEventListener("click", (e) => {
    document.getElementById("animation-container").style.borderColor = "purple";
    if (visibleNoteGroups.length === 0) return;
    
    // Remove the first note group from the array and animate it
    const group = visibleNoteGroups.shift();
    group.classList.add("too-slow");

    // Force a reflow to ensure the transform applies immediately
    window.getComputedStyle(group).transform;

    // Extract the x translation value from the computed style and apply the transform
    const transformMatrix = window.getComputedStyle(group).transform;
    const x = transformMatrix.split(",")[4].trim();
    group.style.transform = `translate(${x}px, 0px)`;
});

//////////// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |
//  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS  EVENT LISTENERS   
//////////// ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^
//////////// | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |