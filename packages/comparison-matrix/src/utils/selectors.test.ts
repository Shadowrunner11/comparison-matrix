import { afterEach, describe, expect, it } from 'vitest'
import { $, $$ } from '.'

function createMockedElement(dataTestId = 'temporal'){
  const mockElement = document.createElement('div')

  mockElement.innerText = 'Temporal'
  mockElement.setAttribute('data-testid', dataTestId);

  return mockElement;
}

afterEach(()=>{
  document.body.childNodes.forEach(value=> value.remove())
})

describe.concurrent('utils', ()=>{
  it('selects node', ()=>{
    const mockedElement = createMockedElement();

    document.body.append(mockedElement);
  
    expect($('[data-testid="temporal"]')).toBe(mockedElement);
  })

  it('selects many nodes', ()=>{
    const mockedElements = Array.from({length: 10}).map(()=>createMockedElement('temporal-many'));

    document.body.append(...mockedElements);

    expect($$('[data-testid="temporal-many"]')).toEqual(mockedElements);
  })
})
