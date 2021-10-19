const username = document.getElementById('username');

const name = localStorage.getItem('Username');

const usernameText = document.createTextNode(`Hello, ${name}!`);

username.appendChild(usernameText);
