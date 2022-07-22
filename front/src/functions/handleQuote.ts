const handleInnerHTML = (content: string) => {
  let finalContent = content;
  finalContent = finalContent.replaceAll(' src="https://', " https://").replaceAll('" frameborder', " ").replaceAll(' data-tweet-url="https://', " https://").replaceAll('" src="data:', " ").replaceAll('">', "");

  var contentArray: string[] = finalContent.split(" ");
  for (let i = 0; i < contentArray.length; i++) {
    if (contentArray[i].startsWith("https://")) {
      finalContent = contentArray[i];
      break;
    }
  }

  return finalContent;
};

export const handleContent = (content: HTMLCollection) => {
  let textContentArray: string[] = [];
  for (let i = 0; i < content.length; i++) {
    let textContent = content[i] as HTMLElement;
    if (textContent.innerText === "") {
      textContentArray.push(handleInnerHTML(textContent.innerHTML));
    } else {
      textContentArray.push(textContent.innerText);
    }
  }

  const finalContent = textContentArray.join("\r\n");
  return finalContent;
};
