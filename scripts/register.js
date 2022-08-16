'use strict';

const inFirstName = document.getElementById('input-firstname');
const inLastName = document.getElementById('input-lastname');
const inUserName = document.getElementById('input-username');
const inPassword = document.getElementById('input-password');
const inPasswordCf = document.getElementById('input-password-confirm');

// ============listening submit event======================
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const dataIn = {
        firstName: inFirstName.value.trim(),
        lastName: inLastName.value.trim(),
        username: inUserName.value.trim(),
        password: inPassword.value.trim(),
        passwordCf: inPasswordCf.value.trim(),
    };
    if (
        checkFistName(dataIn.firstName) &&
        checkLastName(dataIn.lastName) &&
        checkUsername(dataIn.username) &&
        checkPassword(dataIn.password, dataIn.passwordCf)
    ) {
        //---------create new instance User--------
        const dataUser = new User(
            dataIn.firstName,
            dataIn.lastName,
            dataIn.username,
            dataIn.password
        );
        usersArr = usersStore.getData() ?? []; // get user data from store
        usersArr.push(dataUser); //add new user to user data
        usersStore.saveData(usersArr); // save user data to store

        //--------clear input-----------
        inFirstName.value = '';
        inLastName.value = '';
        inUserName.value = '';
        inPassword.value = '';
        inPasswordCf.value = '';

        window.location.href = 'login.html'; //redirect to login.html
    }
});

// ==============validation funtion=================
const checkFistName = firstName => {
    let check = true;
    if (!firstName) {
        alert('Please input firstName!');
        check = false;
    }
    return check;
};

const checkLastName = lastName => {
    let check = true;
    if (!lastName) {
        alert('Please input lastName!');
        check = false;
    }
    return check;
};

function checkUsername(username) {
    let check = true;
    if (username === '') {
        alert('Please input username!');
        check = false;
    } else {
        for (let i = 0; i < usersArr.length; i++) {
            if (usersArr[i].username === username) {
                alert('username must unique!');
                check = false;
                break;
            }
        }
    }
    return check;
}

function checkPassword(password, passwordCf) {
    let check = true;
    if (password === '') {
        alert('Please input password!');
        check = false;
    } else if (password.length <= 8) {
        alert(`minimum password is 8 characters`);
        check = false;
    } else {
        if (password !== passwordCf) {
            alert('Confirm password is not correct');
            check = false;
        }
    }
    return check;
}
