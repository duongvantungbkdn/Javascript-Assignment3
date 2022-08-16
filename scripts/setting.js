'use strict';

const inCategogyElm = document.getElementById('input-category');
const inPagesizeElm = document.getElementById('input-page-size');

//========add event listener==============
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userLogin = userLoginStore.getData(); // check user login
    if (userLogin) {
        const pageSize = +inPagesizeElm.value.trim();
        //if pageSize do not input value or invalid value, pageSize is set default
        if (pageSize <= 0) {
            settingObj.category = inCategogyElm.value;
        } else {
            settingObj.category = inCategogyElm.value;
            settingObj.pageSize = pageSize;
        }

        //-----save data to setting store---------
        settingStore.saveData(settingObj);
        inPagesizeElm.value = '';
    } else {
        alert('You need Login');
    }
});
