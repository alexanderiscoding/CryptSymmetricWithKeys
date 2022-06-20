import { token } from '../../../config';

export default async(req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
		return res.status(401).json({ message: 'Missing Authorization Header' });
	}
	const authorization =  req.headers.authorization.split(' ')[1];
	const crypto = require("crypto");
	const key = req.body.key;
	const cleartext = req.body.text;
	if (authorization != token) {
		return res.status(401).json({ message: 'Invalid Authentication Credentials' });
	}
	if (typeof key !== "string" || !key) {
		return res.status(401).json({ message: 'Provided KEY must be a non-empty string' });
	}

	if (typeof cleartext !== "string" || !cleartext) {
		return res.status(401).json({ message: 'Provided CLEARTEXT must be a non-empty string' });
	}

	const hash = crypto.createHash("sha256");
	hash.update(key);

	// Initialization Vector
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv("aes-256-gcm", hash.digest(), iv);

	const ciphertext = Buffer.concat([
		cipher.update(Buffer.from(cleartext), "utf8"),
		cipher.final(),
	]);

	const authTag = cipher.getAuthTag();

	const encryptedText = Buffer.concat([iv, authTag, ciphertext]).toString(
		"base64"
	);
	res.status(200).send(encryptedText);
}