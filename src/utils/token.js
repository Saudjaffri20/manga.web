import Cookies from 'js-cookie'

export function setToken(value) {
    try {
        if (value && value != undefined) {
            const token = Cookies.set('token', value, { expires: 1 });
            if (token) {
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

export function setCartListToLocalStorage(value) {
    try {
        localStorage.setItem('add_to_cart', JSON.stringify(value))
        return true;
    } catch (err) {

    }
}

export function getCartListToLocalStorage() {
    try {
        const list = JSON.parse(localStorage.getItem('add_to_cart'));
        if (list && list.length > 0) {
            return list;
        } else {
            return [];
        }
    } catch (err) {

    }
}

export function removeCartListToLocalStorage(productId) {
    try {
        const cartList = getCartListToLocalStorage();
        // Find the index of the string to remove
        const index = cartList.indexOf(productId);
        // Check if the string is found in the array
        if (index !== -1) {
            // Remove the string from the array using splice
            cartList.splice(index, 1);
        }
        localStorage.setItem('add_to_cart', JSON.stringify(cartList))
        return cartList;
    } catch (err) {

    }
}

export function removeALLCartToLocalStorage() {
    try {
        localStorage.removeItem('add_to_cart')
        return true;
    } catch (err) {

    }
}

