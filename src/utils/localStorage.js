const TOKEN = 'token';
const USERID = 'user_id';

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function setToken(token) {
    localStorage.setItem(TOKEN, token) || '';
}

export function removeToken() {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem(TOKEN);
            resolve(true)
        } catch (error) {
            reject(error);
        }
    });
}

export function getUserId() {
    return localStorage.getItem(USERID);
}

export function setUserId(id) {
    localStorage.setItem(USERID, id);
}