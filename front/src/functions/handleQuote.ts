const handleInnerHTML = (content: string): string => {
  let final_content: string = content;
  final_content = final_content.replaceAll(' src="https://', " https://").replaceAll('" frameborder', " ").replaceAll(' data-tweet-url="https://', " https://").replaceAll('" src="data:', " ").replaceAll('">', "");

  var content_array: string[] = final_content.split(" ");
  for (let i = 0; i < content_array.length; i++) {
    if (content_array[i].startsWith("https://")) {
      final_content = content_array[i];
      break;
    }
  }

  return final_content;
};

export const handleContent = (content: HTMLCollection): string => {
  let text_content_array: string[] = [];
  for (let i = 0; i < content.length; i++) {
    let text_content: HTMLElement = content[i] as HTMLElement;
    if (text_content.innerText === "") {
      text_content_array.push(handleInnerHTML(text_content.innerHTML));
    } else {
      text_content_array.push(text_content.innerText);
    }
  }

  const final_content: string = text_content_array.join("\r\n");
  return final_content;
};
