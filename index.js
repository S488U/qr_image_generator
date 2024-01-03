import inquirer from "inquirer";
import fs, { createWriteStream } from "fs";
import qr, { image } from "qr-image";

inquirer.prompt([
    {
        type : "input",
        name : "answer",
        message : "Hello, Enter the full URL please: "
    }
]).then((answers) => {

    fs.writeFile("URL.txt", answers.answer, (err) => {
        if(err) throw err;
        fs.readFile("URL.txt", "UTF-8", (e, data) => {
            if(e) {
                console.log("Read error");
            } else {
                var qr_png = qr.image(data, {type: "png"});
                qr_png.pipe(createWriteStream("qr_img.png"));
                var png_string = qr.imageSync('data', { type: 'png' });
                fs.writeFile("qr_img.png", png_string, (err) => {
                    if(err) throw err;
                    console.log("Image Stored");
                });
            }
        })
    });

}).catch((error) => {
    if(error.isTtyError) {
        console.log("Error occurred due to the function");
    } else {
        console.log("Error occurred by something else.");
    }
});



