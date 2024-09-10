import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";

test('should have github repository link', async () => {
    const repository = {
        full_name: "facebook/react",
        language: "JavaScript",
        description: "A JavaScript library",
        owner: "Facebok",
        name: "React"
    }
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository} />
        </MemoryRouter>
    )

    await screen.findByRole("img", {
        name: /javascript/i
    });
});
