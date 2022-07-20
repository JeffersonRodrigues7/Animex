import { InstagramPost, TwitterPost, YoutubeEmbed, link, Image } from "./embedLinksHTML";
import { regexLinkHTTP, regexYoutube, regexImage, regexInstagram, regexTwitter, regexInstagramPostId, regexTwitterPost, regexTwitterProfile, regexYoutubeVideoId } from "./regexData";

var urlRegexLinkHTTPMatches: string[] | undefined = undefined;
var urlRegexLinkMatches: string[] = [];
var urlRegexYoutubeMatches: string[] | undefined = undefined;
var urlRegexImageMatches: string[] | undefined = undefined;
var urlRegexInstagramMatches: string[] | undefined = undefined;
var urlRegexTwitterMatches: string[] | undefined = undefined;

const urlMatches = (content: string) => {
  urlRegexLinkHTTPMatches = content.match(regexLinkHTTP)?.filter((item, index, self) => index === self.indexOf(item));
  //urlRegexLinkMatches = content.match(regexLink)?.filter((item, index, self) => index === self.indexOf(item));

  urlRegexYoutubeMatches = content.match(regexYoutube)?.filter((item, index, self) => index === self.indexOf(item));
  urlRegexImageMatches = content.match(regexImage)?.filter((item, index, self) => index === self.indexOf(item));
  urlRegexInstagramMatches = content.match(regexInstagram)?.filter((item, index, self) => index === self.indexOf(item));
  urlRegexTwitterMatches = content.match(regexTwitter)?.filter((item, index, self) => index === self.indexOf(item));

  const allRegexMatches: string[] | undefined = [...(urlRegexYoutubeMatches ?? []), ...(urlRegexImageMatches ?? []), ...(urlRegexTwitterMatches ?? []), ...(urlRegexInstagramMatches ?? [])];
  console.log(urlRegexLinkHTTPMatches, urlRegexYoutubeMatches);
  if (urlRegexLinkHTTPMatches) {
    for (const url of urlRegexLinkHTTPMatches) {
      var resultContainsLinks = allRegexMatches?.find((value) => value.includes(url));
      var resultLinksContainsOtherUrls = allRegexMatches?.find((value) => url.includes(value));
      if (!resultContainsLinks && !resultLinksContainsOtherUrls) {
        urlRegexLinkMatches.push(url);
      }
    }
  }
};

const searchLinks = (content: string) => {
  var text_content = content;

  if (urlRegexLinkMatches) {
    for (const url of urlRegexLinkMatches) {
      const linkDiv = link(url);
      text_content = text_content.replaceAll(url, linkDiv);
    }
  }

  return text_content;
};

const searchYoutubeVideo = (content: string) => {
  var text_content = content.replace(/(\r\n|\n|\r)/g, " ");

  if (urlRegexYoutubeMatches) {
    urlRegexYoutubeMatches.forEach((url: string, index: number) => {
      const videoId = regexYoutubeVideoId.exec(url);
      if (videoId) {
        const embedVideoDiv = YoutubeEmbed(videoId[1]);
        text_content = text_content.replaceAll(url, embedVideoDiv);
      }
    });
  }
  return text_content;
};

const searchImages = (content: string) => {
  var text_content = content;

  if (urlRegexImageMatches) {
    urlRegexImageMatches.forEach((url: string, index: number) => {
      const ImageDiv = Image(url);
      text_content = text_content.replaceAll(url, ImageDiv);
    });
  }

  return text_content;
};

const searchInstagramPost = (content: string) => {
  var text_content = content;

  if (urlRegexInstagramMatches) {
    urlRegexInstagramMatches.forEach((url: string, index: number) => {
      const postId = url.match(regexInstagramPostId);
      if (postId) {
        const instagramPostDiv = InstagramPost(postId[1]);
        text_content = text_content.replaceAll(url, instagramPostDiv);
      }
    });
  }

  return text_content;
};

const searchTweets = async (content: string) => {
  var text_content = content;

  if (urlRegexTwitterMatches) {
    for (const url of urlRegexTwitterMatches) {
      const postTwitter = url.match(regexTwitterPost);
      const profileNameTwitter = url.match(regexTwitterProfile);
      if (postTwitter && profileNameTwitter) {
        const PostTweetDiv = await TwitterPost(profileNameTwitter[1], postTwitter[1]);
        text_content = text_content.replaceAll(url, PostTweetDiv);
      } /*else if (profileNameTwitter) {
        const ProfileTweetDiv = TwitterProfile(profileNameTwitter[1]);
        text_content = text_content.replace(url, ProfileTweetDiv);
      }*/
    }
  }

  return text_content;
};

export const handleContent = async (content: string) => {
  urlMatches(content);
  var finalContent: string = content;
  finalContent = searchLinks(finalContent);
  finalContent = searchYoutubeVideo(finalContent);
  finalContent = searchImages(finalContent);
  finalContent = searchInstagramPost(finalContent);
  finalContent = await searchTweets(finalContent);
  return finalContent;
};
