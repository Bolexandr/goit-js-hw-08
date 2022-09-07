import throttle from "lodash.throttle"; /// імпорт тротлу

/// запис посилання на форму
const form = document.querySelector('.feedback-form'); 

//// ініціалізація об'єкту для подальшого наповнення
const inptData = Object();

///запис об'єкта який створюється з розпарсеного рядка типу JSON в змінну
const objFromStorage = JSON.parse(localStorage.getItem("feedback-form-state"))

if (objFromStorage === null) {
  console.log('В сховищі відсутні дані  для автозаповнення форми')
} else {
  
// /// Перестраховка від пустого об'єкту  перевірка на присутність емейла
// try {
//   const { email} = objFromStorage;
//  form.email.value = email
// } catch (error) {
//  console.log('в сховищі не знайдено інформації для автозаповнення поля email ')
// }

// /// Перестраховка від пустого об'єкту  перевірка на присутність меседжа
// try {
//   const { message } = objFromStorage;
//  form.message.value = message
// } catch (error) {
//  console.log('в сховищі не знайдено інформації для автозаповнення поля message ')
// }

///Оголошення функції для автоматичного заповнення полів
///Функція приймає форму яку потрібно заповнити та об'єкт  з властивостями ключі якого є ідентичними значенням 
/// атрибута name='', а значення є вмістом полів  і автоматисно заповнює поля
  
function autoComplietInputs (oneForm , obj) {
  for (let key in obj) {
    try {
      oneForm[key].value = obj[key]
    } catch (error) {
 console.log(` в сховищі не знайдено інформації для автозаповнення поля ${key}`)
}
  }
 
}
 ///виклик функції для автозаповнення
autoComplietInputs(form,objFromStorage)
}


///// Оголошення функції для оновлення сториджа
const storegeUpdater = (e) => {
  /// Запис в обєкт значень з інпутів
  inptData[e.target.name] = e.target.value
/// Оновлення сториджа
  localStorage.setItem("feedback-form-state", JSON.stringify(inptData))
};

/// Виклик слухача на форму з подією інпут  з приторможенням виклику функції
//з інтервалом в пів секунди 
form.addEventListener('input', throttle(storegeUpdater, 500));

/////Оголошення функції для обробки подій після сабміту
function eventSubmit(e) {
  //// Вимикаю автоматичні дії від браузера
  e.preventDefault();
  //// Вивожу в консоль об'єкт з введиними даними
  console.log(`Вміст об'єкта з введиними даними на момент сабміту:`, JSON.parse(localStorage.getItem("feedback-form-state")));
  /// Очищення полів в формі 
  form.reset();
  /// Очищення вмісту стореджа від вмісту полів
  localStorage.removeItem("feedback-form-state");
};

/// Виклик слухача на форму при події сабміт
form.addEventListener('submit', eventSubmit );