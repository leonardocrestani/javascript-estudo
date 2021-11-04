
let array = [10, 20, 30, 40];

let totalSomaArray = array.reduce(function(total, item) {
  return total += item;
}, 0.0);

console.log(totalSomaArray); // Retorna 100 soma de todo o array


