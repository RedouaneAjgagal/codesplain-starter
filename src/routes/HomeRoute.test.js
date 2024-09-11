import { screen, render } from "@testing-library/react";
import HomeRoute from "./HomeRoute";
import { MemoryRouter } from "react-router";
import createServer from "../test/server";

createServer([
    {
        path: "/api/repositories",
        method: "get",
        res: (req) => {
            const query = req.url.searchParams.get("q");

            const language = query.split("language:")[1];

            return {
                items: [
                    {
                        id: 1,
                        full_name: `${language}_one`
                    },
                    {
                        id: 2,
                        full_name: `${language}_two`
                    }
                ]
            }
        }
    }
]);

test('should render two links for each language', async () => {
    render(
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>
    );

    const languages = ["javascript", "typescript", "rust", "go", "python", "java"];
    for (const language of languages) {
        const links = await screen.findAllByRole("link", {
            name: new RegExp(`${language}_`, "i")
        });

        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(`${language}_one`);
        expect(links[1]).toHaveTextContent(`${language}_two`);
        expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
        expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
    }
});