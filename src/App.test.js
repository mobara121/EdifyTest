import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders menu data", async () => {
  const fakeMenu = {
    key: "Banana Juice",
    label: "Banana Juice",
    calories: "320",
    image: "fakepic",
    totalTime: "100",
    ingredients: "banana"
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeMenu)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App key="Banana Juice" />, container);
  });


  expect(container.querySelectorAll("alias[Menu]").textContent).toBe(fakeMenu.label);
  expect(container.querySelector("strong").textContent).toBe(fakeMenu.calories);
  expect(container.textContent).toContain(fakeMenu.ingredients);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
