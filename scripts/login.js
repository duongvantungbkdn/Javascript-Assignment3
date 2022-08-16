'use strict';

userLogin = userLoginStore.getData(); // check user login
if (userLogin) {
    window.location.href = '../index.html'; //redirect to index.html
} else {
    const inUsername = document.getElementById('input-username');
    const inPassword = document.getElementById('input-password');

    //========listening submit event===============
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const inputData = {
            username: inUsername.value.trim(),
            password: inPassword.value,
        };

        //==============validate login============
        if (checkLogin(inputData.username, inputData.password)) {
            userLogin = usersArr.find(
                user =>
                    user.username === inputData.username &&
                    user.password === inputData.password
            );
            if (userLogin) {
                userLoginStore.saveData(userLogin);

                //=======delete input elm value======
                inUsername.value = '';
                inPassword.value = '';

                window.location.href = '../index.html'; //redirect to index.html
            } else {
                alert('Username or password not correct!');
            }
        }
    });
}

//====================validate================
function checkLogin(username, password) {
    let check = true;
    if (username === '') {
        alert('Please input username!');
        check = false;
    } else if (password === '') {
        alert('Please input password!');
        check = false;
    }
    return check;
}
