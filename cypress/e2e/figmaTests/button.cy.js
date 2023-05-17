import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

function compareImages(imagePath1, imagePath2, threshold) {
  return cy.readFile(imagePath1, "binary").then((png1) => {
    return cy.readFile(imagePath2, "binary").then((png2) => {
      const img1 = PNG.sync.read(Buffer.from(png1, "binary"));
      const img2 = PNG.sync.read(Buffer.from(png2, "binary"));
      const diff = new PNG({ width: img1.width, height: img1.height });
      const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        { threshold }
      );
      const percentDiffPixels =
        (numDiffPixels / (img1.width * img1.height)) * 100;
      return { percentDiffPixels, diff };
    });
  });
}

describe("Figma button test", () => {
  it("compares a screenshot with a reference image", () => {
    const figmaFileKey = Cypress.env("FIGMA_PROJECT");
    const figmaFrameId = "2:4";
    const figmaAccessToken = Cypress.env("FIGMA_PA");
    const figmaImageURL = `https://api.figma.com/v1/images/${figmaFileKey}`;

    // get figma image for compare
    cy.request({
      method: "GET",
      url: figmaImageURL,
      headers: {
        "X-Figma-Token": figmaAccessToken,
      },
      qs: {
        ids: figmaFrameId,
        format: "png",
      },
    }).then((response) => {
      // get the image url
      const figmaImageURL = response.body.images[figmaFrameId];

      // save the image as a .png file
      cy.request({
        method: "GET",
        url: figmaImageURL,
        encoding: "binary",
      }).then((response) => {
        cy.writeFile(
          "cypress/fixtures/btn-component-figma.png",
          response.body,
          "binary"
        );
      });

      // get screen shot of the button component on the site
      cy.visit("/");
      cy.get(".btn-component").screenshot("btn-component-webdev");

      // compare the two images
      compareImages(
        "cypress/fixtures/btn-component-figma.png",
        "cypress-visual-screenshots/comparison/btn-component-webdev.png",
        0.1
      ).then(({ percentDiffPixels }) => {
        // when the number of different pixels is less than the threshold
        expect(percentDiffPixels).to.be.lessThan(0.1 * 100);
      });
    });
  });
  afterEach(function () {
    // Only write the diff image if the test has failed
    if (this.currentTest.state === "failed") {
      compareImages(
        "cypress/fixtures/btn-component-figma.png",
        "cypress-visual-screenshots/comparison/btn-component-webdev.png",
        0.1
      ).then(({ diff }) => {
        cy.writeFile(
          "cypress-visual-screenshots/diff/btn-component-diff.png",
          PNG.sync.write(diff)
        );
      });
    }
  });
});
