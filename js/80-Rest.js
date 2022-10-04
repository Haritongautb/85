"use strict";
// Оператор Rest. Это типа оператор ...spread
const log = function(a, b, ...rest){
    console.log(a, b, rest);
};

log("basic", "rest", "operator", "usage");


// Настроек парметров по умолчанию. 
// I. с помощью или ||
// Либо присваиваем сразу в параметрах. 
// если второй аргумент не будет передан, то basis будет автоматически = 2;
function calcOrDuble(number, basis = 2){
    // basis = basis || 2;
    console.log(number * basis);
}

calcOrDuble(3);
