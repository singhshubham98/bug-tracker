import { getBrowserInfo, getOperatingSystem } from "./utils";

class ReactBugReporter {
  constructor(apiEndpoint, globalObject, props) {
    this.apiEndpoint = apiEndpoint;
    this.window = globalObject;
    this.props = props;
  }

  async reportUIBug(errorData) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: errorData }),
      });

      const data = await response.json();
      console.log("UI bug report sent:", data);
    } catch (error) {
      console.error("Error sending UI bug report:", error);
    }
  }

  initErrorHandling() {
    const handleUIError = async (errorEvent) => {
      let errorData;

      // Check if the event is an ErrorEvent or a PromiseRejectionEvent
      if (errorEvent instanceof PromiseRejectionEvent) {
        errorData = {
          errorMessage:
            errorEvent.reason && errorEvent.reason.message
              ? errorEvent.reason.message
              : "Unknown error",
          stackTrace:
            errorEvent.reason && errorEvent.reason.stack
              ? errorEvent.reason.stack
              : "No stack trace",
          userAgent: navigator.userAgent,
          browser: getBrowserInfo(),
          operatingSystem: getOperatingSystem(),
          environment: this.props.env,
        };
      } else {
        errorData = {
          errorMessage: errorEvent.message,
          stackTrace:
            errorEvent.error && errorEvent.error.stack
              ? errorEvent.error.stack
              : "No stack trace",
          file: errorEvent.filename,
          lineNumber: errorEvent.lineno,
          userAgent: navigator.userAgent,
          browser: getBrowserInfo(),
          operatingSystem: getOperatingSystem(),
          environment: this.props.env,
        };
      }
      if (this.props.env !== "DEVELOPMENT") {
        this.reportUIBug(errorData);
      }
    };

    // Attach the error event listener
    this.window.addEventListener("error", handleUIError);
    this.window.addEventListener("unhandledrejection", handleUIError);

    // Return a function to clean up the event listener on component unmount
    return () => {
      this.window.removeEventListener("error", handleUIError);
      this.window.removeEventListener("unhandledrejection", handleUIError);
    };
  }
}

export default ReactBugReporter;
