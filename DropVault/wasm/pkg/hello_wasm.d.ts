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
* @param {string} key
*/
export function diffie_hellman(key: string): void;
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
