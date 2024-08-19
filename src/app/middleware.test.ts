import { NextRequest, NextResponse } from "next/server";
import { middleware } from "./middleware";

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    redirect: jest.fn((url: URL) => ({ url })),
    next: jest.fn(() => ({})),
  },
}));

describe("Middleware Authentication Redirects", () => {
  it("should redirect unauthenticated users from protected pages to login page", async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined), // No authToken
      },
      nextUrl: {
        pathname: "/protected/some-page",
      },
      url: "http://localhost:3000",
    } as unknown as NextRequest;

    const response = await middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/login", request.url)
    );
  });

  it("should allow authenticated users to access protected pages", async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue("some-valid-token"), // authToken present
      },
      nextUrl: {
        pathname: "/protected/some-page",
      },
      url: "http://localhost:3000",
    } as unknown as NextRequest;

    const response = await middleware(request);

    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("should redirect authenticated users away from the login page", async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue("some-valid-token"), // authToken present
      },
      nextUrl: {
        pathname: "/login",
      },
      url: "http://localhost:3000",
    } as unknown as NextRequest;

    const response = await middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/", request.url)
    );
  });

  it("should allow access to non-protected pages", async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined), // No authToken
      },
      nextUrl: {
        pathname: "/public-page",
      },
      url: "http://localhost:3000",
    } as unknown as NextRequest;

    const response = await middleware(request);

    expect(NextResponse.next).toHaveBeenCalled();
  });
});
