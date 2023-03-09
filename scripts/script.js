
document.addEventListener('DOMContentLoaded', function () {
    addProducts();

    choices();

    maskedPhone();

    const form = document.querySelector('form');
    form.addEventListener('submit', formSend);
})

const PRODUCTS = [
    'Кредит наличными',
    'Кредитная карта',
    'Карта для пенсионеров',
    'Зарплатная карта',
    'Счёт или вклад',
    'Ипотека',
    'Карта «Армия России»',
    'Карта Петербуржца',
    'Автокредит',
    'Я ещё подумаю'
];

function addProducts() {
    const listOfProducts = document.querySelector('.list-items');
    const result = PRODUCTS.reduce((res, product) => res +`
        <li class="item">
            <span class="checkbox"></span>
            <span class="item-text">${product}</span>
        </li>
    `, '');
    listOfProducts.innerHTML = result;
}

function formSend(event) {
    event.preventDefault();
    let formData = new FormData(this);
    const error = document.querySelector('#error');
    const checked = document.querySelectorAll(".checked")
    if (!checked.length) {
        error.textContent = 'Выберите продукт';
        window.scrollTo(0, document.body.scrollHeight);
        return null;
    }
    if (!formData.get('mark')) {
        error.textContent = 'Выберите оценку';
        window.scrollTo(0, document.body.scrollHeight);
        return null;
    }
    error.textContent = '';
    const products = Array.from(checked).map(element => (
        element.querySelector('.item-text').textContent)
    ).join(', ');
    formData.append('products', products);
    const date = getDate();
    formData.append('date', date);
    const button = document.querySelector('#submitButton');
    button.textContent = 'Загрузка...';
    button.disabled = true;
    return fetch('../php/sendForm.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            if (!res.result) {
                throw new Error();
            } else {
                document.location.assign('../success.html');
            }
        })
        .catch(() => {
            error.textContent = 'Произошла ошибка, попробуйте позже';
            window.scrollTo(0, document.body.scrollHeight);
        })
        .finally(() => {
            button.textContent = 'Отправить';
            button.disabled = false;
        });
}

function maskedPhone() {
    const element = document.getElementById('phone');
    const maskOptions = {
        mask: '(000) 000-00-00'
    };
    IMask(element, maskOptions);
}

function choices() {
    const selectBtn = document.querySelector(".select-btn"),
        items = document.querySelectorAll(".item");

    selectBtn.addEventListener("click", () => {
        selectBtn.classList.toggle("open");
    });

    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");

            let checked = document.querySelectorAll(".checked"),
                btnText = document.querySelector(".btn-text");

            if(checked && checked.length > 0){
                btnText.innerText = prettyProducts(checked.length);
            }else{
                btnText.innerText = "Заинтересовавшие продукты";
            }
        });
    })

}

function prettyProducts(number) {
    if (number === 1) return 'Выбран 1 продукт';
    if (number < 5) return `Выбрано ${number} продукта`;
    return `Выбрано ${number} продуктов`;
}

function getDate() {
    const nowDate = new Date();
    return nowDate.toISOString().slice(0,10);
}