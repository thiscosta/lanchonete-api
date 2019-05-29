const isValidObjectID = (str) => {
    str = str + '';
    var len = str.length, valid = false;
    if (len == 12 || len == 24) {
        valid = /^[0-9a-fA-F]+$/.test(str);
    }
    return valid;
}

const documentExists = async (schema ,id) => {
    const document = await schema.findById(id)
    return document ? true : false
}

module.exports = { isValidObjectID, documentExists }