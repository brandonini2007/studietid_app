document.addEventListener('DOMContentLoaded', () => {
    const studyForm = document.getElementById('study-form');
    const registrationList = document.getElementById('registration-list');

    fetch('/studietider')
        .then(response => response.json())
        .then(data => {
            data.forEach(reg => {
                const li = document.createElement('li');
                li.textContent = `ID: ${reg.studietid_id}, Bruker: ${reg.bruker_id}, Fag: ${reg.fag_id}, Rom: ${reg.rom_id}, Dato: ${reg.registreringsdato}, Status: ${reg.status}`;
                registrationList.appendChild(li);
            });
        });

    studyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const bruker_id = document.getElementById('bruker_id').value;
        const fag_id = document.getElementById('fag_id').value;
        const rom_id = document.getElementById('rom_id').value;

        fetch('/registrer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bruker_id, fag_id, rom_id })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const li = document.createElement('li');
            li.textContent = `Ny registrering: ID: ${data.id}, Bruker: ${bruker_id}, Fag: ${fag_id}, Rom: ${rom_id}`;
            registrationList.appendChild(li);
        });
    });
});