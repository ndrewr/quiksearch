// Setup keyboard event listener

function spawnTab(query) {
    chrome.tabs.create(
        {
            active: true,
            url: `https://www.google.com/search?q=${query}`
        }
    )
}

chrome.commands.onCommand.addListener(function(command) {
  if (command == "search") {
    const query = window.getSelection().toString() // doesnt work; wrong window context
    // chrome.tabs.create(
    //   {
    //       active: false,
    //       url: 'http://www.yahoo.com?q='+query
    // }
    // );
    // spawnTab(query)

    // chrome.extension.getBackgroundPage().console.log(
    //     'foo',
    //     ' reading ',
    //     window.getSelection().toString(), 
    //     ' document... ',
    //     chrome.tabs.getCurrent(function(tab) {
    //         console.log('tab...', tab)
    //     })
    // );

    // Get the currently selected tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var current = tabs[0]
        console.log('hi', current)
    //   chrome.tabs.update(current.id, {'pinned': !current.pinned});
        chrome.tabs.executeScript(
            // current.id,
            {
                // code: 'console.log("this is the window", window, " and text is: ", window.getSelection().toString());'
                file: 'contentscript.js'
            },
            _=>{ console.log('uhoh', chrome.runtime.lastError) }
        )
   });
  }
});

chrome.runtime.onMessage.addListener(
    function(message, callback) {
        console.log('message received!')
        console.log('heres what we got...', message)
        // if (message == "search") {
            // chrome.tabs.executeScript({
            //     code: 'document.body.style.backgroundColor="orange"'
            // });
        // }
        spawnTab(message.text)
    }
)
