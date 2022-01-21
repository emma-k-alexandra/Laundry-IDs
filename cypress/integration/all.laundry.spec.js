/// <reference types="Cypress" />

const USERNAME = 'fuckyou123'
const PASSWORD = 'depfi4-barhYt-huwdus'

describe('A.L.L. Laundry', () => {
  before(() => {
    cy.visit('https://www.codedvalueadder.com/alllaundrycva/Login.aspx')

    cy.get('#ctl00_MainContent_txtUsername')
      .type(USERNAME)

    cy.get('#ctl00_MainContent_txtPassword')
      .type(`${PASSWORD}{enter}`)
  })

  it('go forever', () => {
    const START = Cypress.env('START')
    const NUMBER_OF_IDS_TO_SCRAPE = Cypress.env('NUMBER_OF_IDS_TO_SCRAPE')

    const ids = [...Array(NUMBER_OF_IDS_TO_SCRAPE)].map((_element, i) => i + START)

    cy.wrap(ids).each(id => {
      cy.wait(500)
      
      cy.log(`Testing CVA ${id}`)

      cy.visit('https://www.codedvalueadder.com/alllaundrycva/SearchCVA.aspx')
      
      cy.get('#ctl00_ctl00_MainContent_ChildContent_txtID')
        .type(`${id}{enter}`)

      cy.document().then(doc => {
        let tableRows = doc.querySelectorAll('#ctl00_ctl00_MainContent_ChildContent_gvCVAResults tbody tr')

        if (tableRows.length < 2) {
          cy.log(`[Not Found] No CVA Data Found for ${id}`)
          return
        }

        const [ , cva, address, city, state, zip, active, ] = Array.from(tableRows[1].childNodes).map(node => node.textContent.replaceAll(',', ' ').trim())
  
        cy.log(`[Found] ${cva},${address},${city},${state},${zip},${active}`)
      })
    })
  })
})
