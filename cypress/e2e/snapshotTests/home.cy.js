describe("Home Page Snapshot", () => {
  it("takes a snapshot of the home page and compares it", () => {
    cy.visit("/");
    cy.wait(2000);
    cy.compareSnapshot("home-page-with-threshold");
  });
});
