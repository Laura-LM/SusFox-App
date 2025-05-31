const { exec } = require('child_process');

function getNetstat() {
  return new Promise((resolve, reject) => {
    exec('netstat -natp | grep ESTABLISHED', (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
}

module.exports = { getNetstat };