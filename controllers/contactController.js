
const asyncHandler =require('express-async-handler');
const Contact =require('../models/contactModel');

//@describe  get all contact
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async(req ,res) => {
    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});


//@describe  create New Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("contact is comming", req.body);
//error handling if field is empty then handle the error
const {name, email, phone  } = req.body;
if (!name || !email || !phone) {
    res.status(400);
    throw new Error ('all fields should mandatory ');
}

const contact = await Contact.create({
    name, email, phone, user_id: req.user.id
}); 
    res.status(201).json(contact);
});

//@describe  Get Contact
//@route GET /api/contacts/:id
//@access private
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
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not found")
    }
    // check the user id is equal to loginin userid or not
if (contact.user_id.toString() !==req.user.id){
    res.status(403);
    throw new Error("user don have permission to update the contact")
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
//@access private
const deleteContact =asyncHandler( async (req, res) => {
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not found")
    }
    if (contact.user_id.toString() !==req.user.id){
        res.status(403);
        throw new Error("user don have permission to update the contact")
    }
    await Contact.deleteOne({_id:req.params.id});

    res.status(200).json(contact);
});

module.exports={  getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};