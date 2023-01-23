import {} from "cypress"

describe('template spec', () => {
  it('sign in', () => {
    cy.visit('http://localhost:5173')

    cy.wait(3000)
    cy.contains("Close").click()
    cy.contains("Sign In").click()


    cy.get('#username').type("admin", {force: true})
    cy.get('#password').type("admin", {force: true})

    cy.get('#auth-submit').click()
  })
})