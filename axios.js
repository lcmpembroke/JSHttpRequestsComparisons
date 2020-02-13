// Option 3 to send Http Requests with vanilla Javascript
// Axios package  - 3rd party library
// axios analyses any data appended - converts it correctly and adds the correct headers

// Axios is very popular as promise based API, convenience methods provided and simple error handling
// errors are automatically thrown if the response has a response error status code....ie not just rechnical error
// but any data errors too - this is very different from XMLHttpRequest and fetch()...

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const getData = () => {
    axios.get('https://reqres.in/api/users').then(response => {
        console.log(response);
    });

};

const sendData = () => {

    axios.post('https://reqres.in/api/register', {
        email: "eve.holt@reqres.in",
        //password: "pistol"
    }).then(response => {
        console.log(response);
    })
    .catch (error => {
        console.log(error.response.data);
    });
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
