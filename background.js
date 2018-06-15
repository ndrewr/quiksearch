/*
    Set keyboard event listener to open a new tab with Google search results
*/

function spawnSearchTab(query) {
    chrome.tabs.create(
        {
            active: true,
            url: `https://www.google.com/search?q=${query}`
        }
    )
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'search') {
    const search_script = `chrome.runtime.sendMessage(
        {
            type: 'search',
            text: window.getSelection().toString() || ''        
        }
    )`

    chrome.tabs.executeScript(
        {
            code: search_script
            // file: 'contentscript.js'
        }
    )
  }
  // TODO: handle other shortcuts
});

chrome.runtime.onMessage.addListener(
    function(message) {
        if (message.type === "search" && message.text) {
            spawnSearchTab(message.text)
        }
    }
)
