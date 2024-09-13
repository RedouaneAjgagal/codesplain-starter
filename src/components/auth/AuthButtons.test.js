import { render, screen } from "@testing-library/react";
import AuthButtons from "./AuthButtons";
import createServer from "../../test/server";
import { MemoryRouter } from "react-router";
import { SWRConfig } from "swr";

const renderComponent = async () => {
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <MemoryRouter>
                <AuthButtons />
            </MemoryRouter>
        </SWRConfig>
    );
    await screen.findAllByRole("link");
}

describe("when the user is not signed in", () => {
    createServer([
        {
            method: "get",
            path: "/api/user",
            res: () => {
                return {
                    user: null
                }
            }
        }
    ]);

    test('should display sign in and sign up links', async () => {
        await renderComponent();

        const signIn = screen.getByRole("link", {
            name: /sign in/i
        });
        const signUp = screen.getByRole("link", {
            name: /sign up/i
        });

        expect(signIn).toBeInTheDocument();
        expect(signUp).toBeInTheDocument();
    });

    test('should not display sign out link', async () => {
        await renderComponent();

        const signOut = screen.queryByRole("link", {
            name: /sign out/i
        });

        expect(signOut).not.toBeInTheDocument();
    });
});

describe("when the user is signed in", () => {
    createServer([
        {
            method: "get",
            path: "/api/user",
            res: () => {
                return {
                    user: {
                        id: 1,
                        email: "red@red.com"
                    }
                }
            }
        }
    ]);

    test('should display sign out link', async () => {
        await renderComponent();

        const singOutLink = screen.getByRole("link", {
            name: /sign out/i
        });

        expect(singOutLink).toBeInTheDocument();
    });

    test('should not display sign in and sign up links', async () => {
        await renderComponent();

        const signInLink = screen.queryByRole("link", {
            name: /sign in/i
        });
        const signUpLink = screen.queryByRole("link", {
            name: /sign up/i
        });

        expect(signInLink).not.toBeInTheDocument();
        expect(signUpLink).not.toBeInTheDocument();
    });
});