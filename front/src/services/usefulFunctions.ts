export const formatedData = (date: string): string => {
  var finalDate = "";
  var dateNow = new Date();
  var lastUpdated = new Date(date);
  var duration = dateNow.valueOf() - lastUpdated.valueOf();

  const days = Math.floor(duration / (24 * 60 * 60 * 1000));
  const daysms = duration % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = duration % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = duration % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);

  if (days > 0) {
    finalDate = days + " dias atrás";
  } else if (hours > 0) {
    finalDate = hours + " horas atrás";
  } else if (minutes > 0) {
    finalDate = minutes + " minutos atrás";
  } else {
    finalDate = sec + " segundos atrás";
  }

  return finalDate;
};

const YoutubeEmbed = (embedId: string) => {
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

const Image = (imageUrl: string) => {
  const ImageDiv = `
    <div className="image">
      <img src=${imageUrl} width=75% height=75%>
    </div>`;

  return ImageDiv;
};

const searchYoutubeVideo = (content: string) => {
  const regex: RegExp = /\s*[a-zA-Z\/\/:\.]*youtu(be.com\/watch\?v=|.be\/)([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/gi;
  const regexVideoId: RegExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  var text_content = content.replace(/(\r\n|\n|\r)/g, " ");

  const urlMatches = text_content.match(regex);
  if (urlMatches) {
    urlMatches.forEach((url: string, index: number) => {
      const videoId = regexVideoId.exec(url);
      if (videoId) {
        const embedVideoDiv = YoutubeEmbed(videoId[1]);
        text_content = text_content.replace(url, embedVideoDiv);
      }
    });
  }
  return text_content;
};

const searchImages = (content: string) => {
  const regex: RegExp = /\b(https?:\/\/\S+(?:png|jpe?g|gif))\b/gi;

  var text_content = content;
  const urlMatches = text_content.match(regex);

  if (urlMatches) {
    urlMatches.forEach((url: string, index: number) => {
      const ImageDiv = Image(url);
      text_content = text_content.replace(url, ImageDiv);
    });
  }

  return text_content;
};

export const handleContent = (content: string) => {
  var finalContent: string = content;
  finalContent = searchYoutubeVideo(content);
  finalContent = searchImages(finalContent);
  return finalContent;
};
