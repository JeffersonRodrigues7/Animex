import { AxiosResponse } from "axios";
import { apiGetTweet } from "../services/api";

interface GetTweetInterface {
  data: string;
}

export const embedYoutubeVideo = (video_id: string): string => {
  const embed_video_iframe: string = `
      <iframe
        width=100% 
        height=100%  
        src=https://www.youtube.com/embed/${video_id} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
        title="Embedded youtube"> 
      </iframe>
    `;

  return embed_video_iframe;
};

export const embedTwitterPost = async (username: string, id: string): Promise<string> => {
  const url: string = `https://twitter.com/${username}/status/${id}`;
  const encoded_url: string = encodeURIComponent(url);
  const tweet_request: string = `https://publish.twitter.com/oembed?url=${encoded_url}`;
  try {
    const res_get_tweet: AxiosResponse = await apiGetTweet(tweet_request);
    const { data } = res_get_tweet;
    const embed_tweet_iframe: string = `
      <iframe
        title="tweet by ${username}"
        width="100%"
        height="425px"
        data-tweet-url="https://twitter.com/${username}/status/${id}"
        src="data:text/html;charset=utf-8,${data}">
      </iframe>`;

    return embed_tweet_iframe;
  } catch (error: any) {
    console.error(`Error embedding twitter status with id ${id}: `, error);
    return `
    <div> Erro ao incorporar status do twitter com id ${id}: ${error} </div>
    `;
  }
};

export const embedInstagramPost = (id: string): string => {
  const embed_post_iframe: string = `
    <iframe 
      width="300" 
      height="550"
      src="https://www.instagram.com/p/${id}/embed" 
      frameborder="0" 
      scrolling="no" 
      allowtransparency="true">
    </iframe>`;

  return embed_post_iframe;
};

export const embedImageWithHTTP = (url: string): string => {
  const embed_image_img: string = `
      <img src=${url} >
    `;

  return embed_image_img;
};

export const embedImageWithoutHTTP = (url: string): string => {
  const embed_image_img: string = `
      <img src=https://${url} ">
  `;

  return embed_image_img;
};

export const embedLinkWithHTTP = (link: string): string => {
  const embed_link_a: string = `
    <a href="${link}">${link}</a>
  `;
  return embed_link_a;
};

export const embedLinkWithoutHTTP = (link: string): string => {
  const embed_link_a: string = `
    <a href="https://${link}">${link}</a>
  `;
  return embed_link_a;
};
