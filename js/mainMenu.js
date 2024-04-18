module.exports = function(actions, app) {
    return [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Add Item',
                    submenu: [
                        {label: "bar", click: actions.bar},
                        {label: "about", click: actions.about}
                    ]
                },
                {
                    label: 'Clear All Items'
                },
                
                {
                    label: 'Quit',
                    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        app.quit()
                    }
                }
            ]
        }
    
    ]
}