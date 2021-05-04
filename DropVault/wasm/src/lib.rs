extern crate web_sys;
extern crate console_error_panic_hook;

use std::panic;
use aes_gcm::Aes256Gcm; // Or `Aes128Gcm`
use aes_gcm::aead::{Aead, NewAead, generic_array::GenericArray};
use rand_core::OsRng;
use x25519_dalek::{EphemeralSecret, PublicKey};


use pbkdf2::{
    password_hash::{PasswordHash, PasswordHasher},
    Pbkdf2
};


use wasm_bindgen::prelude::*;


// Key derivation hash key
#[wasm_bindgen]
pub fn derive_passwd(passwd : String) -> String{


  	let password = passwd.as_bytes();
	let saltstorage = "saltStorage";
	
	// Hash password to PHC string ($pbkdf2-sha256$...)
	let password_hash = Pbkdf2.hash_password_simple(password, saltstorage.as_ref()).expect("derivation").to_string();
	//println!("{}", password_hash);
	
	// Verify password against PHC string
	let parsed_hash = PasswordHash::new(&password_hash).expect("hash verified");
	//println!("{}", parsed_hash);
	return parsed_hash.to_string()
}

// Key derivation hash password
#[wasm_bindgen]
pub fn derive_key(passwd : String) -> String{


  	let password = passwd.as_bytes();
	let saltpassword = "saltPasword";
	
	// Hash password to PHC string ($pbkdf2-sha256$...)
	let password_hash = Pbkdf2.hash_password_simple(password, saltpassword.as_ref()).expect("derivation").to_string();
	//println!("{}", password_hash);
	
	// Verify password against PHC string
	let parsed_hash = PasswordHash::new(&password_hash).expect("hash verified");
	//println!("{}", parsed_hash);
	return parsed_hash.to_string()
}


#[wasm_bindgen]

pub fn diffie_hellman(key : String){
	let alice_secret = EphemeralSecret::new(OsRng);
	let alice_public = PublicKey::from(&alice_secret);
	let bob_secret = EphemeralSecret::new(OsRng);
	let bob_public = PublicKey::from(&bob_secret);
	let alice_shared_secret = alice_secret.diffie_hellman(&bob_public);
	let bob_shared_secret = bob_secret.diffie_hellman(&alice_public);
	encrypt(key, base64::encode(alice_shared_secret.as_bytes()));	
}

#[wasm_bindgen]
pub fn encrypt(contents: String, key: String) -> String {

  	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
    	let nonce = GenericArray::from_slice(b"unique nonce");
    	let ciphertext = cipher.encrypt(nonce, contents.as_bytes().as_ref())
   	 .expect("encryption failure!"); 
    	return base64::encode(ciphertext);
    	
    
}


#[wasm_bindgen]
pub fn decrypt(ciphertext: String, key: String) -> String {
	
	panic::set_hook(Box::new(console_error_panic_hook::hook));
	
	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
	let nonce = GenericArray::from_slice(b"unique nonce"); 
  	let hex = base64::decode(ciphertext).expect("vec<u8>"); 	
   	let decryptext = cipher.decrypt(nonce, hex.as_ref())
   	 .expect("decryption failure!");  	 
   	return String::from_utf8(decryptext).expect("string");
    
}




