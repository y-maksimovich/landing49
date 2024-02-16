let days = document.querySelectorAll(".timer_value")[0]
let hours =document.querySelectorAll(".timer_value")[1]
let minuts = document.querySelectorAll(".timer_value")[2]
let seconds = document.querySelectorAll(".timer_value")[3]


let deadlineDate = new Date(2024,1,2,23,59,59)

function countDown(){
 let newDate= new Date()
 let resultDate = deadlineDate-newDate
    if(resultDate<=0){
        clearInterval(timer)
    }
    else{
        let daysVale=Math.floor(resultDate/(24*60*60*1000))
        let hoursValue=Math.floor((resultDate%(24*60*60*1000))/(60*60*1000))
        let minutsValue=Math.floor((resultDate%(60*60*1000))/(60*1000))
        let seconValue=Math.floor((resultDate%(60*1000))/1000)
        hold(daysVale,days)
        hold(hoursValue,hours)
        hold(minutsValue,minuts)
        hold(seconValue,seconds)
    }


}

let timer =setInterval(countDown,1000)

countDown()



function hold(elem, value){
    if(elem<10){
        value.innerHTML=`0${elem}`
    }
    else{
        value.innerHTML=elem
    }
}


function openPopUp() {
    let bg = document.querySelector('.bg')
    bg.classList.remove('closed')
}

function closePopUp() {
    let elem = event.target
    if(elem.className == "bg") {
        let bg = document.querySelector('.bg')
        bg.classList.add('closed')
    }
}

// Функция, которая добавляет маску для ввода номера телефона
function setPhoneMask(inputElement) {
    // Добавляем обработчик события input для элемента ввода
    inputElement.addEventListener('input', function(event) {
        // Получаем значение из поля ввода и оставляем только цифры
        let inputValue = event.target.value.replace(/\D/g, ''); 

        // Проверяем, начинается ли введенное значение с кода страны +998
        if (!inputValue.startsWith('998')) {
            // Если не начинается, добавляем код страны
            inputValue = '998' + inputValue; 
        }

        // Ограничение на максимальное количество цифр
        inputValue = inputValue.slice(0, 12); 

        // Форматируем введенные цифры в соответствии с маской номера телефона
        let formattedValue = '+';
        for (let i = 0; i < inputValue.length; i++) {
            if (i === 3) {
                formattedValue += '(';
            } else if (i === 5) {
                formattedValue += ')';
            } else if (i === 8 || i === 10) {
                formattedValue += '-';
            }
            formattedValue += inputValue[i];
        }

        // Устанавливаем отформатированное значение обратно в поле ввода
        event.target.value = formattedValue;
    });

    // Добавляем обработчик события keydown для предотвращения удаления кода страны
    inputElement.addEventListener('keydown', function(event) {
        // Если пытаемся удалить символы кода страны, отменяем действие
        if (event.key === 'Backspace' && event.target.value.length <= 5) {
            event.preventDefault();
        }
    });
}

// Пример использования:
let phoneInput = document.getElementsByName('phone')[0];
setPhoneMask(phoneInput);