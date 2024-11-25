  let isGeminoteActive = false;

  function handleOptionClick(option) {
    switch (option) {
      case 'summarize':
        document.body.style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
        alert("check");
        break;
      case 'note_principal_idea':
        document.body.style.cursor = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto";
        alert("check");
        break;
    }
  }


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "changePointer") {
    isGeminoteActive = true;
    document.body.style.cursor = 'url("http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur"), auto';
    sendResponse({ status: "changed" });
  }
});

document.addEventListener("mouseup", function () {
  const selectedText = window.getSelection().toString(); 

  if (selectedText && isGeminoteActive) {
    document.body.style.cursor = '';
    chrome.runtime.sendMessage({ action: "sendSelectedText", text: selectedText });
  }
});
