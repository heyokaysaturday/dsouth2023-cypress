it("Verify Login for Admin User", function () {
  cy.createUser(
    Cypress.env("cyAdminUser"),
    Cypress.env("cyAdminPassword"),
    Cypress.env("cyAdminRole")
  );
  cy.login(Cypress.env("cyAdminUser"));
  cy.visit("/");
  cy.wait(2000); // Wait for 2 seconds
  getLogin_Out_Button().should("contain", LOGOUT_BTN_TEXT);
  cy.logout();
  cy.visit("/");
  cy.wait(2000); // Wait for 2 seconds
  getLogin_Out_Button().should("contain", LOGIN_BTN_TEXT);
  cy.deleteUser(Cypress.env("cyAdminUser"));
});

it("Verify Login for Editor User", function () {
  cy.createUser(
    Cypress.env("cyEditorUser"),
    Cypress.env("cyEditorPassword"),
    Cypress.env("cyEditorRole")
  );
  cy.login(Cypress.env("cyEditorUser"));
  cy.visit("/");
  cy.wait(2000); // Wait for 2 seconds
  getLogin_Out_Button().should("contain", LOGOUT_BTN_TEXT);
  cy.logout();
  cy.visit("/");
  cy.wait(2000); // Wait for 2 seconds
  getLogin_Out_Button().should("contain", LOGIN_BTN_TEXT);
  cy.deleteUser(Cypress.env("cyEditorUser"));
});
