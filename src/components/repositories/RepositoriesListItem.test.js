import { render, screen, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router-dom";


// jest.mock("../tree/FileIcon.js", () => () => "File Icon Component");

const renderComponent = () => {
    const repository = {
        full_name: "facebook/react",
        language: "JavaScript",
        description: "A JavaScript library",
        owner: {
            login: "Facebok"
        },
        name: "React",
        html_url: "https://github.com/facebook/react"
    };

    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository} />
        </MemoryRouter>
    )

    return {
        repository
    }
}

test('should have github repository link', async () => {
    const { repository } = renderComponent();
    // await act(async () => {
    //     await pause();
    // });

    await screen.findByRole("img", {
        name: new RegExp(repository.language, "i")
    });

    const repoLink = screen.getByRole("link", {
        name: /github repository/i
    });

    expect(repoLink).toHaveAttribute("href", repository.html_url);

});

test('should have dynamic icon based on the repository primary language', async () => {
    const { repository } = renderComponent();

    const icon = await screen.findByRole("img", {
        name: new RegExp(repository.language, "i")
    });

    expect(icon).toHaveClass("js-icon");
});

test("should link to the code editor page", async () => {
    const { repository } = renderComponent();

    await screen.findByRole("img", {
        name: new RegExp(repository.language, "i")
    });

    const codeEditorLink = screen.getByRole("link", {
        name: new RegExp(repository.owner.login)
    });

    expect(codeEditorLink).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});

// const pause = () => new Promise(resolve => setTimeout(resolve, 100));
