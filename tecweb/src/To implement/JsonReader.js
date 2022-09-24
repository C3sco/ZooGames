function loadJSON(filename = '') {
    const fs = require('fs');
    return JSON.parse(filename)
     /*   fs.existsSync(filename)
            ? fs.readFileSync(filename).toString()
            : '""'
    )*/
}