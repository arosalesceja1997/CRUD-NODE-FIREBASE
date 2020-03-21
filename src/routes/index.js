const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

const serviceAccount = require("../../crud-node-95ccb-firebase-adminsdk-qgv6s-5188657f64.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL :'https://crud-node-95ccb.firebaseio.com/'
});

const db = admin.database();

router.get('/', (req, res) => {
	db.ref('contacts').once('value', (snapshot) => {
		const data = snapshot.val();
		res.render('index.hbs', {contacts : data});
	});
});

router.post('/new-contact', (req, res) => {
	const newContact = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone
	};

	db.ref('contacts').push(newContact);
	res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
	db.ref('contacts/' + req.params.id).remove();
	res.redirect('/');
});

module.exports = router;