describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[class^="burger-ingredients_ingredient_"]').as('ingredients')
    cy.get('[class^="burger-constructor_ingredientStack"]').as('stack')

    cy.get('@ingredients').contains('Краторная булка').click()

    cy.get('[class^="modal_modal__"]').as('modal')
    cy.get('@modal').contains('Краторная булка N-200i')
    cy.get('@modal').get('li:nth-child(1)').contains('420')
    cy.get('@modal').get('li:nth-child(2)').contains('80')
    cy.get('@modal').get('li:nth-child(3)').contains('24')
    cy.get('@modal').get('li:nth-child(4)').contains('53')

    cy.get('[class^="modal_modalHeader"] > svg').click()
    cy.get('[class^="modal_modal__"]').should('not.exist')

    cy.get('@ingredients').contains('Краторная булка').trigger('dragstart')
    cy.get('@stack').trigger('drop')

    cy.get('@stack').contains('Краторная булка')

    cy.get('@ingredients').contains('Соус фирменный Space Sauce').trigger('dragstart')
    cy.get('@stack').trigger('drop')

    cy.get('@stack').contains('Соус фирменный Space Sauce')

    cy.get('@ingredients').contains('Мясо бессмертных моллюсков').trigger('dragstart')
    cy.get('@stack').trigger('drop')

    cy.get('@stack').contains('Мясо бессмертных моллюсков')

    cy.get('@ingredients').contains('Флюоресцентная булка').trigger('dragstart')
    cy.get('@stack').trigger('drop')

    cy.get('@stack').contains('Флюоресцентная булка')

    cy.contains('Оформить заказ').click()

    cy.url().should('eq', 'http://localhost:3000/login')

    cy.get('[type="email"]').type('norma@stellar-bugers.com')
    cy.get('[type="password"]').type('123')
    cy.contains('Войти').click()

    cy.contains('Оформить заказ').click()

    cy.wait(15000)

    cy.contains('идентификатор заказа')

    cy.get('[class^="modal_modalHeader"] > svg').click()
    cy.get('[class^="modal_modal__"]').should('not.exist')

    cy.get('@stack').get('[class^="burger-constructor_bunPlaceholder__"]').should('exist')
    cy.get('@stack').get('[class^="burger-constructor_fillingsScrollContainer"] li').should('have.length', 0)
  })
})