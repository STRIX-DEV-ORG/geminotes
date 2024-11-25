
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "sendSelectedText") {
    const selectedText = message.text;
    // perform ia
  }
});
