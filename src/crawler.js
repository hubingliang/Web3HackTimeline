const main = () => {
  const events = document.querySelectorAll(".timeline-description");
  const res = [];
  [...events].map((event) => {
    const title = event.querySelector("h2").innerText;
    const content = getContent(event);
    const reference = getReference(event);
    const time = getTime(event);
    const footer = event.querySelector(".entry-footer");
    const types = [...footer.querySelectorAll(".collection-row button")].map(
      (type) => {
        return type.innerText;
      }
    );
    const themeTags = footer
      .querySelector(".theme")
      .lastChild.nodeValue.split(",");
    const techTag = footer
      .querySelector(".theme")
      .lastChild.nodeValue.split(",");

    const otherTag = footer
      .querySelector(".tag-group-right")
      .querySelectorAll(".tag-list");
    let blockchainTags = [];
    let techTags = [];
    if (otherTag) {
      [...otherTag].map((tag) => {
        const string = tag.lastChild.textContent;
        if (string.includes("Blockchain: ")) {
          blockchainTags = string.split(": ")[1].split(",");
        } else {
          techTags = string.split(",");
        }
      });
    }
    // console.log("themeTag: ", themeTag);
    // console.log("title: ", title);
    console.log("content: ", content);
    // console.log("time: ", time);
    // console.log("types: ", types);
    // console.log("techTags: ", techTags);
    // console.log("blockchainTags: ", blockchainTags);
    res.push({
      title,
      content,
      themeTags,
      types,
      techTags,
      blockchainTags,
      reference,
      time,
    });
  });
  console.log(JSON.stringify(res));
  
};
const getContent = (event) => {
  return event.querySelector(".timeline-body-text-wrapper span").innerText;
};
const getTime = (event) => {
  return event.querySelector("time").innerText;
};
const getReference = (event) => {
  return [...event.querySelectorAll("ul:not(.entry-link-icons) li")].map(
    (li) => {
      const a = li.querySelector("a");
      const suffix = li.querySelector(":scope > span");
      console.log("suffix: ", suffix);
      return {
        link: a.href,
        linkTitle: a.innerText,
        suffix: suffix && suffix.innerText,
      };
    }
  );
};
