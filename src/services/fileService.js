const path = require("path");
const fs = require("fs");

exports.savePhoto = async (photo, subfolder) => {
    var route = "./public/".concat(subfolder);
    await checkDirectorySync(route);

    await photo.mv(path.join('public', route));
};

function checkDirectorySync(directory) {
    try {
        fs.statSync(directory);
    } catch(e) {
        try {
            fs.mkdirSync(directory);
        } catch(e) {
            return e;
        }
    }
}
function rand_code(chars, lon){
    var code = "";
    for (let x=0; x < lon; x++)
    {
        var rand = Math.floor(Math.random()*chars.length);
        code += chars.substr(rand, 1);
    }
    return code;
}

