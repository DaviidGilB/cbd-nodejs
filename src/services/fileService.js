const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;

exports.savePhoto = async (photo, subfolder) => {
    await checkDirectorySync("./public");
    var routeToCheck = "./public/".concat(subfolder);
    await checkDirectorySync(routeToCheck);
    var filename = getRandomFilename();
    var subroute = "/".concat(subfolder, "/", filename);

    await fs.writeFileSync(path.join('./public/', subroute), photo, 'base64');

    var url = '';
    await cloudinary.uploader.upload(path.join('./public/', subroute), {},
        function (error, result) {
            if (result !== undefined && result != null) {
                url = result.secure_url;
            }
        });

    deletePhoto(path.join('./public/', subroute));

    return url;
};

async function deletePhoto(route) {
    await fs.unlink(route, (err) => {
        if (err) throw err;
    });
}

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

