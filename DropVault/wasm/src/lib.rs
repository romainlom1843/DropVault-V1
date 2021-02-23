use aes_gcm::Aes256Gcm; // Or `Aes128Gcm`
use aes_gcm::aead::{Aead, NewAead, generic_array::GenericArray};
use double_ratchet::{DoubleRatchet};
use rand_os::RandOs;




use wasm_bindgen::prelude::*;

//type DR = DoubleRatchet<SignalCryptoProvider>;


#[wasm_bindgen]
pub fn encrypt(contents: String, key: String) -> String{

  	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
    	let nonce = GenericArray::from_slice(b"unique nonce"); // 96-bits; unique per message
    	let ciphertext = cipher.encrypt(nonce, contents.as_bytes().as_ref())
   	 .expect("encryption failure!"); // NOTE: handle this error to avoid panics!
   	//let ciphertextstring = std::str::from_utf8(&ciphertext).expect("Parsing string");
    	return String::from_utf8(ciphertext).expect("String");
    	
    
}
#[wasm_bindgen]
pub fn decrypt(ciphertext: String, key: String) -> String {
	let key = GenericArray::from_slice(key.as_bytes());
	let cipher = Aes256Gcm::new(key);
	let nonce = GenericArray::from_slice(b"unique nonce"); // 96-bits; unique per message
   	let decryptext = cipher.decrypt(nonce, ciphertext.as_bytes().as_ref())
   	 .expect("decryption failure!"); // NOTE: handle this error to avoid panics!
   	return String::from_utf8(decryptext).expect("decrypt");
    
}

/*#[wasm_bindgen]
pub fn echange_key(key: String){
let mut rng = OsRng::new().unwrap();
// Alice intializes and sends the first message
let mut alice = DR::new_alice(&SK, bobs_public_prekey, None, &mut rng);
let pt0 = key.as_bytes();
let (h0, ct0) = alice.ratchet_encrypt(pt0, b"A2B", &mut rng);

// Bob initializes and receives the first message
let mut bob = DR::new_bob(&SK, bobs_prekey_pair, None);
assert_eq!(
    Ok(Vec::from(&pt0[..])),
    bob.ratchet_decrypt(&h0, &ct0, b"A2B")
);
}*/


