import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideBar from "../../components/sideBar";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the useMediaQuery hook
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: () => false,
}));

describe("SideBar", () => {
  it("renders the sidebar with user information", () => {
    render(<SideBar />);
    expect(screen.getByText("Makayla")).toBeInTheDocument();
    expect(screen.getByText("TELKOM INTERNASI...")).toBeInTheDocument();
    expect(screen.getByText("Staff Pengadaan I")).toBeInTheDocument();
  });

  it("renders navigation items", () => {
    render(<SideBar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Admin Management")).toBeInTheDocument();
  });

  it("expands and collapses the Admin Management section", () => {
    render(<SideBar />);
    const adminManagement = screen.getByText("Admin Management");

    // Check if the User item is initially hidden (not easily clickable or visible)
    expect(screen.queryByText("User")).not.toBeVisible();

    // Click to expand
    fireEvent.click(adminManagement);

    // Now the User item should be visible
    expect(screen.getByText("User")).toBeVisible();

    // Click to collapse
    fireEvent.click(adminManagement);
    expect(screen.queryByText("User")).not.toBeInTheDocument();
  });

  // Add more tests as needed
});
