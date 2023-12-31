import { $, cleanAllResizedRows, cloneHeader, handleClickCurrency, resizeAllRows } from 'comparison-matrix'
import Swiper from 'swiper'


import { SwiperOptions } from 'swiper/types/swiper-options';

import 'swiper/swiper-bundle.css'
import 'comparison-matrix/dist/styles.css';
import './index.css'


cloneHeader('test');

//@ts-expect-error
const isDev = import.meta.env.DEV


const getSlidesPerView = ()=>{
  if(window.innerWidth>=880)
    return 3;
  if(window.innerWidth >= 680)
    return 2;

  return 'auto';
}


const slidesDefaultConfig= ():  SwiperOptions =>({
  slidesPerView: getSlidesPerView(),
  centeredSlides: false,
  spaceBetween: 0,
  grabCursor: true

})

let bodySwiper = new Swiper('[data-id="body-columns"]', slidesDefaultConfig());

if(isDev)
  addEventListener('resize', ()=>{
    cleanAllResizedRows();
    resizeAllRows();
    bodySwiper.destroy();
    bodySwiper = new Swiper('[data-id="body-columns"]', slidesDefaultConfig())
  });



resizeAllRows()

const swiperTableBody = $('[data-id="swiper-table-body"]');

swiperTableBody?.addEventListener('click', handleClickCurrency)
