// run in context of tab

console.log("text is: ", window.getSelection().toString());

chrome.runtime.sendMessage(
    // string extensionId,
    {
        // text: selected_text || 'nada'
        text: window.getSelection().toString() || 'nada'        
    }
    // object options,
    // function responseCallback
)
