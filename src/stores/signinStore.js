import { get } from "lodash";
import { getUserById, signin, updateUser } from "../api/userApi";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getToken, setToken, setUserId } from "../utils/localStorage";

export const useSigninStore = defineStore('signin', {
    state: () => ({
        signinForm: ref({
            login: '',
            password: ''
        }),
        errors: [],
        validationErrors: [],
        modalToggle: ref(false),
        isPassword: ref(true),
        isAgree: ref(true),
        user: {
            id: '',
            login: '',
            email: '',
            telegramChat: '',
            clicks: '',
            expire: '',
            autoru: '',
            phone: '',
            sendMethod: '',
            lname: '',
            fname: '',
            timezone: '',
            timezonestring: '',
            notifytype: '',
            notifytypestring: '',
            companyid: '',
            companyname: '',
            calltype: '',
            enableaudio: '',
            locklentaupdate: '',
            erased: '',
            os: '',
            sipid: '',
            updatePeriod: '',
            filterMaxCount: '',
            turbosip: '',
            turbosip5accessto: '',
            turbosip20accessto: '',
            colorlenta: '',
            ignoreavg: '',
            redirecttarget: '',
            lentacolortype: ''
        },
        token: getToken()

    }),
    getters: {
        isAuthenticated() {
            return !!this.token;
        },
        isLoginError() {
            return this.validationErrors.filter(value => value.owner == 'login');
        },
        isPasswordError() {
            return this.validationErrors.filter(value => value.owner == 'password');
        }
    },
    actions: {
        signin({
            login,
            password
        }) {
            const loginTitle = 'Логин обязателено!';
            const loginOwner = 'login';
            if(!login) {
                const isFound = this.validationErrors.find(value => value.title == loginTitle);
                if(!isFound) {
                    this.validationErrors.push({ owner: loginOwner, title: loginTitle})
                }
                return Promise.reject(loginTitle);
            }else {
                this.validationErrors = this.validationErrors.filter(
                    value =>  value.owner != loginOwner && value.title != loginTitle
                );
            }


            const passwordTitle = 'Пароль обязателен!';
            const passwordOwner = 'password';
            if(!password) {
                const isFound = this.validationErrors.find(value => value.title == passwordTitle);
                if(!isFound) {
                    this.validationErrors.push({owner: passwordOwner, title: passwordTitle})
                }
                return Promise.reject('Логин обязателено!');
            }else {
                this.validationErrors = this.validationErrors.filter(
                    value =>  value.owner != passwordOwner && value.title != passwordTitle
                );
            }

            return new Promise((resolve, reject) => {
                signin({ login, password })
                    .then((response) => {
                        setToken(get(response.data, 'token', ''))
                        setUserId(get(response.data, 'user.id'));
                        
                        this.token = get(response.data, 'token', '');
                        this.user = get(response.data, 'user', {});
                        
                        this.modalToggle = false;

                        resolve(true)
                    }).catch(error => {
                        this.errors = get(error, 'response.data.errors', []);
                        reject(error)
                    });
            })
        },
        getUser({ userId }) {
            return new Promise((resolve, reject) => {
                getUserById({ userId })
                    .then(response => {
                        this.user = response.data;
                        resolve(true)
                    }).catch(error => {
                        reject(error);
                    })
            })
        },
        updateUser({
            id,
            login,
            email,
            telegramChat,
            clicks,
            expire,
            autoru,
            phone,
            sendMethod,
            lname,
            fname,
            timezone,
            timezonestring,
            notifytype,
            notifytypestring,
            companyid,
            companyname,
            calltype,
            enableaudio,
            locklentaupdate,
            erased,
            os,
            sipid,
            updatePeriod,
            filterMaxCount,
            turbosip,
            turbosip5accessto,
            turbosip20accessto,
            colorlenta,
            ignoreavg,
            redirecttarget,
            lentacolortype
        }) {
            return new Promise((resolve, reject) => {
                updateUser({
                    id,
                    login,
                    email,
                    telegramChat,
                    clicks,
                    expire,
                    autoru,
                    phone,
                    sendMethod,
                    lname,
                    fname,
                    timezone,
                    timezonestring,
                    notifytype,
                    notifytypestring,
                    companyid,
                    companyname,
                    calltype,
                    enableaudio,
                    locklentaupdate,
                    erased,
                    os,
                    sipid,
                    updatePeriod,
                    filterMaxCount,
                    turbosip,
                    turbosip5accessto,
                    turbosip20accessto,
                    colorlenta,
                    ignoreavg,
                    redirecttarget,
                    lentacolortype
                })
                    .then(response => {
                        resolve(true);
                    }).catch(error => {
                        reject(error)
                    })
            })
        }
    }
})