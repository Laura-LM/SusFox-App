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

// const { exec } = require('child_process');
// const util = require('util');
// const os = require('os');
// const execAsync = util.promisify(exec);

// async function getNetstat() {
//   const platform = os.platform();

//   try {
//     if (platform === 'win32') {
//       // Windows: netstat and process details via PowerShell
//       const { stdout } = await execAsync('netstat -nao | findstr ESTABLISHED');
//       const lines = stdout.trim().split('\n').filter(line => line.trim() !== '');

//       const results = await Promise.all(lines.map(async (line) => {
//         // The PID is the last column
//         const parts = line.trim().split(/\s+/);
//         const pid = parts[parts.length - 1];
//         try {
//           // Get process details using PowerShell
//           const { stdout: procOut } = await execAsync(`powershell -Command "Get-Process -Id ${pid} | Select-Object Path, StartTime, ProcessName | Format-List"`);
//           return `Connection: ${line}\nDetails:\n${procOut.trim()}\n`;
//         } catch {
//           return `Connection: ${line}\n  [Could not retrieve information for process PID ${pid}]\n`;
//         }
//       }));

//       return results.join('\n');
//     } else if (platform === 'darwin' || platform === 'linux') {
//       // macOS and Linux: ss/netstat and process details using ps
//       // ss may not be available on macOS, so fallback to netstat if needed
//       let stdout;
//       try {
//         ({ stdout } = await execAsync('ss -tunap | grep ESTAB'));
//       } catch {
//         // If ss fails (e.g., on macOS), try with netstat
//         ({ stdout } = await execAsync('netstat -natp | grep ESTABLISHED'));
//       }
//       const lines = stdout.trim().split('\n').filter(line => line.trim() !== '');

//       const results = await Promise.all(lines.map(async (line) => {
//         // Look for PID in the line (pid=XXXX or at the end)
//         let pidMatch = line.match(/pid=(\d+)/);
//         if (!pidMatch) {
//           // netstat format: ... PID/ProcessName
//           pidMatch = line.match(/(\d+)\/[^\s]+$/);
//         }
//         if (pidMatch && pidMatch[1]) {
//           const pid = pidMatch[1];
//           try {
//             const { stdout: procOut } = await execAsync(`ps -p ${pid} -o pid=,user=,lstart=,cmd=`);
//             const exePath = await execAsync(`readlink -f /proc/${pid}/exe`).then(res => res.stdout.trim()).catch(() => 'N/A');
//             return (
//               `Connection: ${line}\n` +
//               `Process details:\n  ${procOut.trim()}\n  Executable path: ${exePath}\n`
//             );
//           } catch {
//             return `Connection: ${line}\n  [Could not retrieve information for process PID ${pid}]\n`;
//           }
//         } else {
//           return `Connection: ${line}\n  [PID not found]\n`;
//         }
//       }));

//       return results.join('\n');
//     } else {
//       return 'Unsupported operating system.';
//     }
//   } catch (err) {
//     return `[Error]: ${err.stderr || err.message}`;
//   }
// }

// module.exports = { getNetstat };