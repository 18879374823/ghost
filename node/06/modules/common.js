const tools = {};
tools.setFileType = function(type) {
    switch(type) {
        case '.html':
            return 'html';
        case '.css':
            return 'css';
        default:
            return 'html';
    }
}

module.exports = tools;