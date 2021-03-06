var glob = require( 'glob' );  
var fs = require('fs');
var UglifyJS = require("uglify-js");
var uuid = require('uuid/v1');
var replace = require("replace");

var options = {
    "toplevel": true,
    "mangle": false,
    "compress": { "passes": 2 }
};

var outputFilename = 'ubiq-explorer.'+uuid()+'.js';

glob('ubiq-explorer.*.js', function(err, files) {
    console.log("Removing old minified javascript files");
    if(err) {
        console.log("ERROR:", err)
    } else {
        files.forEach(function(file) {
            console.log("Removing ", file)
            fs.unlinkSync(file)
        });
    }
});

glob( '*.js', { cwd: "./scripts", matchBase:true }, function( err, files ) {
  console.log("Minifying Javascript to " + outputFilename);
  if(err) {
      console.log("ERROR:", err)
  } else {
    var js = {};
    js["app.js"] = fs.readFileSync("app.js", "utf8");
    files.forEach(function(file) {
        console.log("Loading ", file);
        js["./scripts/"+file] = fs.readFileSync("./scripts/"+file, "utf8");
    });
    console.log("Done reading JS files");
    fs.writeFileSync(outputFilename, UglifyJS.minify(js, options).code, "utf8");
    var replaced = replace({
        regex: '.*<!--ubiq-explorer-js-->',
        replacement: '<script src="'+outputFilename+'"></script><!--ubiq-explorer-js-->',
        paths: ['index.html'],
        recursive: false,
        silent: true
    });
    console.log("Done")
  }
});


