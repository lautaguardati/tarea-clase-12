/// <reference types="Cypress"/>

describe('Entra a Casa de Cambio', () => {
    it('Ingresa dos fechas y dos monedas distintas', () => {
        cy.visit('http://192.168.0.245:8080/exchange-house/exchange-house.html');
        cy.get('#fecha').type('2024-07-19');
        cy.get('#base').select('Dólar Estadounidense');
        cy.get('#boton-ver-cambios').click();
        cy.get('#resultados').should('be.visible');
        cy.get('#base-cambios').should('have.text', 'USD')
        cy.get('#fecha-cambios').should('have.text', '2024-07-19')
        cy.get('#cambios').find('li').should('have.length', '30');
        cy.get('#cambios li:first').should('have.text', 'AUD: 1.4946')

        cy.get('#fecha').type('2024-07-15');
        cy.get('#base').select('Lira Turca');
        cy.get('#boton-ver-cambios').click();
        cy.get('#cambios li:first').should('have.text', 'AUD: 0.04462')
    })
})
