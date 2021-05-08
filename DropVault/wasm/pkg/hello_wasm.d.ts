/* tslint:disable */
/* eslint-disable */
/**
* @param {string} passwd
* @returns {string}
*/
export function derive_passwd(passwd: string): string;
/**
* @param {string} passwd
* @returns {string}
*/
export function derive_key(passwd: string): string;
/**
* @param {string} key2
*/
export function diffie_hellman(key2: string): void;
/**
* @param {string} contents
* @param {string} key
* @returns {string}
*/
export function encrypt(contents: string, key: string): string;
/**
* @param {Uint8Array} contents
* @param {string} key
* @returns {string}
*/
export function encrypt_bin(contents: Uint8Array, key: string): string;
/**
* @param {string} ciphertext
* @param {string} key
* @returns {string}
*/
export function decrypt(ciphertext: string, key: string): string;
/**
* @param {string} ciphertext
* @param {string} key
* @returns {Uint8Array}
*/
export function decrypt_bin(ciphertext: string, key: string): Uint8Array;
/**
* @param {string} contents
* @param {string} key
* @returns {string}
*/
export function encrypt_dh(contents: string, key: string): string;
