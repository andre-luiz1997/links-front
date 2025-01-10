import { environment } from 'src/environments/environment.development';
import CryptoJS from 'crypto-js';

const STORAGE_SECRET = environment.STORAGE_SECRET;

const STORAGE_KEYS = {
	ACCESS_TOKEN: 'access_token',
	USER: 'user',
	ROLE: 'role',
    TOGGLE_SIDEBAR: 'toggle_sidebar',
	DASHBOARD_PERIOD: 'dashboard_period',
};

function setStorage(key: string, value: any) {
	localStorage.setItem(key, CryptoJS.AES.encrypt(JSON.stringify(value), STORAGE_SECRET).toString());
}

function getStorage(key: string) {
	try {
		let value = localStorage.getItem(key);
		if (!value) return null;
		value = CryptoJS.AES.decrypt(value, STORAGE_SECRET).toString(CryptoJS.enc.Utf8);
		return JSON.parse(value);
	} catch (error) {
        return null;
    }
}

function removeStorage(key: string) {
	localStorage.removeItem(key);
}

function clear() {
	localStorage.clear();
}

export const STORAGE = {
	set: setStorage,
	get: getStorage,
	remove: removeStorage,
	clear,
	keys: STORAGE_KEYS,
};
