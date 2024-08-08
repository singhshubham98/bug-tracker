import { getBrowserInfo, getOperatingSystem } from "./utils";

class ReactBugReporter {
  constructor(apiEndpoint, globalObject) {
    this.apiEndpoint = apiEndpoint;
    this.window = globalObject;
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
      console.log("errorEvent", errorEvent);
      // Report the UI-related error to the server using the BugReporter
      const errorData = {
        errorMessage: errorEvent.error.message,
        stackTrace: errorEvent.error.stack,
        file: errorEvent.filename,
        lineNumber: errorEvent.lineno,
        userAgent: navigator.userAgent,
        browser: getBrowserInfo(),
        operatingSystem: getOperatingSystem(),
      };

      this.reportUIBug(errorData);
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
