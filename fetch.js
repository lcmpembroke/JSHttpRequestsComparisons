// Option 2 - rebuilding with the fetch() API what was built using XMLHttpRequest 
// in a utility function which was "promisified" in option 1 - see xhr.js file
// not as nice error handling as got to throw error from within promise chain...

// fetch API relatively modern addition to browser - older browsers and IE don't support
// so if you don't want to use a polyfill...then will need to use XMLHttpRequest
// polyfill = code to fill the whole for something the browser doesn't do natively that you expect it to do

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {

    // globally available function made available by the browser in Javascript
    return fetch(url, {
        method: method,
        data: JSON.stringify(data),
        headers: data ? { 'Content-type': 'application/json' } : {},
    })
    .then(response => {
        if (response.status >= 400) {
            // return a promise that will throw an error
            return response.json().then(errorResponseData => {
                const error = new Error('There was a problem');
                error.data = errorResponseData;
                throw error;   
            });
        } 
        // convert streamed body into a snap shot of the data...it returns a promise...so return that to the outer then...
        return response.json(); 
    });
};

const getData = () => {
    sendHttpRequest('GET','https://reqres.in/api/users')
    .then(reponseData => {
        console.log(reponseData);
    });
};

const sendData = () => {

    const JavaScriptPostData = 
    {
        email: "eve.holt@reqres.in",
        password: "pistol"
    };

    const JavaScriptPostData2 = 
    {
        name: "morpheusss",
        job: "leader",
    };

    const JavaScriptPostData3 = 
    {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
    };

    const JavaScriptPostData4 = 
    {
        email: "sydney@fife"
        //email: "eve.holt@reqres.in",
        //password: "pistol"
    };

    //sendHttpRequest('POST','https://reqres.in/api/register', JavaScriptPostData)
    sendHttpRequest('POST','https://reqres.in/api/users', JavaScriptPostData2)
    //sendHttpRequest('POST','https://reqres.in/api/login', JavaScriptPostData3)
    //sendHttpRequest('POST','https://reqres.in/api/register', JavaScriptPostData4)    
    .then(responseData => {
        console.log(responseData);
    })
    .catch(error => {
        console.log(error, error.data);
    });

};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
