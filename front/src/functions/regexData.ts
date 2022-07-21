export const regexYoutubeVideoId: RegExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

export const regexTwitter: RegExp = /\s*[a-zA-Z\/\/:\.]*twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
export const regexTwitterPostStatus: RegExp = /status\/(\d+)/;
export const regexTwitterPostUser: RegExp = /com\/(\w*)/;

export const regexInstagram: RegExp = /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([^/?#&]+)).*/;
export const regexInstagramPostId: RegExp = /\/(?:p|reel)\/(.*?)\//;

export const regexImageWithHTTP: RegExp = /(https:)\/\/[^'"<>]+?\.(jpg|jpeg|gif|png)/;
export const regexImageWithoutHTTP: RegExp = /.*\.(gif|jpe?g|bmp|png)$/;

export const regexLinkWithHTTP: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;
export const regexLinkWithoutHTTP: RegExp = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;
