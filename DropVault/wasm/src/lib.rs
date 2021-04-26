use aes_gcm::Aes256Gcm; // Or `Aes128Gcm`
use aes_gcm::aead::{Aead, NewAead, generic_array::GenericArray};
use rand_core::OsRng;
use x25519_dalek::{EphemeralSecret, PublicKey};

use wasm_bindgen::prelude::*;



#[wasm_bindgen]

pub fn diffie_hellman(key : String){
	let alice_secret = EphemeralSecret::new(OsRng);
	let alice_public = PublicKey::from(&alice_secret);
	let bob_secret = EphemeralSecret::new(OsRng);
	let bob_public = PublicKey::from(&bob_secret);
	let alice_shared_secret = alice_secret.diffie_hellman(&bob_public);
	let bob_shared_secret = bob_secret.diffie_hellman(&alice_public);
	encrypt(key, hex::encode(alice_shared_secret.as_bytes()));	
}

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



