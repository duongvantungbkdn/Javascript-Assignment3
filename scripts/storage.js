'use strict';

//==========create store================
function createStore(key) {
    if (typeof Storage !== 'undefined') {
        return {
            getData() {
                return JSON.parse(localStorage.getItem(key));
            },
            saveData(data) {
                localStorage.setItem(key, JSON.stringify(data));
            },
            deleteData() {
                localStorage.removeItem(key);
            },
        };
    } else {
        alert('Sorry, your browser does not support web storage...');
    }
}

const usersStore = createStore('USERS_ARRAY');
const userLoginStore = createStore('USER_LOGIN');
const todosListStore = createStore('TODO_LIST');
const settingStore = createStore('SETTING_PAGE');

let usersArr = usersStore.getData() ?? [];
let userLogin = userLoginStore.getData();
let todosArr = todosListStore.getData() ?? [];
let settingObj = settingStore.getData() ?? { pageSize: 5, category: '' };

//=========genaral element & variable===========
const newsContainElm = document.getElementById('news-container');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pageNumElm = document.getElementById('page-num');
const submitBtn = document.getElementById('btn-submit');

// const API_KEY = '4d065bd285aa41fca62f9da92400b5c1';
const API_KEY = '0c4179146840460fa2ba081c74548d22';

let pageNum = 1;
let totalArticles;
let url;

//===========genaral function===============
function parseUser(userData) {
    const user = new User(
        userData.firstName,
        userData.lastName,
        userData.username,
        userData.password
    );
    return user;
}

//=========render news content function==============
function renderNewContent(pageNum, pageSize, isSearch = false, search = '') {
    pageNumElm.textContent = `${pageNum}`;
    newsContainElm.innerHTML = ''; // xóa nội dung page cũ

    if (pageNum === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'block';
    } else if (totalArticles / pageSize <= pageNum) {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'none';
    } else if (pageNum === 1 && totalArticles / pageSize <= pageNum) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }

    settingObj = settingStore.getData() ?? { pageSize: 5, category: '' };

    url =
        urlIsSearch(isSearch, search) +
        `pageSize=${settingObj.pageSize}&` +
        `page=${pageNum}&` +
        `apiKey=${API_KEY}`;
    console.log(url);
    const req = new Request(url);
    const userCurr = parseUser(userLogin);
    getData(userCurr, req);

    function urlIsSearch(isSearch, search) {
        let stringPartUrl;
        if (isSearch) {
            stringPartUrl = `https://newsapi.org/v2/everything?q=${search}&`;
        } else {
            stringPartUrl = `https://newsapi.org/v2/top-headlines?category=${settingObj.category}&`;
        }
        return stringPartUrl;
    }
}

//============get data from api ===============
async function getData(user, url) {
    const data = await user.getNews(url);
    const articlesData = await data.json();
    const articlesArr = articlesData.articles;
    totalArticles = articlesData.totalResults;

    //==========render nội dung page===========
    articlesArr.map(article => renderArticle(article));
}

//==============render one article============================
function renderArticle(article) {
    const date = new Date(article.publishedAt && article.publishedAt);
    const htmlString = `<article id="article">
        <div class="column-5">
            <a
                href="${article.url && article.url}"
                target="_blank"
            >
                <img
                    id="img-arcticle"
                    src="${article.urlToImage && article.urlToImage}"
                    alt="img"
                />
            </a>
        </div>
        <div class="column-7">
            <h4 id="title-arcticle">
                <a
                    href="${article.url && article.url}"
                    target="_blank"
                >
                ${article.title && article.title}
                </a>
            </h4>
            <p id="description-arcticle">
                ${article.description && article.description}
            </p>
            <p id="author-date-publish">
                <strong>${article.author && article.author}</strong>
                ${date && date.getDate()}/${date && date.getMonth() + 1}/${
        date && date.getFullYear()
    }
            </p>
            <a
                href="${article.url && article.url}"
                target="_blank"
            >
                <button id="btn-view" class="btn btn-primary">
                    View
                </button>
            </a>
        </div>
    </article>`;
    newsContainElm.insertAdjacentHTML('beforeend', htmlString);
}
