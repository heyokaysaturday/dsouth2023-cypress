export function getLogin_Out_Button() {
  return cy.get(".secondary-nav__menu-item--level-1 a").contains("Log");
}

import { TITLE, BODY, TAG } from "../../fixtures/article_data";
describe("Creating a new article in Drupal", () => {
  it("should allow a user to create a new article", () => {
    cy.createUser(
      Cypress.env("cyEditorUser"),
      Cypress.env("cyEditorPassword"),
      Cypress.env("cyEditorRole")
    );

    // wait
    cy.wait(2000);
    cy.visit("/");

    // login
    // scroll to bottom of the page
    cy.scrollTo("bottom");
    cy.get(".sticky-header-toggle").click();
    cy.get(".secondary-nav__menu-item--level-1 a").contains("Log in").click();

    cy.get(".user-login-form #edit-name").type(Cypress.env("cyEditorUser"));
    cy.get(".user-login-form #edit-pass").type(Cypress.env("cyEditorPassword"));

    cy.get(".user-login-form #edit-submit").click();

    cy.visit("node/add/article");
    cy.get("#edit-title-0-value").type(TITLE);
    cy.get(".ck-content[contenteditable=true]").then((el) => {
      const editor = el[0].ckeditorInstance;
      editor.setData(BODY);
    });
    cy.get("#edit-field-tags-target-id").type(TAG);
    cy.get("#edit-submit").click();

    // assert that the article was created successfully
    cy.contains(TITLE);

    // remove the article after we are done
    cy.get(".tabs__link").contains("Delete").click();
    cy.get("#edit-submit").click();

    // remove the user after we are done
    cy.deleteUser(Cypress.env("cyEditorUser"));
  });
});
