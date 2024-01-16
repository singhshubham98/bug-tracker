// import ViewShot from 'react-native-view-shot';

class NativeBugReporter {
  constructor(apiEndpoint, globalObject, props = {}) {
    this.apiEndpoint = apiEndpoint;
    this.ErrorUtils = globalObject;
  }

  // captureScreenshot = async () => {
  //   try {
  //     const uri = await this.refs.viewShot.capture();
  //     console.log('Screenshot URI:', uri);
  //     return uri;
  //   } catch (error) {
  //     console.error('Error capturing screenshot:', error);
  //     return null;
  //   }
  // };

  async reportUIBug(errorData) {
    try {
      // Check for screenshot
      // const screenshotUrl = await this.captureScreenshot();
      // if (screenshotUrl) {
      //   errorData.screenshot = screenshotUrl; // Attach the URL to errorData
      // }

      // Send the error data, including the screenshot URL, to the server
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
