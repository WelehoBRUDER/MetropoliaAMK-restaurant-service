import english from "./english.js";
import finnish from "./finnish.js";

const language = localStorage.getItem("lang") || "fi";

const translateDocument = (root = document.body) => {
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
      if (!finnish[key] && !english[key]) {
        keys += key + ":'',\n";
      }
      return translateText(key);
    });
  }
  console.log("Missing keys:\n", keys);
};

const getLanguage = () => {
  switch (language) {
    case "en":
      return english;
    case "fi":
      return finnish;
    default:
      return english;
  }
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
      console.log(mutation);
      if (mutation.type === "characterData") {
        console.log("MUTATED", mutation.target);
        translateDocument(mutation.target.parentNode);
      }
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 3) {
            // New text node added
            translateDocument(node.parentNode);
          } else if (node.nodeType === 1) {
            // element
            console.log("ADDED", node);
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
