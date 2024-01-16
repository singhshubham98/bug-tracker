A comprehensive bug tracking tool tailored for React, ensuring that no UI bug goes unnoticed!

## Development

- Install Dependency

```sh
npm i ui-bug-tracker
```

## Example Setup

### React

```javascript
import BugReporter from "ui-bug-tracker";

// pass server endpoint where you need to store the bug report
const report = new BugReporter("https://your-api-endpoint.com/report");

// Set up the error listener when the script loads
const cleanupErrorListener = bugReporter.setupErrorListener();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Clean up the error listener when the component unmounts
if (cleanupErrorListener) {
  window.addEventListener("beforeunload", cleanupErrorListener);
}
```

### React Native

```javascript
import BugReporter from "ui-bug-tracker";

// pass server endpoint where you need to store the bug report
const bugReporter = new BugReporter(
  "https://your-api-endpoint.com/report",
  ErrorUtils
);

// Set up the error listener when the script loads
bugReporter.setupErrorListener();

AppRegistry.registerComponent(appName, () => App);
```
