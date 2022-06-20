import { token } from '../../../config';

export default async(req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
		return res.status(401).json({ message: 'Missing Authorization Header' });
	}
	const authorization =  req.headers.authorization.split(' ')[1];
	const crypto = require("crypto");
	const key = req.body.key;
	const encryptedText = req.body.text;
	if (authorization != token) {
		return res.status(401).json({ message: 'Invalid Authentication Credentials' });
	}
	if (typeof key !== "string" || !key) {
		return res.status(401).json({ message: 'Provided KEY must be a non-empty string' });
	}

	if (typeof encryptedText !== "string" || !encryptedText) {
		return res.status(401).json({ message: 'Provided ENCRYPTEDTEXT must be a non-empty string' });
	}

	const encryptedBuffer = Buffer.from(encryptedText, "base64");

	const hash = crypto.createHash("sha256");
	hash.update(key);

	if (encryptedBuffer.length < 17) {
		return res.status(401).json({ message: 'Provided ENCRYPTEDTEXT must decrypt to a non-empty string' });
	}

	// Initialization Vector
	const iv = encryptedBuffer.slice(0, 16);
	const authTag = encryptedBuffer.slice(16, 32);
	const decipher = crypto.createDecipheriv("aes-256-gcm", hash.digest(), iv);
	decipher.setAuthTag(authTag);
	const cipherText = decipher.update(
		encryptedBuffer.slice(32),
		"base64",
		"utf-8"
	);
	const clearText = cipherText + decipher.final("utf-8");
	res.status(200).send(clearText);
}