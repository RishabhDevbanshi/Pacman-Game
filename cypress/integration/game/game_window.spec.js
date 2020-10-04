describe('Game window page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
        cy.get('body').trigger('keydown', { keyCode: 13 });
    });
  
    it('Displays the main character', () => {
        cy.get(".pac-man")
            .should("be.visible");
    });

    it('Displays the 4 enemies', () => {
        cy.get(".blinky")
          .should("be.visible");

        cy.get(".stinky")
          .should("be.visible");

        cy.get(".inky")
          .should("be.visible");

        cy.get(".clyde")
          .should("be.visible");
    });

    after(() => {
      cy.visit(Cypress.env('baseUrl'));
    });
    
  });