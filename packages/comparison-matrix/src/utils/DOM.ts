import { $$, $OrThrow } from "./selectors";

// TODO: not pure functions, transform to purity or use classes
export function cloneHeader(dataClone = "header"){
  const rowElements = $$(`[data-clone="${dataClone}"]`)
    .map(element => element.cloneNode(true))

  const container = document.createElement('div');

  container.append(...rowElements);
  container.classList.add('static-header', 'hidden');

  document.body.append(container);
}


export function resizeHeaderColumn(headerColumnId = 'header-column', tableBodyId = 'table-body'){
  const heights = $$(`[data-table=${tableBodyId}] > *`)
    .map(child => getComputedStyle(child).height)

  $$(`[data-table=${headerColumnId}] > *`)
    .forEach((child, index)=> child.style.height = heights[index])  
}

export enum IntersectionStatus{
  notEntered = 'NOT_ENTERED',
  entered = 'ENTERED',
  exited = 'EXITED'
}

function throwAlreadyObserved(){
  throw new Error('Already observed')
}

export class ExpandedIntersectionObserver extends IntersectionObserver{
  private _status = IntersectionStatus.notEntered;
  private _timesIntersected = 0;
  private alreadyObserved = false;
  constructor(
    cb:(status: IntersectionStatus, entry: IntersectionObserverEntry)=>void = ()=>{},
    options?: IntersectionObserverInit
  ){
    super((entries)=>{
      const [firstEntry] = entries
  
      if(firstEntry.isIntersecting){
        this._timesIntersected++;
        this._status = IntersectionStatus.entered;
      }
      else if(!firstEntry.isIntersecting && this._status === IntersectionStatus.entered)
       this._status = IntersectionStatus.exited;
  
      cb(this._status, firstEntry)
    }, options)
  }

  get status(){
    return this._status
  }

  get timesIntersected(){
    return this._timesIntersected
  }

 
  override observe(target: Element): void {
    if(this.alreadyObserved)
      throwAlreadyObserved();

    this.alreadyObserved = true;

    super.observe(target);
  }

}

export type LenseIntersectionObserverResponse = [
  ()=>{status?: IntersectionStatus, timesIntersected?: number}, 
  IntersectionObserver | undefined
]

export function lenseIntersectionObserver(
  target:Element, 
  cb: (status: IntersectionStatus, entry: IntersectionObserverEntry)=>void = ()=>{}, 
  options?: IntersectionObserverInit
): LenseIntersectionObserverResponse{
  let status = IntersectionStatus.notEntered;
  let timesIntersected = 0;

  const observer = new IntersectionObserver((entries)=>{
    const [firstEntry] = entries

    if(firstEntry.isIntersecting){
      timesIntersected++;
      status = IntersectionStatus.entered;
    }
    else if(!firstEntry.isIntersecting && status === IntersectionStatus.entered)
      status = IntersectionStatus.exited;

    cb(status, firstEntry)
  }, options)

  observer.observe(target);

  observer.observe = throwAlreadyObserved;

  return [()=> ({status, timesIntersected}), observer]
}

lenseIntersectionObserver.off = (): LenseIntersectionObserverResponse=>[()=>({}), undefined]

// TODO: create logic to add new columns
export class ColumnManager{
  private length = 0;
  constructor(private table: HTMLElement, private maxLength = 3){}

  updateLength(){
    if(this.length === this.maxLength - 1)
      throw new Error(`Cannot add more than ${this.maxLength}`);
    this.length++
  }

  add(dataId: string){
    const child = $OrThrow(`[data-id="${dataId}"]`, this.table)

    if(!this.length)
      return child.classList.remove('hidden');

    this.updateLength();
    
    const lastShownElement = [...this.table.children].reverse()
      .find(element =>!element.classList.contains('hidden'))

    
    child.classList.remove('hidden');

    lastShownElement?.insertAdjacentElement('afterend', child);
  }

  remove(dataId: string){
    $OrThrow(`[data-id="${dataId}"]`, this.table).classList.add('hidden');
  }
}

