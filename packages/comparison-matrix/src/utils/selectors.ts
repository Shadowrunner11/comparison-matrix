import { throwIfNull } from "./global";

export const $ = (selector: string, node: HTMLElement = document.body)=> node.querySelector<HTMLElement>(selector);

export const $$ = (selector: string, node: HTMLElement = document.body): HTMLElement[] => Array.from(node.querySelectorAll<HTMLElement>(selector))

export const $OrThrow = (selector: string, node: HTMLElement = document.body) => throwIfNull($(selector, node));
