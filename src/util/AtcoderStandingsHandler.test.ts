import {getSolvedProblems, IContestantStanding} from "./AtcoderStandingsHandler";

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
