document.querySelector('.updates-btn').addEventListener('click', function() {
    const dropdown = document.querySelector('.updates-dropdown');
    const btn = this;
    const dropdownText = btn.querySelector('.dropdown-text');
    
    dropdown.classList.toggle('show');
    btn.classList.toggle('active');
    
    if (dropdown.classList.contains('show')) {
        dropdownText.textContent = 'Hide';
    } else {
        dropdownText.textContent = 'Show';
    }
});