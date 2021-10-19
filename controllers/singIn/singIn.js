const singupName = document.getElementById('singup-name');
const singupPass = document.getElementById('singup-pass');
const singupBtn = document.getElementById('btn-singup');

const loginName = document.getElementById('login-name');
const loginPass = document.getElementById('login-pass');
const loginBtn = document.getElementById('btn-login');

const checkUserNameForLettersAndNumbers = function (inpValue) {
    const regex = /([A-Za-z]+[0-9]+|[0-9]+[A-Za-z]+)/gm;
    return Boolean(!inpValue.match(regex));
}

const isValidInput = function (username, password) {
    if (username.value.length < 4) {
        alert('The username must be longer than 4 characters.');
        return false;
    } else if (password.value.length < 6) {
        alert('The password must be longer than 6 characters.');
        return false;
    } else if (checkUserNameForLettersAndNumbers(username.value)) {
        alert('The username must contain letters and numbers.');
        return false;
    } else {
        return true;
    }
}

const redirectToMainPage = function (btn) {
    btn.setAttribute('href', 'index.html');
}

const SingUpUser = function () {
    const storedName = localStorage.getItem('Username');

    if (isValidInput(singupName, singupPass)) {
        if (singupName.value === storedName) {
            alert('Your account has been created.');
        } else {
            localStorage.setItem('Username', singupName.value);
            localStorage.setItem('Password', singupPass.value);
            alert('Successful registration.');
            redirectToMainPage(singupBtn);
        }
    }
}

const LogInUser = function () {
    if (isValidInput(loginName, loginPass)) {
        const storedName = localStorage.getItem('Username');
        const storedPass = localStorage.getItem('Password');

        if (loginName.value == storedName && loginPass.value == storedPass) {
            redirectToMainPage(loginBtn);
        } else {
            alert('Create an account.');
        }
    }
}

singupBtn.addEventListener('click', SingUpUser);
loginBtn.addEventListener('click', LogInUser);
