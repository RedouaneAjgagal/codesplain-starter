import { render, screen } from "@testing-library/react";
import AuthButtons from "./AuthButtons";
import createServer from "../../test/server";
import { MemoryRouter } from "react-router";

const renderComponent = async () => {
    render(
        <MemoryRouter>
            <AuthButtons />
        </MemoryRouter>
    );
    await screen.findAllByRole("link");
}

describe.only("when the user is not signed in", () => {
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

    test('should display sign in and sign up', async () => {
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

    test('should not display sign out', async () => {
        await renderComponent();

        const signOut = screen.queryByRole("link", {
            name: /sign out/i
        });

        expect(signOut).not.toBeInTheDocument();
    });

});