import NativeBugReporter from "./src/rn-error-handling";
import ReactBugReporter from "./src/react-error-handling";

function BugReporter(apiEndpoint, globalObject, props = {}) {
  // Instantiate the appropriate BugReporter class based on platform or use a general error reporter
  const bugReporterInstance =
    props.platform === "react"
      ? new ReactBugReporter(apiEndpoint, globalObject, props)
      : new NativeBugReporter(apiEndpoint, globalObject, props);

  // Define methods that delegate to the platform-specific instance
  function setupErrorListener() {
    return bugReporterInstance.initErrorHandling();
  }

  return {
    setupErrorListener,
  };
}

export default BugReporter;
