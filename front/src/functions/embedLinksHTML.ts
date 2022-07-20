import { apiGetTweet } from "../services/api";

export const link = (link: string) => {
  const linkDiv = `
    <a href="${link}">${link}</a>
  `;
  return linkDiv;
};

export const YoutubeEmbed = (embedId: string) => {
  const embedVideoDiv = `
    <div className="embed_video">
      <iframe
        width=100% 
        height=100%  
        src=https://www.youtube.com/embed/${embedId} 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
        title="Embedded youtube"> 
      </iframe>
    </div>`;

  return embedVideoDiv;
};

export const Image = (imageUrl: string) => {
  const ImageDiv = `
    <div className="image">
      <img src=${imageUrl} width=75% height=75%>
    </div>`;

  return ImageDiv;
};

export const InstagramPost = (postId: string) => {
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

export const TwitterPost = async (tweetUsername: string, tweetId: string) => {
  const tweetUrl = `https://twitter.com/${tweetUsername}/status/${tweetId}`;
  const encodedtweetUrl = encodeURIComponent(tweetUrl);
  const twitterPostRequest = `https://publish.twitter.com/oembed?url=${encodedtweetUrl}`;
  const res = await apiGetTweet(twitterPostRequest);
  const tweetPostsrc = res.data;

  const twitterPosteDiv = `
    <iframe
      title="tweet by ${tweetUsername}"
      width="100%"
      height="500px"
      data-tweet-url="https://twitter.com/${tweetUsername}/status/${tweetId}"
      src="data:text/html;charset=utf-8,${tweetPostsrc}">
    </iframe>`;

  return twitterPosteDiv;
};

export const TwitterProfile = (userName: string) => {
  const twitterProfileDiv = `        
  <a className="twitter-timeline" data-height="800" href="https://twitter.com/${userName}">
      
  </a> `;

  return twitterProfileDiv;
};
