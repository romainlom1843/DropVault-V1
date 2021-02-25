use aes_gcm::Aes256Gcm; // Or `Aes128Gcm`
use aes_gcm::aead::{Aead, NewAead, generic_array::GenericArray};




use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn encrypt(contents: String, key: String) -> String{

  	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
    	let nonce = GenericArray::from_slice(b"unique nonce"); // 96-bits; unique per message
    	let ciphertext = cipher.encrypt(nonce, contents.as_bytes().as_ref())
   	 .expect("encryption failure!"); // NOTE: handle this error to avoid panics!
   	//let ciphertextstring = std::str::from_utf8(&ciphertext).expect("Parsing string");
    	return hex::encode(ciphertext);
    	
    
}
#[wasm_bindgen]
pub fn decrypt(ciphertext: String, key: String) -> String {
	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
	let nonce = GenericArray::from_slice(b"unique nonce"); // 96-bits; unique per message
   	let decryptext = cipher.decrypt(nonce, ciphertext.as_bytes().as_ref())
   	 .expect("decryption failure!"); // NOTE: handle this error to avoid panics!
   	return hex::encode(decryptext);
    
}



