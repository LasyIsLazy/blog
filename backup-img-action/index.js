const getImg = require('./get-img');
const upload = require('./upload.js');
const ora = require('ora');
const core = require('@actions/core');
const getAllMd = require('./get-all-md.js');
const DIR_PATH = './blogs';
const fs = require('fs');
const path = require('path');
(async function () {
  // Get images
  const mdPaths = getAllMd(DIR_PATH);
  const savePaths = await getImg(mdPaths);

  // Upload img-map.json
  for (let index = 0; index < savePaths.length; index++) {
    const filePath = savePaths[index];

    const fileName = path.basename(filePath);
    const spinner = ora(`Upload: ${filePath}`).start();
    try {
      const { uploadPath, sha, currentSha } = await upload(
        fs.readFileSync(filePath).toString('base64'),
        {
          Authorization: `Bearer ${core.getInput('ACCESS_TOKEN')}`,
          fileName,
        }
      );
      spinner.succeed(
        `Upload succeed: ${filePath}, upload path: ${uploadPath}`
      );
      if (sha === currentSha) {
        spinner.succeed(`Not modified: ${filePath}`);
      }
    } catch (error) {
      spinner.fail(`Upload failed: ${filePath}`);
      console.log(error);
    }
  }

  // Upload img-map.json
  const spinner = ora(`Upload: img-map.json`).start();
  try {
    const { sha, currentSha } = await upload(
      fs.readFileSync('./img-map.json').toString('base64'),
      {
        Authorization: `Bearer ${core.getInput('ACCESS_TOKEN')}`,
        fileName: 'img-map.json',
      }
    );
    if (sha === currentSha) {
      spinner.succeed(`Not modified: img-map.json`);
    } else {
      spinner.succeed(`Upload succeed: img-map.json`);
    }
  } catch (error) {
    spinner.fail(`Upload failed: img-map.json`);
  }
})();
