
console.log("from child");

const suma = (cant) => {
    
    let total = 0 
    for (let n = 1; n < cant; n++) {
        total  =+ n     
    }
    return total

}

let cant = process.argv[2];
let total = suma(cant)
process.send(total)
  