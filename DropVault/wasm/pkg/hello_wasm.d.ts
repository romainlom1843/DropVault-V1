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
* @returns {string}
*/
export function create_secret(): string;
/**
* @param {string} secret
* @returns {string}
*/
export function create_pub_key(secret: string): string;
/**
* @param {string} secret
* @param {string} pub_key
* @returns {string}
*/
export function diffie_hellman(secret: string, pub_key: string): string;
/**
* @param {string} contents
* @param {string} key
* @returns {string}
*/
export function encrypt(contents: string, key: string): string;
/**
* @param {string} ciphertext
* @param {string} key
* @returns {string}
*/
export function decrypt(ciphertext: string, key: string): string;
/**
* @param {Uint8Array} contents
* @param {string} key
* @returns {string}
*/
export function encrypt_bin(contents: Uint8Array, key: string): string;
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
/**
* @param {string} ciphertext
* @param {string} key
* @returns {string}
*/
export function decrypt_dh(ciphertext: string, key: string): string;
