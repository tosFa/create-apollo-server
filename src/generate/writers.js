const fs = require('fs-extra');

function writeInstructions(name, outputDir) {
  console.log(`Success! Created ${name} at ${outputDir}
      Inside that directory, you can run several commands:

  yarn start
    Starts the development server.

  We suggest that you begin by typing:

    cd ${name}
    yarn start`);
}

const fileWriter = (path, content) => {
  fs.writeFile(path, content, { flag: 'wx' }, (err) => {
    if (!err) {
      console.log(`Successfully written to ${path}`);
    } else {
      console.log(`An error has occurred during file generation: ${err}`);
    }
  })
};

module.exports = {
  writeInstructions,
  fileWriter,
};