import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SearchPage from "../SearchPage";
import { Form, Button, Row } from "react-bootstrap";

Enzyme.configure({ adapter: new Adapter() });

describe("SearchPage", () => {
  it("Test if search page is rendering", () => {
    const wrapper = shallow(<SearchPage />);
    const input = wrapper.find(".search-page");
    expect(input.length).toBe(1);
  });
  it("Renders Child component", () => {
    const wrapper = shallow(<SearchPage />);
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Row)).toHaveLength(1);
  });
});
