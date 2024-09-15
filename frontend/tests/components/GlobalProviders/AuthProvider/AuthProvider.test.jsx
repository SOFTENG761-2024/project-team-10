import axios from "axios";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  APIProvider,
  AuthProvider,
  LocalStorageProvider,
  useAPI,
  useAuth,
} from "@frontend-ui/components/GlobalProviders";
import { act, renderHook } from "@testing-library/react";

// Mocking axios globally
vi.mock("axios");
describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("login sets isAuthenticated to true", async () => {
    // given
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    //when
    act(() => {
      result.current.login();
    });

    //then

    expect(result.current.isAuthenticated).toBe(true);
  });

  test("logout sets isAuthenticated to false", async () => {
    //given
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AuthProvider>{children}</AuthProvider>
      ),
    });

    //when

    act(() => {
      result.current.logout();
    });

    //then
    expect(result.current.isAuthenticated).toBe(false);
  });

});
