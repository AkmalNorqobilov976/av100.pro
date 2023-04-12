<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useSigninStore } from './../stores/signinStore';
import { useRegisterStore } from './../stores/registerStore';
import { removeToken } from '../utils/localStorage'
import { get } from 'lodash';
import { toast } from 'vue3-toastify'

const router = useRouter();

const navbarLists = ref([
    {
        image: 'https://av100.pro/_nuxt/img/logo.63be7a3.svg',
        to: '/',
    }//,
    // {
    //     title: 'КОНТАКТЫ',
    //     to: '/contacts',
    // },
    // {
    //     title: 'ТАРИФЫ',
    //     to: '/tarif'
    // },
    // {
    //     title: 'ОБЪЯВЛЕНИЯ',
    //     to: 'ads/all',
    // },
    // {
    //     title: 'ПРОВЕРИТЬ АВТО',
    //     to: '/reports/search'
    // }
]);


const profileNavbarList = ref([
    {
        label: 'Настройки',
        icon: 'pi pi-cog',
        to: '/settings'
    },
    {
        label: 'Выход',
        icon: 'pi pi-sign-out',
        command: () => {
            removeToken()
                .then(() => {
                    signinPinia.token = '';
                    router.push('/'); 
                });
        }
    }
])
const signinPinia = useSigninStore();
const registerPinia = useRegisterStore();


const numberGetter = (text) => {
    return text.match(/\d+/g).join('')
}
const onRegister = () => {
    try {
        
        if(!registerPinia.registerForm.login) {
            const isFound = registerPinia.validationErrors.find(value => value.title == 'Логин обязателено!');
            if(!isFound) {
                registerPinia.validationErrors.push({title: 'Логин обязателено!'})
            }
            return;
        }
        
        if (!registerPinia.isDataSent) {
            return onRestore();
        }
        
        registerPinia.register({ login: '+' + numberGetter(registerPinia.registerForm.login) })
        .then(() => {
        });
    } catch (error) {
        toast.error( error.message || get(error, 'response.data.errors', 'Ошибка!'));
    }
}

const onRestore = () => {
    try {
        registerPinia.restore({ login: registerPinia.registerForm.login })
            .then(() => {
                registerPinia.continue = true;
                registerPinia.isDataSent = true;
            });
    } catch (error) {

    }
}

const onClearRegisterData = () => {
    registerPinia.$patch({
        registerForm: {
            login: ''
        },
        errors: [],
        isDataSent: false
    })
}
</script>

<template>
    <div id="navbar" class="bg-slate-300">
        <nav class="flex items-center justify-between p-2">
            <ol class="list-none flex items-center gap-2">
                <li v-for="nav, i in navbarLists" :key="i">
                    <router-link 
                        v-if="nav.image" 
                        class="no-underline text-900" 
                        :to="nav.to"
                    >
                        <Avatar 
                            class="mr-4 font-bold" 
                            size="large" 
                            :image="nav.image" 
                            shape="circle" 
                        />
                    </router-link>
                    <router-link 
                        v-else 
                        class="no-underline text-900" 
                        active-class="bg-green-500" 
                        :to="nav.to"
                    >
                    {{ nav.title }}</router-link>
                </li>
            </ol>
            <ol 
                class="list-none flex align-items-center gap-2" 
                v-if="!signinPinia.isAuthenticated"
            >
                <li>
                    <Button 
                        label="РЕГИСТРАЦИЯ" 
                        size="small" text
                        @click="registerPinia.modalToggle = !registerPinia.modalToggle" 
                    />
                </li>
                <li>
                    <Button 
                        label="ВОЙТИ" 
                        size="small" 
                        text 
                        @click="signinPinia.modalToggle = !signinPinia.modalToggle" 
                    />
                </li>
            </ol>
            <ol 
                v-if="signinPinia.isAuthenticated && signinPinia.user"  
                class="list-none flex items-center gap-4">
                <li v-for="nav, i in profileNavbarList" v-ripple :key="i">
                    <a
                        class="text-green-500 flex items-center gap-1 min-w-max border-none outline-none" 
                        @click="nav.command ? nav.command() : router.push(nav.to)"
                    >
                        <i :class="nav.icon"></i>{{ nav.label }}
                    </a>
                </li>
            </ol>
        </nav>
    </div>

    <Dialog 
        v-model:visible="registerPinia.modalToggle" 
        modal 
        header="РЕГИСТРАЦИЯ" 
        :style="{ width: '25vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
        <div 
            class="text-left my-4" 
            v-if="registerPinia.errors.length"
        >
            <span v-for="error in registerPinia.errors">
                {{ error.id == 10 
                    && `Введите номер телефона и получите доступ к
                        системе на 2 часа.` }}
            </span>
        </div>
        <p v-else class="mb-4 text-sm">
            Введите номер телефона, который указали при регистрации. Мы отправим новый пароль
        </p>
        <form @submit.prevent>
            <div class="flex gap-4">
                <label for="phone" class="mt-3">Телефон</label>
                <div class="flex flex-col w-full">
                    <InputMask 
                        name="phone"
                        class="flex-1"
                        :class="{ 'p-invalid': registerPinia.validationErrors.length }" 
                        id="phone" 
                        v-model="registerPinia.registerForm.login" 
                        mask="+9-999-999-9999"
                        placeholder="+7-999-999-9999"
                    />

                    <div class="text-right mt-1" v-if="registerPinia.errors.length">
                        <span @click="onClearRegisterData"
                            class=" pt-0 border-0 outline-none text-green-500 hover:text-green-600 cursor-pointer"
                        >
                            Восстановить пароль?
                        </span>
                    </div>
                    
                    <div class="text-right pr-3 mt-2" v-if="registerPinia.validationErrors.length">
                        <span 
                            class="text-red-500" 
                            v-for="error in registerPinia.validationErrors"
                        >
                            {{ get(error, 'title', '') }}
                        </span>
                    </div>

                    <div class="text-right pr-3 mt-2" v-if="registerPinia.errors.length">
                        <span 
                            class="text-red-500" 
                            v-for="error in registerPinia.errors"
                        >
                            {{ get(error, 'title', '') }}
                        </span>
                    </div>

                </div>
            </div>
            <div class="mt-2">
                <Checkbox 
                    inputId="agrementRegister" 
                    v-model="registerPinia.isAgree" 
                    :binary="true" 
                />
                <label for="agrementRegister" class="ml-2">
                    Я согласен с договором
                    <a 
                        class="list-none text-green-500 hover:text-green-600 no-underline"
                        href="https://av100.pro/docs/offer.pdf" 
                        target="_blank"
                    >оферты</a>
                </label>
            </div>

            <Button 
                :disabled="!registerPinia.isAgree"
                class="bg-green-500 border-0 text-white w-full mt-2 hover:bg-green-600 outline-none" 
                label="Отправить"
                @click="onRegister" 
            />

        </form>

        <div class="text-center text-sm text-black-alpha-60 mt-3 -mb-3">Повторная регистрация не допускается</div>

        <Dialog 
            v-model:visible="registerPinia.continue" 
            modal 
            header="РЕГИСТРАЦИЯ"
        >
            <p>
                На номер 
                <span class="font-bold">{{ registerPinia.registerForm.login }}</span> 
                отправлен пароль.
            </p>
            <Button 
                class="bg-green-500 border-0 text-white w-full mt-2 hover:bg-green-600 outline-none" 
                label="Продолжить"
                @click="registerPinia.continue = false; registerPinia.modalToggle = false;" 
            />
        </Dialog>
    </Dialog>

    <Dialog 
        v-model:visible="signinPinia.modalToggle" 
        modal 
        header="АВТОРИЗАЦИЯ" 
        :style="{ width: '25vw' }"
        :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
    >
        <form @submit.prevent>
            <div class="flex flex-col gap-2 w-full">
                <label for="login">Логин</label>
                <InputText 
                    v-model="signinPinia.signinForm.login" 
                    name="login"
                    placeholder="Введите Логин" 
                    class="w-full"
                    :class="{ 'p-invalid': signinPinia.isLoginError.length }"
                />
                <div 
                    v-if="signinPinia.isLoginError.length"
                    class="text-right mt-2"
                >
                    <span 
                        v-for="error in signinPinia.isLoginError"
                        class="text-red-500"
                    >
                        {{ get(error, 'title', '') }}
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-2 mt-3 w-full">
                <label for="login">Пароль</label>
                <span class="p-input-icon-right">
                    <i 
                        class="pi" @click="signinPinia.isPassword = !signinPinia.isPassword"
                        :class="[signinPinia.isPassword ? 'pi-eye' : 'pi-eye-slash']" 
                    ></i>
                    <InputText 
                        name="password"
                        :type="[signinPinia.isPassword ? 'password' : 'text']"
                        v-model="signinPinia.signinForm.password" 
                        placeholder="Введите пароль" 
                        class="w-full"
                        :class="{ 'p-invalid': signinPinia.isPasswordError.length }" 
                    />
                </span>
                <div 
                    v-if="signinPinia.isPasswordError.length"
                    class="text-right mt-0"
                >
                    <span 
                        v-for="error in signinPinia.isPasswordError"
                        class="text-red-500"
                    >
                        {{ get(error, 'title', '') }}
                    </span>
                </div>
                <div 
                v-if="signinPinia.errors.length"
                class="text-right mt-2"
            >
                <span 
                    v-for="error in signinPinia.errors"
                    class="text-red-500"
                >
                    {{ get(error, 'title', '') }}
                </span>
            </div>
            </div>
            <div 
                v-if="signinPinia.errors.length"
                class="text-right mt-2"
            >
                <span 
                    v-for="error in signinPinia.errors"
                    class="text-red-500"
                >
                    {{ get(error, 'title', '') }}
                </span>
            </div>
            <div class="flex justify-content-end my-2">
                <span 
                    @click="onClearRegisterData(); 
                        signinPinia.modalToggle = false; 
                        registerPinia.modalToggle = true;"
                    class="text-green-500 cursor-pointer hover:text-green-600"
                >
                    Забыли пароль?
                </span>
            </div>

            <div 
                v-if="registerPinia.errors.length"
                class="text-right pr-3 mt-2"
            >
                <span 
                    class="text-red-500" 
                    v-for="error in registerPinia.errors"
                >
                    {{ get(error, 'title', '')}}
                </span>
            </div>

            <div>
                <Checkbox 
                    v-model="signinPinia.isAgree" 
                    inputId="agrement" 
                    :binary="true" 
                />
                <label 
                    for="agrement" 
                    class="ml-2"
                > 
                    Я согласен с договором
                    <a 
                        class="list-none text-green-500 hover:text-green-600 no-underline"
                        href="https://av100.pro/docs/offer.pdf" 
                        target="_blank"
                    >оферты</a>
                </label>
            </div>
            <Button 
                :disabled="!signinPinia.isAgree"
                class="bg-green-500 border-0 text-white w-full mt-2 hover:bg-green-600 outline-none" 
                label="ВОЙТИ"
                @click="signinPinia.signin(signinPinia.signinForm)" 
            />
            <p class="text-center mt-2">
                Нет аккаунта? 
                <span 
                    class="text-green-500 hover:text-green-600 cursor-pointer"
                    @click="onClearRegisterData(); 
                        signinPinia.modalToggle = false; 
                        registerPinia.modalToggle = true;"
                >
                    Зарегистрироваться
                </span>
            </p>
        </form>
    </Dialog>
</template>