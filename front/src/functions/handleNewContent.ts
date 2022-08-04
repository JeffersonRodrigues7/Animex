import { embedInstagramPost, embedTwitterPost, embedYoutubeVideo, embedLinkWithHTTP, embedLinkWithoutHTTP, embedImageWithHTTP, embedImageWithoutHTTP } from "./embedLinksHTML";
import {
  regex_link_with_HTTP,
  regex_link_without_HTTP,
  regex_image_with_HTTP,
  regex_image_without_HTTP,
  regex_instagram,
  regex_twitter,
  regex_instagram_post_id,
  regex_twitter_post_status,
  regex_twitter_post_user,
  regex_youtube_video_id,
} from "./regexData";

const urlMatches = async (content: string): Promise<string> => {
  var content_array: string[] = content.split(" ");

  for (var i = 0; i < content_array.length; i++) {
    const youtube_video_result: RegExpMatchArray | null = content_array[i].match(regex_youtube_video_id);
    if (youtube_video_result) {
      content_array[i] = embedYoutubeVideo(youtube_video_result[1]);
      continue;
    }

    const twitter_result = content_array[i].match(regex_twitter);
    if (twitter_result) {
      const twitter_post_status: RegExpMatchArray | null = content_array[i].match(regex_twitter_post_status);
      const twitter_post_user: RegExpMatchArray | null = content_array[i].match(regex_twitter_post_user);
      if (twitter_post_status && twitter_post_user) {
        content_array[i] = await embedTwitterPost(twitter_post_user[1], twitter_post_status[1]);
        continue;
      }
    }

    const instagram_result: RegExpMatchArray | null = content_array[i].match(regex_instagram);
    if (instagram_result) {
      const instagram_post_result: RegExpMatchArray | null = content_array[i].match(regex_instagram_post_id);
      if (instagram_post_result) {
        content_array[i] = embedInstagramPost(instagram_post_result[1]);
        continue;
      }
    }

    const Image_with_HTTP_result: RegExpMatchArray | null = content_array[i].match(regex_image_with_HTTP);
    if (Image_with_HTTP_result) {
      content_array[i] = embedImageWithHTTP(Image_with_HTTP_result[0]);
      continue;
    }

    const Image_withouth_HTTP_result: RegExpMatchArray | null = content_array[i].match(regex_image_without_HTTP);
    if (Image_withouth_HTTP_result) {
      content_array[i] = embedImageWithoutHTTP(Image_withouth_HTTP_result[0]);
      continue;
    }

    const link_with_HTTP_result: RegExpMatchArray | null = content_array[i].match(regex_link_with_HTTP);
    if (link_with_HTTP_result) {
      content_array[i] = embedLinkWithHTTP(link_with_HTTP_result[0]);
      continue;
    }

    const link_withouth_HTTP_result: RegExpMatchArray | null = content_array[i].match(regex_link_without_HTTP);
    if (link_withouth_HTTP_result) {
      content_array[i] = embedLinkWithoutHTTP(link_withouth_HTTP_result[0]);
      continue;
    }
  }

  const final_content: string = content_array.join(" ");

  return final_content;
};

const initialChanges = (content: string): string => {
  var text_content: string = content;
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

export const handleContent = async (content: string): Promise<string> => {
  var final_content: string = content;
  final_content = initialChanges(final_content);
  final_content = await urlMatches(final_content);
  return final_content;
};
