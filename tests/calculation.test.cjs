const test=require('node:test');
const assert=require('node:assert/strict');
const {calculate,services}=require('../app.js');
test('стоимость за месяц включает комиссию 10%',()=>assert.deepEqual(calculate(1200,1),{subtotal:1200,fee:120,total:1320}));
test('срок 3 месяца умножает базовую стоимость',()=>assert.deepEqual(calculate(450,3),{subtotal:1350,fee:135,total:1485}));
test('годовая подписка на хранилище',()=>assert.deepEqual(calculate(350,12),{subtotal:4200,fee:420,total:4620}));
test('идентификаторы услуг уникальны, цены положительны',()=>{assert.equal(new Set(services.map(s=>s.id)).size,services.length);assert.ok(services.every(s=>Number.isInteger(s.price)&&s.price>0));});
