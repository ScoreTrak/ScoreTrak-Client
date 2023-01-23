import {} from "cypress"

describe('template spec', () => {
  it('reset competition', () => {
    cy.visit('http://localhost:5173')

    cy.wait(3000)
    cy.contains("Close").click()
    cy.contains("Sign In").click()


    cy.get('#username').type("admin", {force: true})
    cy.get('#password').type("admin", {force: true})

    cy.get('#auth-submit').click()

    cy.get('[href="/settings"]').click()
    cy.get('#panelDeleteResetbh-header').click()
    cy.contains('Reset Competition').click()
    cy.get("#confirm-reset-comp").click()
    cy.screenshot()



    cy.get('[href="/logs"]').click()
    cy.wait(1250)
    // cy.contains()
    // cy.contains("No records to display").should()
  })
})