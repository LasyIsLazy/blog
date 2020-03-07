const fs = require('fs');
const commonMark = require('commonmark');
const axios = require('axios');
const ora = require('ora');
const path = require('path');

const getAllImg = markdown => {
  if (!markdown) return [];
  let parsed = new commonMark.Parser().parse(markdown);
  let walker = parsed.walker();
  let event;
  let nodeList = [];
  while ((event = walker.next())) {
    let node = event.node;
    if (node.type === 'image' && node.destination) {
      nodeList.push(node);
    }
  }
  const srcList = nodeList.map(node => node.destination);
  const uniqueSrcList = [...new Set(srcList)];

  return uniqueSrcList;
};

async function getImg(files = []) {
  const savePaths = [];
  if (!fs.existsSync('./img')) {
    fs.mkdirSync('./img');
  }

  const imgMap = {};
  const jobs = [];
  files.forEach(filePath => {
    const text = fs.readFileSync(filePath, { encoding: 'utf8' });
    const srcList = getAllImg(text);
    imgMap[path.basename(filePath)] = srcList;
    console.log(`${srcList.length + 1} images in '${filePath}' `);
    srcList.forEach(url => {
      jobs.push(() => {
        const spinner = ora(`Download ${url}`).start();
        return axios({
          method: 'get',
          url,
          timeout: 30000,
          responseType: 'stream',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.19 Safari/537.36'
          }
        })
          .then(function(response) {
            const savePath = path.join('./img/', encodeURIComponent(url));
            response.data.pipe(fs.createWriteStream(savePath));
            savePaths.push(savePath);
            spinner.succeed(`Dowloaded ${url} into ${path.resolve(savePath)}`);
          })
          .catch(err => {
            spinner.fail(`Dowloaded fail: ${url}`);
          });
      });
    });
  });

  console.log('Start download');
  for (const key in jobs) {
    if (jobs.hasOwnProperty(key)) {
      const job = jobs[key];
      await job();
    }
  }
  console.log('Download finished');

  console.log('Generate map', imgMap);
  fs.writeFileSync('./img-map.json', JSON.stringify(imgMap));

  return savePaths;
}

module.exports = getImg;
