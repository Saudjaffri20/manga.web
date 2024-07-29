import Cookies from 'js-cookie'

export function setToken(value) {
    try {
        if (value && value != undefined) {
            const token = Cookies.set('token', value, { expires: 1 });
            if(token){
                return true;
            }
        }
    } catch (err) {

    }
}

export function getToken() {
    try {
        const token = Cookies.get('token');
        if (token && token !== undefined) {
            return true;
        }
    } catch (err) {

    }
}

export function removeToken() {
    try {
        Cookies.remove('token');
        return false;
    } catch (err) {

    }
}