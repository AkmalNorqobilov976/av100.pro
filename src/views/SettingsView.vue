
<script setup lang="ts">
import { computed, ref } from 'vue';
import Layout from '../components/Layout.vue';
import { useSigninStore } from '../stores/signinStore';
import { get } from 'lodash';
import { toast } from 'vue3-toastify';

const signinPinia = useSigninStore();
const emailPencilToggle = ref(false);
const telegramPencilToggle = ref(false);
const timeZones = ref([{
    text: 'Калининград', value: 'Kaliningrad' }, 
    { text: 'Москва', value: 'Moscow'}, 
    {text: 'Самара', value: 'Samara'},
    {text: 'Екатеринбург', value: 'Ekb'}, 
    {text: 'Омск', value: 'Omsk'},
    {text: 'Красноярск', value: 'Krasnoyarsk'},
    {text: 'Иркутск', value: 'Irkutsk'}, 
    {text: 'Якутск', value: 'Yakutsk'}, 
    {text: 'Владивосток', value: 'Vladivostok'}, 
    {text: 'Магадан', value: 'Magadan'}, 
    {text: 'Камчатка', value: 'Kamchatka'}
]);


const computedRedirectTarget = computed({
    get() {
        return signinPinia.user.redirecttarget ? true : false;
    },
    set(value) {
        signinPinia.user.redirecttarget = value ? 1 : 0;
    }
})

const computedLentaColorType = computed({
    get() {
        return signinPinia.user.lentacolortype ? true : false;
    },
    set(value) {
        signinPinia.user.lentacolortype = value ? 1 : 0;
    }
})
// redirecttarget
const onSave = () => {
    try {
        signinPinia.updateUser(signinPinia.user)
            .then(() => {
                toast.success('сохранено!');
            })
    } catch (error) {
        toast.error(error.message || get(error, 'data.response.message', 'Ошибка!'));
    }
}

</script>
<template>
    <div id="settings">
        <Layout>
            <h1 class="text-4xl font-bold">Настройки</h1>
            <form @submit.prevent="">
                <div class="xl:grid xl:grid-cols-3  xl:w-1/2 grid grid-cols-1 align-items-start mt-4">
                    <div class="xl:flex items-center gap-2 col-span-1  hidden">
                        <label class="text-xl font-bold" for="input51">Звонок через SIP</label>
                        <InputSwitch inputId="input51" />
                    </div>
                    <div class="col-span-2">
                        Включите эту функцию чтобы Авито и другие площадки не блокировали ваш аккаунт. 
                        Будет выглядеть так, будто звонки совершаются с разных номеров.
                    </div>
                </div>

                <div class="xl:grid xl:grid-cols-3 xl:w-1/2 grid grid-cols-1 items-start mt-4">
                    <div class="col-span-1 xl:flex hidden items-center gap-2 text-xl font-bold">
                        Учётная запись
                    </div>
                    <div class="col-span-2 flex  w-full flex-col gap-4">
                        <div class="flex xl:flex-row flex-col items-center justify-between gap-1">
                            <label for="company" class="text-xl w-full xl:w-fit">Компания</label>
                            <InputText
                                inputId="company"
                                v-model="signinPinia.user.companyname"
                                class="xl:w-3/5 w-full"
                            />
                        </div>

                        <div class="flex xl:flex-row flex-col items-center justify-between gap-4">
                            <label for="login" class="text-xl w-full xl:w-fit">Логин</label>
                            <InputText
                                inputId="login"
                                v-model="signinPinia.user.login"
                                class="xl:w-3/5 w-full"
                            />
                        </div>

                        <div class="flex xl:flex-row flex-col items-center justify-between">
                            <label for="phone" class="text-xl w-full xl:w-fit">Номер телефона</label>
                            <InputText
                                inputId="phone"
                                on v-model="signinPinia.user.phone"
                                class="xl:w-3/5 w-full"
                            />
                        </div>

                        <div class="flex xl:flex-row flex-col items-center justify-between">
                            <label for="username" class="text-xl w-full xl:w-fit">Имя</label>
                            <InputText
                                inputId="username"
                                v-model="signinPinia.user.fname"
                                class="xl:w-3/5 w-full"
                            />
                        </div>

                        <div class="flex xl:flex-row flex-col items-center justify-between">
                            <label for="lastname" class="text-xl w-full xl:w-fit">Фамилия</label>
                            <div class="xl:w-3/5 w-full">
                                <InputText
                                    inputId="lastname"
                                    v-model="signinPinia.user.lname"
                                    class="w-full"
                                />
                                <p class="text-xs opacity-70 mt-1">* Не обязательно</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:grid xl:grid-cols-3 xl:w-1/2 grid grid-cols-1 items-start mt-4">
                    <div class="col-span-1 flex items-center gap-2 text-xl font-bold">
                        Оповещения о новых подборках
                    </div>
                    <div class="col-span-2 flex flex-col gap-4">
                        <div class="text-black-alpha-70">
                            Выберите, куда будут приходить уведомления при появлении автомобилей, 
                            которые подходят под критерии вашей подборки.
                        </div>

                        <div class="flex  flex-col">
                            <p class="text-xl"> Уведомления </p>
                            <div class="flex items-center gap-2 border-b-2 py-2 mt-4">
                                <RadioButton
                                    name="notification"
                                    v-model="signinPinia.user.sendMethod"
                                    :value="-1"
                                    inputId="rBtnfirst"
                                />
                                <label for="rBtnfirst">Выкл</label>
                            </div>

                            <div class="flex items-center gap-2 border-b-2 py-2 mt-4">
                                <RadioButton
                                    name="notification"
                                    v-model="signinPinia.user.sendMethod"
                                    :value="0"
                                    inputId="rBtnfirst1"
                                />
                                <label for="rBtnfirst1">Push</label>
                                <div class="flex-1 text-right">
                                    <i 
                                        class="pi pi-info-circle cursor-pointer" 
                                        v-tooltip.bottom="'Можно установить только в приложении'"
                                    ></i>
                                </div>
                            </div>

                            <div class="flex items-center gap-2 border-b-2 py-2 mt-4">
                                <RadioButton
                                    name="notification"
                                    v-model="signinPinia.user.sendMethod"
                                    :value="2"
                                    inputId="rBtnfirst2"
                                />
                                <label for="rBtnfirst2">Email</label>
                                <div class="flex-1 text-right">
                                    <InputText 
                                        v-if="emailPencilToggle" 
                                        class="h-2rem mr-2 w-fit" 
                                        type="text"
                                        v-model="signinPinia.user.email"
                                    />
                                    <span v-else>
                                        {{ signinPinia.user.email || '' }}
                                        <i
                                            @click="emailPencilToggle = !emailPencilToggle" 
                                            class="pi pi-pencil text-green-500 ml-1 text-sm cursor-pointer"
                                        ></i>
                                    </span>
                                </div>
                            </div>

                            <div class="flex items-center gap-2 border-b-2 py-2 mt-4">
                                <RadioButton
                                    name="notification"
                                    v-model="signinPinia.user.sendMethod"
                                    value="1"
                                    inputId="rBtnfirst3"
                                />
                                <a href="https://avclick.me/v/AVinfoBot" class="text-green-500">
                                    Telegram ID
                                </a>
                                <div class="flex-1 text-right">
                                    <InputText 
                                        v-if="telegramPencilToggle" 
                                        v-model="signinPinia.user.telegramChat"
                                        name="telegramChat"
                                        class="h-2rem mr-2 w-fit" 
                                        type="text"
                                    />
                                    <span v-else>
                                        {{ signinPinia.user.telegramChat || '' }}
                                        <i 
                                            @click="telegramPencilToggle = !telegramPencilToggle" 
                                            class="pi pi-pencil text-green-500 text-sm ml-1 cursor-pointer"
                                        ></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:grid xl:grid-cols-3 xl:w-1/2 grid grid-cols-1 items-start mt-4">
                    <div class="col-span-1 flex items-center gap-2 text-xl font-bold">
                        Переход в карточку
                    </div>
                    <div class="col-span-2 flex flex-col gap-4">
                        <div class="text-black-alpha-70">
                            Выберите, каким образом будет открываться детальное представление выбранного вами транспорта.
                        </div>
                        <div class="flex  flex-col">
                            <p class="text-xl"> Уведомления </p>
                            <div class="flex items-center gap-2 border-b-2 py-2 mt-4">
                                <RadioButton
                                    name="notification"
                                    v-model="signinPinia.user.redirecttarget"
                                    :value="0"
                                    inputId="rBtnfirstRedirect"
                                />
                                <label for="rBtnfirstRedirect">В карточку в текущем окне</label>
                            </div>

                            <div class="flex items-center gap-2 border-b-2 py-2 mt-4">
                                <RadioButton
                                    name="notification"
                                    v-model="signinPinia.user.redirecttarget"
                                    :value="1"
                                    inputId="rBtnfirstRedirect1"
                                />
                                <label for="rBtnfirstRedirect1">В карточку в отдельном окне</label>
                            </div>

                            <div class="flex items-center gap-2 py-2 mt-4">
                                <RadioButton
                                    name="notification"
                                    v-model="signinPinia.user.redirecttarget"
                                    :value="2"
                                    inputId="rBtnfirstRedirect2"
                                />
                                <label for="rBtnfirstRedirect2">На источник</label>
                                <div class="flex-1 text-right">
                                    <i 
                                        class="pi pi-info-circle cursor-pointer" 
                                        v-tooltip.bottom="'Прямой переход в объявление на источнике'"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="xl:grid xl:grid-cols-3 xl:w-1/2 grid grid-cols-1 items-start mt-4">
                    <div class="col-span-1 flex items-center gap-2 text-xl font-bold">
                        Прочие настройки
                    </div>
                    <div class="col-span-2 flex flex-col gap-4 border-b-2 pb-4">
                        <div class="flex  flex-col">
                            <div class="flex xl:flex-row flex-col items-center justify-content-between">
                                <label for="login" class="text-xl w-full xl:w-fit">Часовой пояс</label>
                                <Dropdown 
                                    v-model="signinPinia.user.timezonestring" 
                                    :options="timeZones" 
                                    class="w-full md:w-14rem"
                                    optionLabel="text"
                                    optionValue="value"
                                />
                            </div>
                            <div class="flex items-center gap-2 py-2 mt-4">
                                <Checkbox
                                    v-model="signinPinia.user.ignoreavg"
                                    name="computedRedirectTarget"
                                    inputId="input-58"
                                    :binary="true" 
                                />
                                <label for="input-58">Автоматически переходить к новым объявлениям</label>
                                <div class="flex-1 text-right">
                                    <i 
                                        class="pi pi-info-circle cursor-pointer" 
                                        v-tooltip.bottom="'Лента будет автоматически обновляться 1 раз в 3 секунды'"
                                    ></i>
                                </div>
                            </div>

                            <div class="flex items-center gap-2 py-2 mt-4">
                                
                                <Checkbox
                                    v-model="computedLentaColorType"
                                    value="0"
                                    :binary="true"

                                    inputId="input-59"
                                />
                                <label for="input-59">Включить цвета в ленте</label>
                                <div class="flex-1 text-right">
                                    <i 
                                        class="pi pi-info-circle cursor-pointer" 
                                        v-tooltip.bottom="'Включение зеленого/желтого цвета'"
                                    ></i>
                                </div>
                            </div>
                        </div>
                        <Button 
                            class="bg-green-600 hover:bg-green-500 border-0 outline-none" 
                            label="Submit"
                            @click="onSave"
                        />
                    </div>
                </div>
            </form>
        </Layout>
    </div>
</template>