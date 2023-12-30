export function throwIfNull<T =unknown>(value: T | null | undefined): T{
  if(value === null || value === undefined)
    throw new Error('Should not be null or undefined');

  return value;
}
