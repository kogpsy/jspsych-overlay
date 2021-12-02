import { createOverlay } from './lib';

test('uses createOverlay() to add an overlay to an HTML element', () => {
  // Define an HTML string that should be displayed as an overlay
  const html: string = '<p>I am an overlay</p>';
  // Create the overlay on document.body (which does not contain anything yet,
  // jest uses jsdom to emulate the DOM)
  createOverlay(document.body, html, null);

  // Test if the overlay was in fact added to the dom
  expect(document.body.innerHTML).toEqual(
    '<div style="display: none; position: absolute; width: 100%; height: 100%; z-index: 100;">' +
      html +
      '</div>'
  );
});
