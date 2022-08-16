'use strict';

const inQueryElm = document.getElementById('input-query');

//============add submit event=============
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userLogin = userLoginStore.getData(); // check user login
    if (userLogin) {
        const inputSearch = inQueryElm.value.trim();
        if (inputSearch === '') {
            alert('Please, enter everything you want to search.');
        } else {
            //-- re-render news container's content-------------
            renderNewContent(pageNum, settingObj.pageSize, true, inputSearch);

            //------------listening prev click event--------------
            prevBtn.addEventListener('click', function (e) {
                e.preventDefault();
                pageNum -= 1;

                //-- re-render news container's content-------------
                renderNewContent(
                    pageNum,
                    settingObj.pageSize,
                    true,
                    inputSearch
                );
            });

            //------------listening prev click event--------------
            nextBtn.addEventListener('click', function (e) {
                e.preventDefault();
                pageNum += 1;

                //-- re-render news container's content-------------
                renderNewContent(
                    pageNum,
                    settingObj.pageSize,
                    true,
                    inputSearch
                );
            });
        }
    } else {
        alert('You must Login to search articles.');
    }
});
