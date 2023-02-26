window.onload = function() {
    MaskedInput({
        elm: document.getElementById('phone'), // select only by id
        format: '(___) ___-__-__',
        separator: '(   )-'
    });
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    console.log(1)
    form.addEventListener('submit', formSend);

    function formSend(event) {
        event.preventDefault();
        let formData = new FormData(this);
        return fetch('../php/sendForm.php', {
            method: 'POST',
            body: formData
        });
    }
})
