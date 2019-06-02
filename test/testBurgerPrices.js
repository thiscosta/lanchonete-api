const chai = require('chai')
const should = chai.should()
const { calculatePrice } = require('../src/business/createBurger')

//Função utilizada no array.reduce para calcular o preço do lanche
const reducer = (accumulator, current) => {
    return {
        price: (accumulator.price * accumulator.quantity) + (current.price * current.quantity),
        quantity: 1
    }
}

const testBurgerPrice =
    describe('Lanches de cardápio', () => {
        describe('X-Bacon', () => {
            it('Deve retornar o valor correto do lanche', () => {
                const burger = {
                    ingredients: [
                        { price: 2, quantity: 1 },
                        { price: 3, quantity: 1 },
                        { price: 1.5, quantity: 1 }
                    ]
                }
                calculatePrice(burger)
                should.equal(burger.ingredients.reduce(reducer).price, burger.price, "Cálculo de preço incorreto")
            })
        })
        describe('X-Burger', () => {
            it('Deve retornar o valor correto do lanche', () => {
                const burger = {
                    ingredients: [
                        { price: 3, quantity: 1 },
                        { price: 1.5, quantity: 1 }
                    ]
                }
                calculatePrice(burger)
                should.equal(burger.ingredients.reduce(reducer).price, burger.price, "teste mensagem")
            })
        })
        describe('X-Egg', () => {
            it('Deve retornar o valor correto do lanche', () => {
                const burger = {
                    ingredients: [
                        { price: 0.8, quantity: 1 },
                        { price: 3, quantity: 1 },
                        { price: 1.5, quantity: 1 }
                    ]
                }
                calculatePrice(burger)
                should.equal(burger.ingredients.reduce(reducer).price, burger.price, "teste mensagem")
            })
        })
        describe('X-Egg Bacon', () => {
            it('Deve retornar o valor correto do lanche', () => {
                const burger = {
                    ingredients: [
                        { price: 0.8, quantity: 1 },
                        { price: 3, quantity: 1 },
                        { price: 2, quantity: 1 },
                        { price: 1.5, quantity: 1 }
                    ]
                }
                calculatePrice(burger)
                should.equal(burger.ingredients.reduce(reducer).price, burger.price, "teste mensagem")
            })
        })
    })

module.exports = testBurgerPrice
