export default {
  title:'My title',
  attributes: Array
    .from({length:10})
    .map((_, index)=> `atributo ${index + 1}`),
  products:Array
    .from({length: 4})
    .map((_, productIndex, array)=>({
      URL: "#",
      title: `Producto ${productIndex} </br> Otra linea ${productIndex === 0? 'Mas cosas para colmo':''}`,
      isSolesActive: productIndex !== array.length - 1,
      priceSoles: `<p>Desde </br> <strong>S/ ${productIndex}</strong> al mes</p>`,
      priceDollars:`<p>Desde </br> <strong>$ ${productIndex + 1}</strong> al mes</p>`,
      ctaText: 'Cotizar',
      isDollarsActive: productIndex !== 0,
      values: Array
        .from({length: 10})
        .map((_, valueIndex)=> ({
          icon: 'check',
          valueSoles:`valor Producto-${productIndex} ${valueIndex} ${valueIndex === 0 && productIndex === 0? 'mas coasas para q se agrande para probar que se ajusta':''}`,
          valueDollars: valueIndex === 0 ? `valor dolares Producto-${productIndex} ${valueIndex}` : ''
        }))
    })),

}
