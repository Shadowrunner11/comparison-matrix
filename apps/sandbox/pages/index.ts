import {
  $,
  cleanAllResizedRows,
  cloneHeader,
  handleClickCurrency,
  resizeAllRows,
  lenseIntersectionObserver,
  $OrThrow,
  IntersectionStatus,
  $$
} from "comparison-matrix";

import Swiper from "swiper";
import { Controller } from 'swiper/modules'

import "swiper/swiper-bundle.css";
import "comparison-matrix/dist/styles.css";
import "./index.css";

//@ts-expect-error vite envs
const isDev = import.meta.env.DEV;

const getSlidesPerView = (): number | 'auto' => {
  const width = Number(getComputedStyle(document.body).width.replace('px', ''))
  if (width >= 880) return 3;
  if (width >= 680) return 2;

  return "auto";
};

const slidesDefaultConfig = () => ({
  slidesPerView: getSlidesPerView(),
  centeredSlides: false,
  spaceBetween: 0,
  grabCursor: true,
});

const createBodySwiper = ()=> new Swiper('[data-id="body-columns"]', {
  ...slidesDefaultConfig(),
  modules: [Controller]
});

let bodySwiper = createBodySwiper()

cloneHeader("test");




const createHeaderSwiper = ()=> new Swiper(
  '[data-id="swiper-fixed-header"]',
  {
    modules: [Controller],
    ...slidesDefaultConfig(),
  },
);


// TODO: should encapsulate this , maybe a lense
let staticHeaderSwiper = createHeaderSwiper()

bodySwiper.controller.control = staticHeaderSwiper
staticHeaderSwiper.controller.control = bodySwiper

function recreateTable(){
  bodySwiper.destroy();
  staticHeaderSwiper.destroy();
  staticHeaderSwiper = createHeaderSwiper()
  bodySwiper = createBodySwiper();
  
  cleanAllResizedRows();
  resizeAllRows();

  bodySwiper.controller.control = staticHeaderSwiper
  staticHeaderSwiper.controller.control = bodySwiper
}

if (isDev)
  addEventListener("resize", recreateTable);

matchMedia("(min-width: 600px)").addEventListener('change', recreateTable)

resizeAllRows();

//const swiperTableBody = $OrThrow('[data-id="swiper-table-body"]');

document.body.addEventListener("click", handleClickCurrency);

const rowHeader = $OrThrow('[data-row="header"]')

const fixedHeader = $('[data-id="fixed-header"]')

const fixedColumn = $OrThrow('[data-column="locked"]')

const [getStatusFixedColumn] = lenseIntersectionObserver(fixedColumn, (status)=>{
  if(status === IntersectionStatus.notEntered)
    return 
  if(status !== IntersectionStatus.entered)
    return fixedHeader?.classList.add('static-header--hidden')

  if(getStatus().status !== IntersectionStatus.entered)
    fixedHeader?.classList.remove('static-header--hidden')
})

const [getStatus] = lenseIntersectionObserver(rowHeader, (status)=>{
  if(status === IntersectionStatus.notEntered)
    return 
  if(status !== IntersectionStatus.entered && getStatusFixedColumn().status === IntersectionStatus.entered){
   return fixedHeader?.classList.remove('static-header--hidden')
  }

  fixedHeader?.classList.add('static-header--hidden')
})


// TODO: change this a to a lense

const controls = $OrThrow('.controls')

const resolveControlsContainerSize = ()=>{
  controls.style.width = getComputedStyle($OrThrow('[data-id="body-columns"]')).width;
}

resolveControlsContainerSize()

const changeControls = (node: HTMLElement)=>{
  const buttons = $$('button', node)
  const prevButtons = buttons.filter(element => element.getAttribute('data-action')==='prev');
  const nextButtons = buttons.filter(element => element.getAttribute('data-action')==='next')

  if(bodySwiper.isEnd || bodySwiper.slides.length <= 3){
    prevButtons.forEach(button =>button.classList.add('color--primary'))
    nextButtons.forEach(button =>button.classList.remove('color--primary'))
  }

  if(bodySwiper.isBeginning){
    nextButtons.forEach(button =>button.classList.add('color--primary'))
    prevButtons.forEach(button =>button.classList.remove('color--primary'))
  }
}

changeControls(document.body);

controls.addEventListener('click', function({target}){
  if(!(target instanceof HTMLElement))
    return 

  const action = target.getAttribute('data-action');

  if(!action)
    return

  switch(action){
    case "next":{
      bodySwiper.slideNext()
      break;
    }
    case "prev":{
      bodySwiper.slidePrev();
      break;
    }
    default:
      throw new Error('not supported action')
  }

  changeControls(this)

})



if (isDev)
  addEventListener("resize", resolveControlsContainerSize);

matchMedia("(min-width: 600px)").addEventListener('change', resolveControlsContainerSize)


bodySwiper.on('progress', ()=>{
  changeControls(document.body)
})
