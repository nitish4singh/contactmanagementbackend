
const asyncHandler =require('express-async-handler');
const Contact =require('../models/contactModel');

//@describe  get all contact
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req ,res) => {
    const contacts= await Contact.find();
    res.status(200).json(contacts);
});


//@describe  create New Contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log("contact is comming", req.body);
//error handling if field is empty then handle the error
const {name, email, phone } = req.body;
if (!name || !email || !phone) {
    res.status(400);
    throw new Error ('all fields should mandatory ');
}

const contact = await Contact.create({
    name, email, phone,
}); 
    res.status(201).json(contact);
});

//@describe  Get Contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact =await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error('contact not found');
    }
    res.status(200).json(contact);
});

//@describe  Update Contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not found")
    }
const updatedContact =await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true}
);

    res.status(200).json(updatedContact);
});


//@describe  Delete Contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact =asyncHandler( async (req, res) => {
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not found")
    }
    await Contact.remove();

    res.status(200).json(contact);
});

module.exports={  getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};