# Access Music Exercises [Here](https://robert-z-lehr.github.io/Music-Education/)
---
### Purpose of Code Files:

1. **HTML Structure**: This includes the main title, subtitle, buttons for each category, and a container (`<div id="exercisesContainer">`) where the exercises will be displayed.

2. **CSS Styling**: This adds basic styling to center the text, space out the buttons, and style the exercise questions and submit buttons.

3. **JavaScript Logic**:
   - The `DOMContentLoaded` event ensures your code runs after the entire DOM is fully loaded.
   - Event listeners are added to the buttons. For now, only the "Notes" button (`notesButton`) has functionality.
   - When the "Notes" button is clicked, it clears the existing content in `exercisesContainer` and adds three note exercises (C, E, G) using the `addNoteExercise` function.
   - `addNoteExercise` creates a new div for each question, with a submit button. Clicking the submit button changes its color to green.
   - `renderNote` uses VexFlow to render the specified note inside the created div.

### Integration:

- Make sure the VexFlow library is correctly linked in your HTML.
- Include your CSS in a `<style>` tag in the `<head>` section of your HTML or link to an external CSS file.
- Your JavaScript can be included at the end of the `<body>` section or in an external file.
- The VexFlow exercise JavaScript (`VexFlow_Exercise_v1.0.js`) should contain the functions `addNoteExercise` and `renderNote`.

This is a basic implementation and can be expanded and refined based on your specific requirements and styling preferences.
