extern crate web_sys;
extern crate console_error_panic_hook;

use std::panic;
use aes_gcm::Aes256Gcm; // Or `Aes128Gcm`
use aes_gcm::aead::{Aead, NewAead, generic_array::GenericArray};
//use rand_core::OsRng;
//use x25519_dalek::{EphemeralSecret, PublicKey};
use rand_core::OsRng;
use x448::{Secret, PublicKey};

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

pub fn create_secret() -> String {

	panic::set_hook(Box::new(console_error_panic_hook::hook));

	let secret = Secret::new(&mut OsRng);
	return base64::encode(secret.as_bytes())
	
	
}

#[wasm_bindgen]

pub fn create_pub_key(secret: String) -> String {

	panic::set_hook(Box::new(console_error_panic_hook::hook));

	let secret_decode = base64::decode(&secret).expect("decode");
	let secret = Secret::from_bytes(secret_decode.as_ref()).expect("secret");
	let public_key = PublicKey::from(&secret);
	return base64::encode(public_key.as_bytes())
	
	
}

#[wasm_bindgen]

pub fn diffie_hellman(secret: String, pub_key: String) -> String {

	panic::set_hook(Box::new(console_error_panic_hook::hook));
	
	//web_sys::console::log_1(&secret.into());// regarder données en entrée
	//web_sys::console::log_1(&pub_key.into());
	
	let secret_decode = base64::decode(&secret).expect("decode");
	let secret = Secret::from_bytes(secret_decode.as_ref()).expect("secret");
	let pub_key_decode = base64::decode(pub_key).expect("decode");
	let public_key = PublicKey::from_bytes(pub_key_decode.as_ref()).expect("Public Key");
	let shared_secret = secret.to_diffie_hellman(&public_key).expect("diffie Hellman");
	return base64::encode(shared_secret.as_bytes())[0..32].to_string()
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
pub fn decrypt(ciphertext: String, key: String) -> String{
	
	panic::set_hook(Box::new(console_error_panic_hook::hook));
	
	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
	let nonce = GenericArray::from_slice(b"unique nonce"); 
  	let hex = base64::decode(ciphertext).expect("vec<u8>"); 	
   	let decryptext = cipher.decrypt(nonce, hex.as_ref())
   	 .expect("decryption failure!");  	 
   	return String::from_utf8(decryptext).expect("string");
    
}
#[wasm_bindgen]

pub fn encrypt_bin(contents: Vec<u8>, key: String) -> String/*Vec<u8>*/{

	
  	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
    	let nonce = GenericArray::from_slice(b"unique nonce");
    	let ciphertext = cipher.encrypt(nonce, contents.as_ref())
   	 .expect("encryption failure!"); 
    	return base64::encode(ciphertext)
    	
    
}



#[wasm_bindgen]
pub fn decrypt_bin(ciphertext: String/*Vec<u8>*/, key: String) -> Vec<u8>{
	
	panic::set_hook(Box::new(console_error_panic_hook::hook));
	//web_sys::console::log_1(&ciphertext.into());// regarder taille web assembly
	//web_sys::console::log_1(&ciphertext.len().into());
	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
	let nonce = GenericArray::from_slice(b"unique nonce"); 
  	let hex = base64::decode(&ciphertext).expect("vec<u8>"); 	
   	let decryptext = cipher.decrypt(nonce, hex.as_ref() /*ciphertext.as_ref()*/)
   	 .expect("decryption failure!");  	 
   	return decryptext;
    
}

#[wasm_bindgen]
pub fn encrypt_dh(contents: String, key: String) -> String {

	panic::set_hook(Box::new(console_error_panic_hook::hook));
	
  	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
    	let nonce = GenericArray::from_slice(b"unique nonce");
    	let ciphertext = cipher.encrypt(nonce, contents.as_bytes().as_ref())
   	 .expect("encryption failure!"); 
    	return base64::encode(ciphertext);
    	
    
}
#[wasm_bindgen]
pub fn decrypt_dh(ciphertext: String, key: String) -> String{
	
	panic::set_hook(Box::new(console_error_panic_hook::hook));
	
	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
	let nonce = GenericArray::from_slice(b"unique nonce"); 
  	let hex = base64::decode(ciphertext).expect("vec<u8>"); 	
   	let decryptext = cipher.decrypt(nonce, hex.as_ref())
   	 .expect("decryption failure!");  	 
   	return String::from_utf8(decryptext).expect("string");
    
}




