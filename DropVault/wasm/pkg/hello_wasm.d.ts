/* tslint:disable */
/* eslint-disable */
/**
* @param {string} contents
* @param {string} key
* @returns {Uint8Array}
*/
export function encrypt(contents: string, key: string): Uint8Array;
/**
* @param {Uint8Array} ciphertext
* @param {string} key
* @returns {string}
*/
export function decrypt(ciphertext: Uint8Array, key: string): string;
