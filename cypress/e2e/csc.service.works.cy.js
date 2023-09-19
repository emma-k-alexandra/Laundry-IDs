/// <reference types="Cypress" />

describe('CSC Service Works', () => {
  it('scape ids', () => {
    const { START, NUMBER_OF_IDS_TO_SCRAPE } = Cypress.env()

    cy.log(Cypress.env())
    console.log(Cypress.env())

    const ids = [...Array(NUMBER_OF_IDS_TO_SCRAPE)].map((_element, i) => i + START)

    cy.wrap(ids).each(id => {
      cy.wait(500)
      
      cy.log(`Testing CVA ${id}`)

      cy.visit('https://www.sdirevalue.com/JustPurchaseCode.aspx')
      
      cy.get('#ContentSection_inputSearchCVA')
        .type(`${id}{enter}`)

      cy.document().then((doc) => {
        let street = doc.querySelector('.card > .card-header > .text-muted')

        if (!street) {
          cy.log(`[Not Found] No CVA Data Found for ${id}`)
          return
        }

        street = street.textContent

        const name = doc.querySelector('.card > .card-body > div > h4 > span').textContent
        const address = doc.querySelector('.card > .card-body > div > small > span').textContent
        const cva = doc.querySelector('.card > .card-body > div > h3 > span').textContent
  
        cy.log(`[Found] ${cva},${name},${street},${address}`)
      })
    })
  })
})
