const path = require("path");
const fs = require("fs");

exports.savePhoto = async (photo, subfolder) => {
    await checkDirectorySync("./public");
    var routeToCheck = "./public/".concat(subfolder);
    await checkDirectorySync(routeToCheck);
    var filename = getRandomFilename();
    var subroute = "/".concat(subfolder, "/", filename);

    await fs.writeFileSync(path.join('./public/', subroute), photo, 'base64');

    return "/public".concat(subroute);
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
function getRandomArbitrary() {
    const limit = 999999999;
    return Math.floor(Math.random() * limit);
}

function getRandomFilename() {
    return getRandomArbitrary().toString().concat("-").concat(getRandomArbitrary().toString())
        .concat("-").concat(getRandomArbitrary().toString()).concat(".jpg");
}

