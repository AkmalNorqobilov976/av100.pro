import { formerSingleFile } from "../utils/former";
import service from "../utils/request";

export function sipLogin() {
    return service({
        url: `siplogin`
    })
};

export function signin({ login, password, fromuser }) {
    return service({
        url: `login`,
        method: 'post',
        data: { login, password, fromuser }
    })
};


export function register({ login }) {
    return service({
        url: `register`,
        method: 'post',
        data: {
            login
        }
    })
};

export function restore({ login }) {
    return service({
        url: `restore`,
        method: 'post',
        data: {
            login
        }
    })
};

export function getUserById({ userId }) {
    return service({
        url: `user/${userId}`
    })
}

export function updateUser({
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
    const form = formerSingleFile()
    return service({
        url: `user/${id}`,
        method: 'put',
        data: {
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
        }
    });
}