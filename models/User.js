'use strict';

class User {
    // #password;
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

    async getNews(reqUrl) {
        try {
            const data = await fetch(reqUrl);
            // console.log(data);
            if (!data.ok) {
                throw new Error(
                    `Something wrong, code error ${data.status}, re-check url ${reqUrl}`
                );
            }

            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

class Task {
    constructor(task, owner, isDone) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }
}
