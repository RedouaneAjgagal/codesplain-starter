import { render, screen, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";


// jest.mock("../tree/FileIcon.js", () => () => "File Icon Component");

test('should have github repository link', async () => {
    const repository = {
        full_name: "facebook/react",
        language: "JavaScript",
        description: "A JavaScript library",
        owner: "Facebok",
        name: "React",
        html_url: "https://github.com/facebook/react"
    };

    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository} />
        </MemoryRouter>
    )

    // await act(async () => {
    //     await pause();
    // });
    
    await screen.findByRole("img", {
        name: /javascript/i
    });

    const repoLink = screen.getByRole("link", {
        name: /github repository/i
    });

    expect(repoLink).toHaveAttribute("href", repository.html_url);

});

// const pause = () => new Promise(resolve => setTimeout(resolve, 100));
