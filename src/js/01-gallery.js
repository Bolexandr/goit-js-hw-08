// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

 
const fatherDiv = document.querySelector('.gallery')

///////////  Функція додає елементи в дом 
function createImagesGalary() {

  const htmlMarcImgs = galleryItems.reduce((longString,objImg) => {
  const { preview, original, description } = objImg;
    const protoString = 
`<a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`
  return longString += protoString;

  }, '')
  fatherDiv.insertAdjacentHTML("beforeend", htmlMarcImgs);

  //// Додавання виклику і настройок бібліотеки 


  var lightbox = new SimpleLightbox('.gallery__item', {
    captionsData: 'alt',
    captionDelay: 250,
   });
 
}
createImagesGalary()   /// виклик функції