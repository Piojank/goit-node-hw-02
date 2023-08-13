const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  };
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result;
  } catch (error) {
    console.log(error.message);
  };
};

const removeContact = async (contactId) => {
  try {
    const contactToDelete = getContactById(contactId);
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1 ) {
      return null;
    };

    contacts.splice(contactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contactToDelete;
  } catch (error) {
    console.log(error.message);
  };
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const addContact = { id: v4(), ...body };
    contacts.push(addContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return addContact;
  } catch (error) {
    console.log(error.message);
  };
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1 ) {
      return null;
    };

    contacts[contactIndex] = { id: contactId, ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    const contactUpdated = contacts[contactIndex];

    return contactUpdated;
  } catch (error) {
    console.log(error.message);
  };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
