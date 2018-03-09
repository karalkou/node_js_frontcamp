const express = require('express');
const router = express.Router();
const auth = require("../controllers/AuthController.js");


// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route for register action for react app
router.post('/api/register', auth.doRegisterReact);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for login action for react app
router.post('/api/login', auth.doLoginReact);

// route for logout action
router.get('/logout', auth.logout);


module.exports = router;
/*----------------------------------------------------*/
