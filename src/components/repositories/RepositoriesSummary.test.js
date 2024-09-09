import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test('should display repository information', () => {
    const repository = {
        language: "JavaScript",
        stargazers_count: 5,
        open_issues: 1,
        forks: 32
    };

    render(<RepositoriesSummary repository={repository} />);

    for (const repositoryKey in repository) {
        const value = repository[repositoryKey];
        const element = screen.getByText(new RegExp(value));

        expect(element).toBeInTheDocument();
    };
});