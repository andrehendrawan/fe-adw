import React from "react";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";
import ClientLayout from "../../components/clientLayout";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("ClientLayout", () => {
  it("renders children", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    const { getByText } = render(
      <ClientLayout>
        <div>Test Child</div>
      </ClientLayout>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("renders sidebar when not on login page", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
    const { container } = render(
      <ClientLayout>
        <div>Test Child</div>
      </ClientLayout>
    );
    expect(container.querySelector("body")).toHaveClass("flex");
    expect(container.querySelector("main")).toHaveClass("flex-1");
  });

  it("does not render sidebar on login page", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    const { container } = render(
      <ClientLayout>
        <div>Test Child</div>
      </ClientLayout>
    );
    expect(container.querySelector("body")).not.toHaveClass("flex");
    expect(container.querySelector("main")).not.toHaveClass("flex-1");
  });
});
