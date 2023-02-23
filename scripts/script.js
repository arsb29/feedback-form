window.onload = function() {
    MaskedInput({
        elm: document.getElementById('phone'), // select only by id
        format: '(___) ___-__-__',
        separator: '(   )-'
    });
};