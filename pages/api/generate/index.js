import { token } from '../../../config';

export default async(req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
		return res.status(401).json({ message: 'Missing Authorization Header' });
	}
	const authorization =  req.headers.authorization.split(' ')[1];
	const crypto = require("crypto");
	if (authorization != token) {
		return res.status(401).json({ message: 'Invalid Authentication Credentials' });
	}
	const ecdh = crypto.createECDH("secp521r1");
    ecdh.generateKeys();
    const PublicKey = ecdh.getPublicKey('hex');
    const PrivateKey = ecdh.getPrivateKey('hex');
	res.status(200).send(JSON.stringify({"PublicKey": PublicKey, "PrivateKey": PrivateKey}));
}