import { setupMageryHandlers } from './spells/magery.js';

document.addEventListener('DOMContentLoaded', () => {
  const schoolSelect = document.getElementById('school');

  function loadSchoolModule() {
    const school = schoolSelect.value;
    if (school === 'magery') {
      setupMageryHandlers();
    }
  }

  schoolSelect.addEventListener('change', loadSchoolModule);
  loadSchoolModule(); // musi się wykonać po załadowaniu
});
