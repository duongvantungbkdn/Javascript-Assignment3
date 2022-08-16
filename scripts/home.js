'use strict';

const logoutBtn = document.getElementById('btn-logout');
const loginModal = document.getElementById('login-modal');
const welcomeMessage = document.getElementById('welcome-message');

userLogin = userLoginStore.getData(); // check user login
if (userLogin) {
    loginModal.style.display = 'none';
    welcomeMessage.textContent = `Welcome ${userLogin.firstName}`;

    // =====listening logout event===========
    logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        userLoginStore.deleteData();

        //=======redirect to login.html==========
        window.location.href = './pages/login.html';
    });
}
