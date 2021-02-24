export class TodosListPage {
    navigateTo() {
        return cy.visit('/todos');
    }

    getUrl() {
        return cy.url();
    }

    getTodosTitle() {
        return cy.get('.todos-list-title');
    }

    getTodosCards() {
        return cy.get('.todos-nav-list .todos-list-item').click();
    }

    getTodosListItem() {
        return cy.get('.todos-nav-list .todos-list-item');
    }

    /**
     * Selects view profile for given todos in list.
     *
     * Might have an error with this test because
     * the original test requires the client be in
     * "card" view, which we don't have.
     *
     * @param list The todos list
     * */
    clickViewProfile(list: Cypress.Chainable<JQuery<HTMLElement>>) {
        return list.find<HTMLButtonElement>('[data-test=viewProfileButton]').click();
    }


    /**
     * Selects a status to filter in the "Status" selector.
     *
     * @param value the status *value* to select, this is what's found in the mat-option "value" attribute.
     */
    selectStatus(value: string) {
        return cy.get('[data-test=todosStatusSelect]').click().get(`mat-option[value="${value}"]`).click();
      }
}
