import { InstagramPostEmbed, TwitterPostEmbed, YoutubeVideoEmbed, LinkWithHTTPEmbed, LinkWithoutHTTPEmbed, ImageWithHTTPEmbed, ImageWithoutHTTPEmbed } from "./embedLinksHTML";
import { regexLinkWithHTTP, regexLinkWithoutHTTP, regexImageWithHTTP, regexImageWithoutHTTP, regexInstagram, regexTwitter, regexInstagramPostId, regexTwitterPostStatus, regexTwitterPostUser, regexYoutubeVideoId } from "./regexData";

const urlMatches = async (content: string) => {
  var contentArray: string[] = content.split(" ");

  for (var i = 0; i < contentArray.length; i++) {
    const youtubeVideoResult = contentArray[i].match(regexYoutubeVideoId);
    if (youtubeVideoResult) {
      contentArray[i] = YoutubeVideoEmbed(youtubeVideoResult[1]);
      continue;
    }

    const twitterResult = contentArray[i].match(regexTwitter);
    if (twitterResult) {
      const TwitterPostStatus = contentArray[i].match(regexTwitterPostStatus);
      const TwitterPostUser = contentArray[i].match(regexTwitterPostUser);
      if (TwitterPostStatus && TwitterPostUser) {
        contentArray[i] = await TwitterPostEmbed(TwitterPostUser[1], TwitterPostStatus[1]);
        continue;
      }
    }

    const instagramResult = contentArray[i].match(regexInstagram);
    if (instagramResult) {
      const instagramPostResult = contentArray[i].match(regexInstagramPostId);
      if (instagramPostResult) {
        contentArray[i] = InstagramPostEmbed(instagramPostResult[1]);
        continue;
      }
    }

    const ImageWithHTTPResult = contentArray[i].match(regexImageWithHTTP);
    if (ImageWithHTTPResult) {
      contentArray[i] = ImageWithHTTPEmbed(ImageWithHTTPResult[0]);
      continue;
    }

    const ImageWithoutHTTPResult = contentArray[i].match(regexImageWithoutHTTP);
    if (ImageWithoutHTTPResult) {
      contentArray[i] = ImageWithoutHTTPEmbed(ImageWithoutHTTPResult[0]);
      continue;
    }

    const linkWithHTTPResult = contentArray[i].match(regexLinkWithHTTP);
    if (linkWithHTTPResult) {
      contentArray[i] = LinkWithHTTPEmbed(linkWithHTTPResult[0]);
      continue;
    }

    const linkWithouthHTTPResult = contentArray[i].match(regexLinkWithoutHTTP);
    if (linkWithouthHTTPResult) {
      contentArray[i] = LinkWithoutHTTPEmbed(linkWithouthHTTPResult[0]);
      continue;
    }
  }

  const finalContent = contentArray.join(" ");

  return finalContent;
};

const initialChanges = (content: string) => {
  var text_content = content;
  text_content = text_content
    .replaceAll('<p style="text-align:start;"></p>', "")
    .replaceAll('<p style="text-align:left;"><br></p>', "")
    .replaceAll('<p style="text-align:left;"></p>', "")
    .replaceAll('<p style="text-align:left;">&nbsp;</p>', "")
    .replaceAll("><br><", "> <")
    .replaceAll('">', '"> ')
    .replaceAll("</", " </")
    .replaceAll("<p>", "<p> ")
    .replaceAll("</p>", " </p>")
    .replaceAll("<p>  </p>", "")
    .replaceAll("<p> </p>", "")
    .replaceAll("<p></p>", "")
    .replace(/(\r\n|\n|\r)/g, " ");

  return text_content;
};

export const handleContent = async (content: string) => {
  //console.log(content);
  var finalContent: string = content;
  finalContent = initialChanges(finalContent);
  //console.log(finalContent);
  finalContent = await urlMatches(finalContent);
  return finalContent;
};
