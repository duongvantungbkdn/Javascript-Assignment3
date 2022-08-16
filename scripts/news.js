'use strict';

userLogin = userLoginStore.getData(); // check user login
if (userLogin) {
    renderNewContent(pageNum, settingObj.pageSize); // render news container's content

    //============listening prev click event=====
    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        pageNum -= 1;

        // re-render news container's content
        renderNewContent(pageNum, settingObj.pageSize);
    });

    //============listening next click event=====
    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        pageNum += 1;

        // re-render news container's content
        renderNewContent(pageNum, settingObj.pageSize);
    });
} else {
    newsContainElm.innerHTML = `<div id="message-login">
        You need <a href="../index.html" class="btn btn-primary">Login</a> to see
        articles
    </div>`;
}
