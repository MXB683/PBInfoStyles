// Array of URL patterns to intercept
const interceptURLs = [
  // "ajx-solutie-detalii-evaluare.php",
  "ajx-solutii-lista-json.php",
];

// Function to handle intercepted data
function handleInterceptedData(data, url) {
  console.log("Intercepted url:", url);
  console.log("\\-> Data:", data);

  // Dispatch custom event to content script
  window.dispatchEvent(
    new CustomEvent("solutionData", { detail: { url, data } })
  );
}

// Check if URL should be intercepted
function shouldIntercept(url) {
  return interceptURLs.some((pattern) => url.includes(pattern));
}

// Intercept fetch requests
const originalFetch = window.fetch;
window.fetch = async function (...args) {
  const response = await originalFetch.apply(this, args);

  const url = typeof args[0] === "string" ? args[0] : args[0].url;

  if (shouldIntercept(url)) {
    const clonedResponse = response.clone();
    const data = await clonedResponse.json();
    handleInterceptedData(data, url);
  }

  return response;
};

// Intercept XMLHttpRequest
const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function (method, url, ...rest) {
  this._url = url;
  return originalOpen.call(this, method, url, ...rest);
};

XMLHttpRequest.prototype.send = function (...args) {
  this.addEventListener("load", function () {
    if (this._url && shouldIntercept(this._url)) {
      try {
        const data = JSON.parse(this.responseText);
        handleInterceptedData(data, this._url);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
    }
  });

  return originalSend.apply(this, args);
};
