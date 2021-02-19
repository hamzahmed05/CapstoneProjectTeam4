export function getBetterImage(imageURL){
    imageURL = imageURL.replace("=s96-c", "");
    imageURL = imageURL.replace("s96-c/", "");
    return imageURL;
}