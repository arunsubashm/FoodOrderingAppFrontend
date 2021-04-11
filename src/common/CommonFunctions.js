
 // Function to check whether a value if undefined or null
 
 export const isNullorUndefined = val => {
    return  val === null || val === undefined;
  };
  
// Function to check if a value if undefined or null or empty
  
  export const isNullUndefinedOrEmpty = val => {
    return val === null || val === undefined || val === "";
  };
  
   // Function to check if a value if empty
  export const isEmpty = val => {
    return !isNullorUndefined(val) && val === "";
  };
  

   // Function to check if the value of the object is undefined or null or empty

  export const isObjectUndefinedOrNullOrEmpty = obj => {
    let isInvalid = false;
    for (let key in obj) {
      if (isNullorUndefined(obj[key])) {
        isInvalid = true;
      }
    }
    return isInvalid;
  };
  
  export const assignEmptyStringToAllKeysInObj = obj => {
    if (!isNullorUndefined(obj)) {
      for (let key in obj) {
        obj[key] = "";
      }
    }
  };
  
  
   // Function to build URL parameters and append them to the given URL

  export const buildUrlWithParameters = (requestUrl, urlParametersObj) => {
    if (!isNullorUndefined(urlParametersObj)) {
      let parametersString = "";
      for (let key in urlParametersObj) {
        if (parametersString !== "") {
          parametersString += "&";
        }
        parametersString += key + "=" + encodeURIComponent(urlParametersObj[key]);
      }
      requestUrl += "?" + parametersString;
    }
    return requestUrl;
  };
  
  /**
   * Function to make an API call
   * @param requestUrl URL to which the API request is to be made
   * @param urlParametersObj object containing key-value pairs of the parameters to be sent along with the URL
   * @param requestDataBodyObj object containing the request data to be sent along with the body
   * @param apiCallRequestType enum for the type of the request to be made
   * @param requestHeadersObj object containing key-value pairs of the headers to be sent in the request
   * @param successCallback callback function to be executed when the API call is successful
   * @param failCallback callback function to be executed when the API call fails
   */
  export const makeApiCall = (
    requestUrl,
    urlParametersObj,
    requestDataBodyObj,
    apiCallRequestType,
    requestHeadersObj,
    successCallback,
    failCallback
  ) => {
    let xhr = new XMLHttpRequest();
    xhr.open(
      apiCallRequestType,
      buildUrlWithParameters(requestUrl, urlParametersObj)
    );
    if (!isNullorUndefined(requestHeadersObj)) {
      for (let key in requestHeadersObj) {      
        if (!isNullUndefinedOrEmpty(requestHeadersObj[key])) {
          xhr.setRequestHeader(key, requestHeadersObj[key]);
        }
      }
    }
    isNullorUndefined(requestDataBodyObj)
      ? xhr.send()
      : xhr.send(JSON.stringify(requestDataBodyObj));
    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (xhr.status === 200) {
          if (!isNullorUndefined(successCallback)) {
            successCallback(this.responseText, this.getAllResponseHeaders());
          }
        } else {
          if (!isNullorUndefined(failCallback)) {
            failCallback(this.responseText);
          }
        }
      }
    });
  };

  /* enums */

// enum for type of the api request to be made
export const RequestTypeEnum = Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
  });
  
  
  