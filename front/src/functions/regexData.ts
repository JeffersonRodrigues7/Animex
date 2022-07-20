const regexLinkHTTP: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gi;
//const regexLink: RegExp = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gi;

const regexYoutube: RegExp = /\s*[a-zA-Z\/\/:\.]*youtu(be.com\/watch\?v=|.be\/)([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/gi;
const regexYoutubeVideoId: RegExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

const regexImage: RegExp = /\b(https?:\/\/\S+(?:png|jpe?g|gif))\b/gi;

const regexInstagram: RegExp = /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([^/?#&]+)).*/gi;
const regexInstagramPostId: RegExp = /\/(?:p|reel)\/(.*?)\//;

const regexTwitter: RegExp = /\s*[a-zA-Z\/\/:\.]*twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/gi;
const regexTwitterProfile: RegExp = /com\/(\w*)/;
const regexTwitterPost: RegExp = /status\/(\d+)/;

export { regexLinkHTTP, regexYoutube, regexImage, regexInstagram, regexTwitter, regexYoutubeVideoId, regexInstagramPostId, regexTwitterProfile, regexTwitterPost };
