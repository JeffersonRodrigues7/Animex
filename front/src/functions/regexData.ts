export const regex_youtube_video_id: RegExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

export const regex_twitter: RegExp = /\s*[a-zA-Z\/\/:\.]*twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
export const regex_twitter_post_status: RegExp = /status\/(\d+)/;
export const regex_twitter_post_user: RegExp = /com\/(\w*)/;

export const regex_instagram: RegExp = /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([^/?#&]+)).*/;
export const regex_instagram_post_id: RegExp = /\/(?:p|reel)\/(.*?)\//;

export const regex_image_with_HTTP: RegExp = /(https:)\/\/[^'"<>]+?\.(jpg|jpeg|gif|png)/;
export const regex_image_without_HTTP: RegExp = /.*\.(gif|jpe?g|bmp|png)$/;

export const regex_link_with_HTTP: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;
export const regex_link_without_HTTP: RegExp = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;
