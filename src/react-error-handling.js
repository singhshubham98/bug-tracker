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
      let errorData;

      // Check if the event is an ErrorEvent or a PromiseRejectionEvent
      if (errorEvent instanceof PromiseRejectionEvent) {
        errorData = {
          errorMessage: errorEvent.reason?.message || "Unknown error",
          stackTrace: errorEvent.reason?.stack || "No stack trace",
          userAgent: navigator.userAgent,
          browser: getBrowserInfo(),
          operatingSystem: getOperatingSystem(),
        };
      } else {
        errorData = {
          errorMessage: errorEvent.message,
          stackTrace: errorEvent.error?.stack || "No stack trace",
          file: errorEvent.filename,
          lineNumber: errorEvent.lineno,
          userAgent: navigator.userAgent,
          browser: getBrowserInfo(),
          operatingSystem: getOperatingSystem(),
        };
      }

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
