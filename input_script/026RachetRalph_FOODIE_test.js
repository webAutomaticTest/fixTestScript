const Nightmare = require('nightmare')
const assert = require('assert')

describe('Load a Page', function () {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('40s')

    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare({show:true})
    })

    describe('/ (Home Page)', () => {
        it('Loaded landing page without an error', done => {
            // your actual testing urls will likely be `http://localhost:port/path`
            nightmare.goto('https://food-in-fridge.herokuapp.com/')
                .wait(500)
                .click('#add-userBtn')
                .end()
                .then(function (result) { done() })
                .catch(done)
        })
    })

    describe('/recipy (Recipy Search & Add Page)', () => {
        it('Succesfully quried spoonacular API without any errors', done => {
            nightmare.goto('https://food-in-fridge.herokuapp.com/recipy')
            .type('#user-ingredients','pasta, tomato, basil, chicken, marinara')    
            .click('#submit')
            .wait(2500)
            .click('.recipe-title')
            .wait(2500)
            .end()
                .then(result => { done() })
                .catch(done)
        })
    })

    describe('/recipy (Recipy Search & Add Page)', () => {
        it('Navigated to Add recipe page without any errors', done => {
            nightmare.goto('https://food-in-fridge.herokuapp.com/recipy')
                .click('#add-recipy')
                .wait(500)
                .end()
                .then(result => { done() })
                .catch(done)
        })
    })

    describe('/buttons (Recipy Search & Add Page)', () => {
        it('Added a recipe to server & posted to page without any errors', done => {
            nightmare.goto('https://food-in-fridge.herokuapp.com/buttons')
                .type('#meal_name', 'Quick and Easy French Toast') 
                .type('#ingredients', '1 egg, 1 teaspoon vanilla extract, 1/2 teaspoon cinnamon, 1/4 cup milk, 4 bread slices')    
                .type('#directions', 'Beat egg, vanilla and cinnamon, dip bread in mixture. Cook bread slices until browned on both sides.')  
                .wait(500)
                .click('#submitBtn')
                .wait(10000)
                .end()
                .then(result => { done() })
                .catch(done)
        })
    })

})