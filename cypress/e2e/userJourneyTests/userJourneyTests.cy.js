describe("Search functionality", () => {
  it("performs a search", () => {
    // Navigate to homepage
    cy.visit("/");

    // wait for page to load
    cy.wait(500);

    // scroll a little
    cy.scrollTo("bottom");

    // click .sticky-header-toggle
    cy.get(".sticky-header-toggle").click();

    // click .block-search-wide__button
    cy.get(".block-search-wide__button").click();

    cy.wait(1000);

    // Fill out search input
    cy.get("#search-block-form--2 .form-element--type-search").type(
      "Lucidus Zelus"
    );

    // Submit search form
    cy.get("#search-block-form--2").submit();

    // Assert that search results are displayed
    cy.get(".search-results").should("be.visible");

    // get the first search result
    cy.get(".search-results__item")
      .first() // get the first search result

      // get h3 link from above
      .find("h3 a")
      .click();

    // Assert that the page title is correct
    cy.title().should("eq", "Lucidus Zelus | Drupal South 2023");
  });
});
