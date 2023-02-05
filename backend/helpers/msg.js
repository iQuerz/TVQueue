module.exports = {
    //Generic 
    unknownError: "Unknown error",

    //Required
    requiredName: "Name is required",
    requiredPassword: "Password is required",
    requiredBody: "Body is required for this method",
    requireTagId: "Tag ID is required",

    //Wrong
    wrongPassword: "Wrong password entered",

    //Exist: true
    existName: (name) => { return `The name ${name} already exists`},
    existCustomMediaInTag: "Media that you tried to insert in the tag already exists",

    //Not found
    mediaInTagNotFound: "Media in the tag was not found",
    tagNotFound: "The tag was not found",   

    //Success
    addedMediaToTag: "Successfully inserted media in the tag",
    updatedMediaInTag: "Successfully updated media in the tag",
    deletedMediaInTag: "Successfully deleted media in the tag",

    updatedTag: "Successfully updated the tag",
    deletedTag: "Successfully deleted the tag"
}