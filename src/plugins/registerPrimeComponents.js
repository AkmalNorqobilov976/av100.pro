import PrimeVue from 'primevue/config';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import StyleClass from 'primevue/styleclass';
import Tooltip from 'primevue/tooltip';

export default function registrPrimeComponents(app) {
    app.use(PrimeVue, { ripple: true });

    app.directive('tooltip', Tooltip);
    app.directive('ripple', Ripple);
    app.directive('styleclass', StyleClass);
    app.component('Avatar', Avatar);
    app.component('Button', Button);
    app.component('Checkbox', Checkbox);
    app.component('Dialog', Dialog);
    app.component('Dropdown', Dropdown);
    app.component('InputMask', InputMask);
    app.component('InputText', InputText);
    app.component('RadioButton', RadioButton);
}