import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");
    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("link", { name: /cards/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("link", { name: /log in/i });
  });

  // TODO: UPDATE THIS
  // it("should allow you to make a card", () => {
  //   const testCard = {
  //     title: faker.lorem.words(1),
  //     body: faker.lorem.sentences(1),
  //   };
  //   cy.login();
  //   cy.visitAndCheck("/");

  //   cy.findByRole("link", { name: /cards/i }).click();
  //   cy.findByText("No cards yet");

  //   cy.findByRole("link", { name: /\+ new card/i }).click();

  //   cy.findByRole("textbox", { name: /title/i }).type(testCard.title);
  //   cy.findByRole("textbox", { name: /body/i }).type(testCard.body);
  //   cy.findByRole("button", { name: /save/i }).click();

  //   cy.findByRole("button", { name: /delete/i }).click();

  //   cy.findByText("No cards yet");
  // });
});
