import { defineStore } from "pinia";
import { ref } from "vue";
import { register, restore } from "../api/userApi";
import { get } from 'lodash';
export const useRegisterStore = defineStore('register', {
    state: () => ({
        registerForm: ref({
            login: ''
        }),
        errors: [],
        validationErrors: [],
        modalToggle: ref(false),
        isAgree: ref(true),
        continue: ref(false),
        isDataSent: ref(false)
    }),
    actions: {
        register({ login }) {
            return new Promise((resolve, reject) => {
                register({ login })
                    .then(() => {
                        resolve(true);
                    }).catch( error => {
                        this.errors = get(error, 'response.data.errors', []);
                        reject(error);
                    });
            })
        },
        restore({ login }) {
            return new Promise((resolve, reject) => {
                restore({ login })
                    .then(() => {
                        resolve(true);
                    }).catch(error => {
                        reject(error);
                    });
            })
        }
    }
})