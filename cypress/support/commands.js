// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", function (type) {
  cy.visit("/user/login");

  if (type === "admin") {
    cy.get("#edit-name").type(Cypress.env("cyAdminUser"));
    cy.get("#edit-pass").type(Cypress.env("cyAdminPassword"));
  } else {
    cy.get("#edit-name").type(Cypress.env("cyEditorUser"));
    cy.get("#edit-pass").type(Cypress.env("cyEditorPassword"));
  }

  // submit
  cy.get(".user-login-form #edit-submit").click();
});

/**
 * Logout with cy.request
 */
Cypress.Commands.add("logout", function () {
  cy.request({
    method: "GET",
    url: "/user/logout",
    followRedirect: false, // turn off following redirects
  }).then((resp) => {
    // redirect status code is 302
    expect(resp.status).to.eq(302);
  });
});

Cypress.Commands.add("createUser", function (user, pass, role) {
  let drush = Cypress.env("DRUSH_PATH");
  cy.exec(
    `${drush} user-create "${user}" --mail="${user}@example.com" --password="${pass}"`,
    { failOnNonZeroExit: false }
  );

  cy.exec(`${drush} user-add-role "${role}" "${user}"`, {
    failOnNonZeroExit: false,
  });

  cy.exec(`${drush} user-information "${user}"`, { failOnNonZeroExit: false });
});

Cypress.Commands.add("deleteUser", function (user) {
  let drush = Cypress.env("DRUSH_PATH");
  cy.exec(`${drush} -y user:cancel --delete-content "${user}"`, {
    timeout: 120000,
  });
});
