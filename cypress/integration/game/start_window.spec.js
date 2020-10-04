describe('Start window page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('baseUrl'));
    });
  
    it('Displays the right title for the game', () => {
        cy.get("h1")
          .should('be.visible')
          .should('contain', 'PACMAN');
    });
    it('Displays the action needed to enter the game', () => {
        cy.get("#start-msg")
          .should('be.visible')
          .should('contain', 'Press ENTER to start');
    });
    it('Should have a background color black', () => {
        cy.get("#start-screen")
          .should('have.css', 'background-color', 'rgb(0, 0, 0)');
    });
    it('Should rediret to the game', () => {
        cy.get('body').trigger('keydown', { keyCode: 13 });
        cy.get("#start-screen")
          .should('have.css', 'display', 'none');
    });

    after(() => {
      cy.visit(Cypress.env('baseUrl'));
    });

  });