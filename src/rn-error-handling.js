class NativeBugReporter {
  constructor(apiEndpoint, globalObject) {
    this.apiEndpoint = apiEndpoint;
    this.ErrorUtils = globalObject;
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
    console.log("this.ErrorUtils", this.ErrorUtils);
    const handleUIError = async (errorEvent) => {
      // Report the UI-related error to the server using the BugReporter
      const errorData = {
        errorMessage: errorEvent.message,
        stackTrace: errorEvent.stack,
      };

      this.reportUIBug(errorData);
    };

    // Attach the error event listener using ErrorUtils
    this.ErrorUtils.setGlobalHandler(handleUIError);

    // Return a function to clean up the event listener on component unmount
    return () => {
      this.ErrorUtils.setGlobalHandler(null);
    };
  }
}

export default NativeBugReporter;
