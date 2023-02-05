module.exports = {
    //Generic 
    unknownError: "Unknown error",

    //Required
    requiredName: "Name is required",
    requiredPassword: "Password is required",
    requiredBody: "Body is required for this method",
    requireTagId: "Tag ID is required",

    //Exist
    existName: (name) => { return `The name ${name} already exists`},

    //Wrong
    wrongPassword: "Wrong password entered",

    //Success
    addedMediaToTag: "Successfully inserted media in the tag",
    updatedMediaInTag: "Successfully updated media in the tag",
    deletedMediaInTag: "Successfully deleted media in the tag",

    updatedTag: "Successfully updated the tag",
    deletedTag: "Successfully deleted the tag"
}