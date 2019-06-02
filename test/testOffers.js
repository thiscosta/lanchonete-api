const chai = require('chai')
const should = chai.should()
const { light, meat, cheese } = require('../src/business/applyOffers')

const testBurgerPrice =
    describe('Promoções', () => {
        describe('Light', () => {
            it('Deve aplicar a promoção e descontar 10% do valor do lanche', () => {
                const burger = {
                    ingredients: [
                        { quantity: 2, name: 'Alface', price: 0.4 }
                    ],
                    price: 0.8,
                    discount: 0
                }
                light(burger)
                should.equal(0.08, burger.discount, "Desconto incorreto")
            })
        })
        describe('Muita carne', () => {
            it('Deve aplicar a promoção e descontar 1 a cada 3 porções de carne', () => {
                const burger = {
                    ingredients: [
                        { quantity: 10, name: 'Hambúrguer de carne', price: 3 }
                    ],
                    price: 30,
                    discount: 0
                }
                meat(burger)
                should.equal(9, burger.discount, "Desconto incorreto")
            })
        })
        describe('Muito queijo', () => {
            it('Deve aplicar a promoção e descontar 1 a cada 3 porções de queijo', () => {
                const burger = {
                    ingredients: [
                        { quantity: 13, name: 'Queijo', price: 1.5 }
                    ],
                    price: 19.5,
                    discount: 0
                }
                cheese(burger)
                should.equal(6, burger.discount, "Desconto incorreto")
            })
        })
        describe('Muito queijo + Muita carne', () => {
            it('Deve aplicar a promoção, descontar 1 a cada 3 porções de queijo e 1 a cada 3 porções de carne', () => {
                const burger = {
                    ingredients: [
                        { quantity: 13, name: 'Queijo', price: 1.5 },
                        { quantity: 10, name: 'Hambúrguer de carne', price: 3 }
                    ],
                    price: 49.5,
                    discount: 0
                }
                meat(burger)
                cheese(burger)
                should.equal(15, burger.discount, "Desconto incorreto")
            })
        })
        describe('Light + Muito queijo + Muita carne', () => {
            it('Deve aplicar a promoção, descontar 10% do valor do lanche, descontar 1 a cada 3 porções de queijo e 1 a cada 3 porções de carne', () => {
                const burger = {
                    ingredients: [
                        { quantity: 2, name: 'Alface', price: 0.4 },
                        { quantity: 13, name: 'Queijo', price: 1.5 },
                        { quantity: 10, name: 'Hambúrguer de carne', price: 3 }
                    ],
                    price: 50.3,
                    discount: 0
                }
                light(burger)
                meat(burger)
                cheese(burger)
                should.equal(20.03, burger.discount, "Desconto incorreto")
            })
        })
    })

module.exports = testBurgerPrice
