export interface ITaskResult {
    Status: number
}

export interface IContestantStanding {
    TaskResults: { [s: string]: ITaskResult };
}

export const getSolvedProblems = (contestantStandings: IContestantStanding[]) => {
    const solvedProblems = new Set();

    contestantStandings.forEach((contestant) => {
        Object.keys(contestant.TaskResults)
            .filter((problemId) => contestant.TaskResults[problemId].Status === 1)
            .forEach((problemId) => solvedProblems.add(problemId));
    });

    return solvedProblems;
};

export const getNewSolvedProblems = (currentSolvedProblems: Set<string>, lastSolvedProblems: Set<string>) => {
    const newSolvedProblems = Array.from(currentSolvedProblems)
        .filter(problem => !lastSolvedProblems.has(problem));

    return new Set(newSolvedProblems);
};
