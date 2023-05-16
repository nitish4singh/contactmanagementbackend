//@describe  get all contact
//@route GET /api/contacts
//@access public
const getContacts =(req ,res)=>{
    res.status(200).json({message:"Get all contact" })
}


//@describe  create New Contact
//@route POST /api/contacts
//@access public
const createContact = (req, res) => {
    console.log("contact is comming",req.body);
//error handling if field is empty then handle the error
const {name, email, phone} = req.body;
if (!name || !email || !phone) {
    res.status(400);
    throw new Error ('all fields should mandatory ')
}


    res.status(201).json({message:'create  contacts'});
}

//@describe  Get Contact
//@route GET /api/contacts/:id
//@access public
const getContact = (req, res) => {
    res.status(200).json({message:`get contact  for ${req.params.id}`});
}

//@describe  Update Contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = (req, res) => {
    res.status(200).json({message:`update contact  for ${req.params.id}`});
}


//@describe  Delete Contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact =(req, res) => {
    res.status(200).json({message:`detete the contact for  ${req.params.id}`});
}

module.exports={ getContacts , createContact, deleteContact, updateContact, getContact };