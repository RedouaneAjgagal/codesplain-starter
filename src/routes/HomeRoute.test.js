import { screen, render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import HomeRoute from "./HomeRoute";
import { MemoryRouter } from "react-router";

const handlers = [
    rest.get("api/repositories", (req, res, ctx) => {
        const query = req.url.searchParams.get("q");

        const primaryLanguage = query.split("language:")[1];
        console.log(primaryLanguage);

        return res(
            ctx.json({
                items: [
                    {
                        id: 1,
                        full_name: `${primaryLanguage}_one`
                    },
                    {
                        id: 2,
                        full_name: `${primaryLanguage}_two`
                    }
                ]
            })
        )
    })
];

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
})

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