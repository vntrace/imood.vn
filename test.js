var robin = require('roundrobin');
var r = robin(3);

console.log(r);


// var fs = require('fs');
// var gm = require('gm');

// // resize and remove EXIF profile data
// // gm('./image.jpg')
// // .resize(240, 240)
// // .noProfile()
// // .write('./240x240_image.jpg', function (err) {
// //   if (!err) console.log('done');
// // });

// // obtain the size of an image
// // gm('./image.jpg')
// // .size(function (err, size) {
// //   if (!err)
// //     console.log(size.width > size.height ? 'wider' : 'taller than you');
// // });

// // // output all available image properties
// // gm('./image.jpg')
// // .identify(function (err, data) {
// //   if (!err) console.log(data)
// // });

// // crazytown
// gm('./image.jpg')
// .flip()
// .magnify()
// .rotate('green', 45)
// .blur(7, 3)
// .crop(300, 300, 150, 130)
// .edge(3)
// .write('./crazy.jpg', function (err) {
//   if (!err) console.log('crazytown has arrived');
// })
