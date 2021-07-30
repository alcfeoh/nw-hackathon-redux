import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Form} from "./Form";

let container: HTMLDivElement;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    // @ts-ignore
    container = null;
});

it("renders with or without a name", () => {
    act(() => {
        render(<Form />, container);
    });
    expect(container.textContent).toBe("Hey, stranger");

});
