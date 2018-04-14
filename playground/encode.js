var fs = require('fs');
var yo = __dirname +'./../IMG-20170401-WA0030.jpg';
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
var val = base64_encode(yo);
let base64String = 'data:image/png;base64,'+val; // Not a real image
// Remove header
let base64Image = base64String.split(';base64,').pop();
fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
    console.log('File created');
});