const path = require("path");
const fs = require("fs");

exports.savePhoto = async (photo, subfolder) => {
    var routeToCheck = "./public/".concat(subfolder);
    await checkDirectorySync(routeToCheck);

    var filename = photo.name;
    const array = filename.split(".");

    const extension = array.pop();
    if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        return "";
    }

    var name = "";
    var i = 0;
    while(i < array.length) {
        name = name.concat(array[i]);
        i = i + 1;
    }

    name = rand_code(name, 20);
    name = name.concat(".", extension);

    var route = "/".concat(subfolder, "/", name);

    await photo.mv(path.join('./public/', route));
    return "/public".concat(route);
};

exports.deletePhoto = async (route) => {
    await fs.unlink('.'.concat(route));
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

