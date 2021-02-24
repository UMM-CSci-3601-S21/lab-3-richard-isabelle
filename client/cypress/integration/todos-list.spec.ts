import { TodosListPage } from '../support/todos-list.po';

const page = new TodosListPage();

describe('Todo List', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('should have the correct title', () => {
    page.getTodosTitle().should('have.text', 'Todos');
  });

  it('should type something in the "owner" filter and check that it returned the correct todos', () => {
    //Typing "Fry" into the "owner" category
    cy.get('#todos-owner-input').type('Fry');

    //checking to make sure every todo that showed up has the owner "Fry"
    page.getTodosListItem().each(e => {
      cy.wrap(e).find('.todos-list-owner').should('have.text', ' Fry ');
    });

    //checking it a different way
    page.getTodosListItem().find('.todos-list-owner').each(ele =>
      expect(ele.text()).to.equal(' Fry '));
  });

  it('should type multiple filters and check that it returned the correct todo', () => {
    page.getTodosListItem().first().then((card) => {
      cy.get('#todos-body-input').type('magna excepteur');
      cy.get('#todos-owner-input').type('Dawn');
      cy.get('#todos-category-input').type('software design');

      //When the view profile button on the first user card is clicked, the URL should have a valid mongo ID
      page.getTodosCards();

      //The URL should contain '/todos/' (note the ending slash) and '/todos/' should be followed ny a mongo ID
      cy.url()
      .should('contain', '/todos/')
      .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

      //On this profile page we were sent to, the owner and category should be correct
      cy.get('.todos-card-body').should('contain.text', 'magna excepteur');
  });
  });

  it('should return the correct items when something partial is typed into "category"', () => {
    //Typing "r" into the "category" field
    cy.get('#todos-category-input').type('r');

    page.getTodosListItem().find('.todos-list-category')
    //we should see the following categories
    .should('contain.text', 'homework')
    .should('contain.text', 'software design')
    .should('contain.text', 'groceries')
    //we shouldn't see the following
    .should('not.contain.text', 'video games');
  });

  it('should filter by status "complete" and return the correct todos', () => {
    page.selectStatus('complete');

    page.getTodosListItem().should('exist');
    page.getTodosListItem().each(e => {
      cy.wrap(e).find('.todos-list-status').should('contain.html', 'check_box');
    });
  });

  it('should filter by status "incomplete" and return the correct todos', () => {
    page.selectStatus('incomplete');

    page.getTodosListItem().should('exist');
    page.getTodosListItem().each(e => {
      cy.wrap(e).find('.todos-list-status').should('contain.html', 'check_box_outline_blank');
    });
  });

  it('should limit the todos properly', () => {
    cy.get('#todos-limit').type('4');

    page.getTodosListItem().should('have.length', 4);
  });

  it('Should click view profile on a user and go to the right URL', () => {
      page.getTodosListItem().first().then((card) => {
          cy.get('#todos-body-input').type('magna ex');
          cy.get('#todos-owner-input').type('Dawn');
          cy.get('#todos-category-input').type('homework');

          //When the view profile button on the first user card is clicked, the URL should have a valid mongo ID
          page.getTodosCards();

          //The URL should contain '/todos/' (note the ending slash) and '/todos/' should be followed ny a mongo ID
          cy.url()
          .should('contain', '/todos/')
          .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

          //On this profile page we were sent to, the owner and category should be correct
          cy.get('.todos-card-owner').should('have.text', 'Dawn');
          cy.get('.todos-card-category').should('have.text', 'homework');
      });
    });
});
