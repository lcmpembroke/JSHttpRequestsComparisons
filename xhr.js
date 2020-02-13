// option 1 to send Http Requests with vanilla Javascript
// XMLHttpRequest Object - built into JavaScript
// we have to wrap it in our own promise - next option will be to use API that has promises with it out of the box - see fetch() API option
// note that XMLHttpRequests is NOT restricted to fetching XML only - it's historical reasons for name
// typically JSON is used nowadays

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');


const sendHttpRequest = (method, url, JavaScriptData) => {

  // promise constructor takes a function, which itself takes a resolve and a reject argument which are
  // functions we can call from inside that function here to mark the promise as resolved or rejected
  const promise = new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    if (JavaScriptData) {
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    }
    
    // to use response, need to set up a listener to onload event by assigning a function to the onload property
    // NB: not all browsers support   xhr.addEventListener('onload'...)
    // onload will trigger when we get a response. The response is JSON data...which is a string holding machine readable data
  
    // because responseType has been set to json, then no need to use JSON.parse() around xhr.response
    xhr.onload = () => {
        // mark the promise as resolved, and pass data along with the resolve event, so can be used in the then method on our promise


      if (xhr.status >= 400) {
        // still forward the response body as we have this and contains useful info ergarding data error
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      // on getting an error, reject the promise - note that this is only if there is a technical error where requests fails - not a data error...
      // there is no response body to forward on here
      reject('There was an error in SendHttpRequest');
    };

    xhr.send(JSON.stringify(JavaScriptData));
  });

  return promise;
};

const getData = () => {
  sendHttpRequest('GET', 'https://reqres.in/api/users').then(responseData => {
    console.log(responseData);
  });
;}

const sendData = () => {

  const JavaScriptData = 
  {
    email: "eve.holt@reqres.in", // successful
    // email: "eve.hollllt@reqres.in", // rejected...
    password: "dogcat"
  };

  sendHttpRequest('POST', 'https://reqres.in/api/register', JavaScriptData)
  .then(responseData => {
    console.log(responseData);
  })
  .catch(err => {
    console.log(err);
  });
  
;}

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
