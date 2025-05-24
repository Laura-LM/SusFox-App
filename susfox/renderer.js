// async function fetchConnections() {
//   const result = await window.electronAPI.getConnections();
//   document.getElementById('output').textContent = result;
// }

async function fetchConnections() {
  document.getElementById('output').textContent = '[cargando datos...]';
  const result = await window.electronAPI.getConnections();
  document.getElementById('output').textContent = result;
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fetchBtn').addEventListener('click', fetchConnections);
  document.getElementById('refreshBtn').addEventListener('click', fetchConnections);
});