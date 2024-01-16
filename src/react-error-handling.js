import { getBrowserInfo, getOperatingSystem } from "./utils";
// import domtoimage from "dom-to-image";

class ReactBugReporter {
  constructor(apiEndpoint, globalObject, props = {}) {
    this.apiEndpoint = apiEndpoint;
    this.window = globalObject;
  }

  // async captureScreenshot() {
  //   try {
  //     console.log("this.window.document.body", this.window.document.body);

  //     const element = this.window.document.getElementById("root");

  //     // Create a canvas element
  //     const canvas = this.window.document.createElement("canvas");
  //     canvas.width = element.offsetWidth;
  //     canvas.height = element.offsetHeight;

  //     // Get the canvas rendering context
  //     const context = canvas.getContext("2d");

  //     // Draw the HTML element onto the canvas
  //     context.drawWindow(
  //       window,
  //       0,
  //       0,
  //       element.offsetWidth,
  //       element.offsetHeight,
  //       "rgb(255,255,255)"
  //     );

  //     // Convert the canvas to a data URL
  //     const dataUrl = canvas.toDataURL("image/png");
  //     console.log("dataUrl", dataUrl);
  //     return dataUrl;
  //   } catch (error) {
  //     console.error("Error capturing screenshot:", error);
  //     return null;
  //   }
  // }

  async reportUIBug(errorData) {
    try {
      // Check for screenshot
      // const screenshotUrl = await this.captureScreenshot();
      // if (errorData.screenshot) {
      //   errorData.screenshot = screenshotUrl; // Attach the URL to errorData

      //   // Send the error data, including the screenshot URL, to the server
      //   const response = await fetch(this.apiEndpoint, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ error: errorData }),
      //   });

      //   const data = await response.json();
      //   console.log("UI bug report sent:", data);
      // } else {
      // Send error data without screenshot
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: errorData }),
      });

      const data = await response.json();
      console.log("UI bug report sent:", data);
      // }
    } catch (error) {
      console.error("Error sending UI bug report:", error);
    }
  }

  initErrorHandling() {
    const handleUIError = async (errorEvent) => {
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

    // Return a function to clean up the event listener on component unmount
    return () => {
      this.window.removeEventListener("error", handleUIError);
    };
  }
}

export default ReactBugReporter;
