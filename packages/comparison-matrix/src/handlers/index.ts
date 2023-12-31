import { $$ } from "..";

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

  const buttonToPrimaryColor = buttons
    .find(button => button.getAttribute('data-currency') !== currency)

  const buttonToGrayColor = buttons
    .find(button  => button.getAttribute('data-currency') === currency)

  buttonToPrimaryColor?.classList.add('color--primary')

  buttonToGrayColor?.classList.remove('color--primary') 
}

