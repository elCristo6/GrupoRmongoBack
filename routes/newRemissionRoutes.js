// routes/newRemissionRoute.js
const express = require('express');
const remiController = require('../controllers/newRemissionController');
const router = express.Router();

router.use(express.json());

router.get('/newRemission/', remiController.getAllRemission);
router.get('/newRemission/:userCC', remiController.getRemissionByCC);
router.post('/newRemission/', remiController.createRemission);
router.delete('/newRemission/:id', remiController.deleteRemission);

module.exports = router;
