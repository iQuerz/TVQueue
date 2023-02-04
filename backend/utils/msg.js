module.exports = {
    //Generic 
    unknownError: "Unknown error",

    //Required
    requiredName: "Name is required",
    requiredPassword: "Password is required",

    //Exist
    existName: (name) => { return `The name ${name} already exists`},

    //Wrong
    wrongPassword: "Wrong password entered",

    //Tag
    addedMediaToTag: `Successfully inserted media to the tag`
}