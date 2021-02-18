

//use libaes::Cipher;

use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn encrypt(mut contents: String) -> String {
    let s = "phrase";
    contents = s.to_string();
    return contents;
    
}
#[wasm_bindgen]
pub fn decrypt(mut contents: String) -> String {
    let s = "une autre phrase";
    contents = s.to_string();
    return contents;
    
}
