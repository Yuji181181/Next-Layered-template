import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
	it("renders children correctly", () => {
		render(<Button>Click me</Button>);
		expect(
			screen.getByRole("button", { name: /click me/i }),
		).toBeInTheDocument();
	});

	it("applies primary variant styles by default", () => {
		render(<Button>Primary</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("bg-blue-600");
	});

	it("applies secondary variant styles", () => {
		render(<Button variant="secondary">Secondary</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("bg-gray-200");
	});

	it("shows loading state", () => {
		render(<Button isLoading>Submit</Button>);
		expect(screen.getByText(/loading/i)).toBeInTheDocument();
	});

	it("is disabled when isLoading is true", () => {
		render(<Button isLoading>Submit</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("is disabled when disabled prop is true", () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});
});
