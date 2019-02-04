import React from "react";
import { shallow } from "enzyme";
import Info from "../Info";

describe("Info component", () => {
  it("render a div with classname info", () => {
    const wrapper = shallow(<Info />);
    expect(wrapper.find(".info").length).toEqual(1);
    expect(wrapper.exists(".info")).toBe(true);
  });
  describe("data is undefined", () => {
    const props = {
      data: undefined
    };
    const wrapper = shallow(<Info {...props} />);
    it("not render the latitude", () => {
      expect(
        wrapper
          .find("span")
          .at(4)
          .text()
      ).toEqual("");
    });
    it("find a pre tag", () => {
      expect(wrapper.find("pre")).toHaveLength(1);
    });
  });
  describe("data is an object contains key-value pairs", () => {
    const props = {
      data: {
        info: {
          name: "a",
          region: "a"
        },
        position: {
          lat: 0,
          lon: 0
        }
      }
    };
    const wrapper = shallow(<Info {...props} />);
    it("p tags with values", () => {
      expect.assertions(3);
      expect(
        wrapper
          .find("p")
          .at(0)
          .text()
      ).toBe("a");
      expect(
        wrapper
          .find("p")
          .at(1)
          .childAt(1)
          .text()
      ).toBe("a");
      expect(wrapper.find("pre")).toHaveLength(0);
    });
  });
});
