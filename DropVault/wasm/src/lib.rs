use aes_gcm::Aes256Gcm; // Or `Aes128Gcm`
use aes_gcm::aead::{Aead, NewAead, generic_array::GenericArray};

use wasm_bindgen::prelude::*;




#[wasm_bindgen]
pub fn encrypt(contents: String, key: String) -> String {

  	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
    	let nonce = GenericArray::from_slice(b"unique nonce");
    	let ciphertext = cipher.encrypt(nonce, contents.as_bytes().as_ref())
   	 .expect("encryption failure!"); 
    	return hex::encode(ciphertext);
    	
    
}

#[wasm_bindgen]
pub fn decrypt(ciphertext: String, key: String) -> String {
	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
	let nonce = GenericArray::from_slice(b"unique nonce"); 
  	let hex = hex::decode(ciphertext).expect("vec<u8>");
   	let decryptext = cipher.decrypt(nonce, hex.as_ref())
   	 .expect("decryption failure!"); 
   	return String::from_utf8(decryptext).expect("string");
    
}



