/*
 * jspsych-overlay
 *
 * Author: Robin Bürkli <robuba.jr@gmx.ch>
 * License: MIT
 *
 * This file contains tools which help to create an overlay in a jsPsych
 * experiment or trial.
 */

// Declare a variable for the overlay div
let overlayDiv: HTMLElement;
// Declare a variable for the function a consumer of this library can declare
let updateFunctionUser: Function;
// Declare variables to store the time elapsed since the overlay was shown
let millisElapsed: number = 0;
// Declare a variable to hold temporary values, to calculate the time elapsed
// from update cycle to update cycle
let previousTime: number = 0;
// Delcare a variable which controls whether a further update cycle should take
// place or not
let continueShowingOverlay: boolean = true;

/**
 * Shows the overlay by changing its CSS 'display' property and starts the
 * update cycle loop.
 */
const startShowingOverlay = () => {
  // Reset time elapsed in case the same overlay gets shown twice
  millisElapsed = 0;
  previousTime = Date.now();
  updateCycle();
  overlayDiv.style.display = 'block';
};

/**
 * Hides the overlay and adds to the time elapsed the time between the last
 * update cycle and now. Also stops the update cycle loop.
 */
const stopShowingOverlay = () => {
  millisElapsed += Date.now() - previousTime;
  // Call the library consumer's specified function a last time.
  if (updateFunctionUser) {
    updateFunctionUser(millisElapsed, (html: string) => {
      overlayDiv.innerHTML = html;
    });
  }
  continueShowingOverlay = false;
  overlayDiv.style.display = 'none';
};

/**
 * Updates the elapsed time since start and calls the library consumer's
 * specified function.
 */
const updateCycle = () => {
  if (continueShowingOverlay === true) {
    const time = Date.now();
    millisElapsed += time - previousTime;
    // Call the library consumer's specified function.
    updateFunctionUser(millisElapsed, (html: string) => {
      overlayDiv.innerHTML = html;
    });
    previousTime = time;
    // Schedule the next cycle in 1ms
    setTimeout(updateCycle, 1);
  }
};

/**
 * Generates an overlay element based on HTML specified by the consumer, and
 * appends it to a parent element defined by the consumer.
 * @param overlayParent The HTML element which the overlay element should be
 * appended to
 * @param overlayHtml The inner HTML of the newly generated overlay element
 * @param update A function which gets called on each update cycle (usually
 * every 1 - 10ms). It can take two parameters, one number for the elapsed time
 * in milliseconds, and one function function which can provide a new string to
 * update the inner HTML of the overlay.
 * @returns An object containing two function, one to start showing the overlay
 * and one to stop showing the overlay.
 */
const createOverlay = (
  overlayParent: HTMLElement,
  overlayHtml: string,
  update: Function
) => {
  if (!overlayParent) {
    // Throw an error if the overlayParent element is not defined or initiated
    throw (
      'ElementIsNullError: The parent element you provided is null. This' +
      ' might happen if you try to create an overlay in a context where the' +
      ' DOM has not been initialized yet. Please use the CallFunctionPlugin' +
      ' to create the overlay, you can find an example in the docs of this' +
      ' package.'
    );
  }
  // Create a new div and set some style
  overlayDiv = document.createElement('div');
  overlayDiv.style.cssText = `
    display: none;
    position: absolute;
    width:100%;
    height:100%;
    z-index:100;
  `;
  overlayDiv.innerHTML = overlayHtml;
  // Append it to the parent
  overlayParent.appendChild(overlayDiv);
  // Store the consumer's function on module level scope
  updateFunctionUser = update;
  // Return two functions
  return {
    startShowingOverlay,
    stopShowingOverlay,
  };
};

module.exports = { createOverlay };
