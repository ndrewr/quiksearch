// Setup keyboard event listener

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
        },
        // _=>{ console.log('uhoh', chrome.runtime.lastError) }
    )
  }
  // TODO: handle other shortcuts?
});

chrome.runtime.onMessage.addListener(
    function(message, callback) {
        // console.log('heres what we got...', message)
        if (message.type === "search") {
            if (message.text) spawnSearchTab(message.text)
        }
        else if (message.type === "other") console.log('Do other!')
    }
)
