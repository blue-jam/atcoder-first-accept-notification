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

export const generateNotificationMessage = (newSolvedProblems: Set<string>, taskMap: Map<string, string>) => {
    if (newSolvedProblems.size === 0) {
        return null;
    }

    const solvedList = Array.from(newSolvedProblems)
        .map((screenName) => taskMap.get(screenName))
        .join(', ');

    return `There are first accepts.\nProblem: ${solvedList}\nPlease check standings.`;
};
