import {
  $,
  cleanAllResizedRows,
  cloneHeader,
  handleClickCurrency,
  resizeAllRows,
  lenseIntersectionObserver,
  $OrThrow,
  IntersectionStatus
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

let bodySwiper = new Swiper('[data-id="body-columns"]', {
  ...slidesDefaultConfig(),
  modules: [Controller]
});

cloneHeader("test");

let staticHeaderSwiper = new Swiper(
  '[data-id="swiper-fixed-header"]',
  {
    modules: [Controller],
    ...slidesDefaultConfig(),
  },
);

bodySwiper.controller.control = staticHeaderSwiper
staticHeaderSwiper.controller.control = bodySwiper

if (isDev)
  addEventListener("resize", () => {
    cleanAllResizedRows();
    resizeAllRows();
    bodySwiper.destroy();
    bodySwiper = new Swiper('[data-id="body-columns"]', slidesDefaultConfig());
    staticHeaderSwiper.destroy();
    staticHeaderSwiper = new Swiper(
      '[data-id="swiper-fixed-header"]',
      {
        ...slidesDefaultConfig(),
        controller:{
          control: '[data-id="body-columns"]'
        }
      },
    );

    bodySwiper.controller.control = staticHeaderSwiper
    staticHeaderSwiper.controller.control = bodySwiper
  });

resizeAllRows();

const swiperTableBody = $OrThrow('[data-id="swiper-table-body"]');

swiperTableBody.addEventListener("click", handleClickCurrency);

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


