window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }
    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }

    // for(const dependency of ['electron', 'node', 'v8']) {
    //     replaceText(`${dependency}-version`, process.versions[dependency])
    // }

})