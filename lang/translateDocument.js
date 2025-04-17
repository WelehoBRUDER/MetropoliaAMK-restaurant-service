import {getLanguage} from "./lang.js";

const translateDocument = (root = document.body) => {
  if (!root) return;
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Skip empty text nodes
        if (
          node.textContent.includes("{") &&
          !node.textContent.includes("WebSocket")
        ) {
          return NodeFilter.FILTER_ACCEPT;
        } else {
          return NodeFilter.FILTER_SKIP;
        }
      },
    },
    false
  );

  let node;
  const regex = /\{([^}]+)\}/g;

  let keys = "";
  while ((node = walker.nextNode())) {
    node.textContent = node.textContent.replace(regex, (match, key) => {
      if (!getLanguage()[key]) {
        keys += key + ":'',\n";
      }
      return translateText(key);
    });
  }
  /* DEBUG LINE */
  //console.log("Missing keys:\n", keys);
};

const translateText = (text) => {
  const lang = getLanguage();
  const translation = lang[text.trim()];
  if (translation) {
    return translation;
  } else {
    return text;
  }
};
const startTranslatingDocument = () => {
  // Initial run after full page load
  translateDocument();

  // Watch for future DOM changes (for dynamic content)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        translateDocument(mutation.target.parentNode);
      }
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 3) {
            // New text node added
            translateDocument(node.parentNode);
          } else if (node.nodeType === 1) {
            // element
            translateDocument(node);
          }
        });
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true, // optional, for debugging
  });
};

export default startTranslatingDocument;
