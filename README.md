# jspsych-overlay

A small library that helps you create arbitrary overlays during jsPsych trials
or even whole experiments.

## How to use

Install the library, e.g. with Yarn:

```shell
$ yarn add @kogpsy/jspsych-overlay
```

Import the `createOverlay()` function in your experiment project:

```javascript
import { createOverlay } from '@kogpsy/jspsych-overlay';
```

Define a function that gets run in each update cycle by the library interally.
You can - obviously - do whatever you want in that function, you don't even have
to define one if your overlay will be static.

The function is passed two properties, the time elapsed since the overlay is
displayed in milliseconds, and a function which allows you to change the content
of the overlay.

```javascript
const updateOverlay = (millisElapsed, setHtml) => {
  const html = `<div class='overlay'>${millisElapsed}</div>`;
  setHtml(html);
};
```

To create the overlay and have it added to the DOM, call the `createOverlay()`
function. Since this function accesses the DOM, it must be fully loaded when the
function is called. To ensure this, you can call it from within a
[CallFunctionPlugin][1] trial.

`createOverlay()` takes three arguments: the HTML element which the overlay
should be added to (usually the body element), the inner HTML of the overlay and
finally the function which gets called on each update cycle (the one we have
defined above).

```javascript
let overlay;

timeline.push({
  type: CallFunctionPlugin,
  func: () => {
    overlay = createOverlay(
      document.body,
      '<div class='overlay'>0</div>',
      updateOverlay
    );
  }
})
```

Et voilà - the overlay is created and added to the DOM, however, it is not yet
visible. You might have noticed that we stored the return value of
`createOverlay()` in a variable called `overlay`. This variable now contains an
object with two fields: a function called `startShowingOverlay()` and a function
called `stopShowingOverlay()`. With these you get fine-grained control over when
the overlay should be displayed.

The overlay we now created simply displayes the elapsed time in milliseconds
since we started showing the overlay. You can apply styles in your CSS would do
normally.

## Development

First, to be able to start development, install required dependencies:

```
$ yarn install
```

Then, to build a bundled version of your code, execute (your bundle will be
created in the `build` directory):

```
$ yarn run build
```

### Publish changes to npm

First, make sure you have built the project with the most recent changes. Then
run `yarn publish` to upload the package to the NPM registry. It will ask you
to bump the version number. [**Remember semantic versioning**][2].

[1]: https://www.jspsych.org/7.0/plugins/call-function/
[2]: https://docs.npmjs.com/about-semantic-versioning
