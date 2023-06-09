const express = require('express');
const router = express.Router();
const { getContacts , createContact, deleteContact, updateContact, getContact  } = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');


//validate all route 
router.use(validateToken);

 //get all the contact
router.route("/").get(getContacts);

//create a contacts
router.route("/").post(createContact);

//get the indivisual  contact 

router.route("/:id").get(getContact);

//put the induvisual contact
router.route("/:id").put(updateContact);

// delete the indivisual contact by id 
router.route("/:id").delete(deleteContact);


module.exports =router;