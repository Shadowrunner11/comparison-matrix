import { $$ } from "../utils";

export function handleClickCurrency(this: HTMLElement, {target}: MouseEvent){
  const currency = (target as (HTMLElement | null))?.getAttribute('data-currency');

  if(!currency)
    return;

  const column = (target as (HTMLElement | null))?.getAttribute('data-column');

  const columns = $$(`[data-column="${column}"] [data-currency-id]`,this);

  const columnToShow = columns
    .find(column => column.getAttribute('data-currency-id') === currency)

  const columnToHide = columns
    .find(column => column.getAttribute('data-currency-id') !== currency)

  
  columnToShow?.classList.remove('hide', 'hidden');

  columnToHide?.classList.add('hide', 'hidden');

  const buttons = $$(`button[data-currency][data-column="${column}"]`, this)

  const buttonsToPrimaryColor = buttons
    .filter(button => button.getAttribute('data-currency') !== currency)

  const buttonsToGrayColor = buttons
    .filter(button  => button.getAttribute('data-currency') === currency)

  buttonsToPrimaryColor
    .forEach(button => button.classList.add('color--primary'))

  buttonsToGrayColor
    .forEach(button => button.classList.remove('color--primary'))
}

