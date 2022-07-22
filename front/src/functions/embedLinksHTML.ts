import { apiGetTweet } from "../services/api";

export const YoutubeVideoEmbed = (embedId: string) => {
  const embedVideoDiv = `
      <iframe
        width=100% 
        height=100%  
        src=https://www.youtube.com/embed/${embedId} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
        title="Embedded youtube"> 
      </iframe>
    `;

  return embedVideoDiv;
};

export const TwitterPostEmbed = async (tweetUsername: string, tweetId: string) => {
  const tweetUrl = `https://twitter.com/${tweetUsername}/status/${tweetId}`;
  const encodedtweetUrl = encodeURIComponent(tweetUrl);
  const twitterPostRequest = `https://publish.twitter.com/oembed?url=${encodedtweetUrl}`;
  const res = await apiGetTweet(twitterPostRequest);
  const tweetPostsrc = res.data;

  const twitterPosteDiv = `
    <iframe
      title="tweet by ${tweetUsername}"
      width="100%"
      height="425px"
      data-tweet-url="https://twitter.com/${tweetUsername}/status/${tweetId}"
      src="data:text/html;charset=utf-8,${tweetPostsrc}">
    </iframe>`;

  return twitterPosteDiv;
};

export const InstagramPostEmbed = (postId: string) => {
  const instagramPostDiv = `
    <iframe 
      width="300" 
      height="550"
      src="https://www.instagram.com/p/${postId}/embed" 
      frameborder="0" 
      scrolling="no" 
      allowtransparency="true">
    </iframe>`;

  return instagramPostDiv;
};

export const ImageWithHTTPEmbed = (imageUrl: string) => {
  const ImageDiv = `
      <img src=${imageUrl} >
    `;

  return ImageDiv;
};

export const ImageWithoutHTTPEmbed = (imageUrl: string) => {
  const ImageDiv = `
      <img src=https://${imageUrl} ">
  `;

  return ImageDiv;
};

export const LinkWithHTTPEmbed = (link: string) => {
  const linkDiv = `
    <a href="${link}">${link}</a>
  `;
  return linkDiv;
};

export const LinkWithoutHTTPEmbed = (link: string) => {
  const linkDiv = `
    <a href="https://${link}">${link}</a>
  `;
  return linkDiv;
};
