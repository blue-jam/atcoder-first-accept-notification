import {
    generateNotificationMessage,
    getNewSolvedProblems,
    getSolvedProblems,
    IContestantStanding
} from "./AtcoderStandingsHandler";

test('Collect all solved problems. Status = 1 denotes AC submission.', () => {
    const contestantStandings: IContestantStanding[] = [
        {
            TaskResults: {
                'no-ac': {Status: 10},
                'one-ac-with-one-attempt': {Status: 1},
                'one-ac-with-two-attempt': {Status: 5},
            }
        },
        {
            TaskResults: {
                'no-ac': {Status: 5},
                'one-ac-with-two-attempt': {Status: 1},
            }
        },
    ];
    expect(getSolvedProblems(contestantStandings))
        .toEqual(new Set(['one-ac-with-one-attempt', 'one-ac-with-two-attempt']));
});

test('Collect new solved problems based on the last solved problems.', () => {
    const before = new Set(['a', 'b']);
    const after = new Set(['a', 'c']);

    expect(getNewSolvedProblems(after, before))
        .toEqual(new Set(['c']));
});

test('Generate notification message from new solved problems set.', () => {
    const solvedProblems = new Set(['problem-a', 'problem-b']);
    const tasks = new Map([['problem-a', 'A'], ['problem-b', 'B']]);

    expect(generateNotificationMessage(solvedProblems, tasks))
        .toEqual(
            'There are first accepts.\n' +
            'Problem: A, B\n' +
            'Please check standings.'
        );
});

test('Return null message if there is no new solved problems.', () => {
    const solvedProblems = new Set();
    const tasks = new Map([['problem-a', 'A'], ['problem-b', 'B']]);

    expect(generateNotificationMessage(solvedProblems, tasks))
        .toEqual(null);
});
