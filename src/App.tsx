import * as React from 'react';
import './App.css';
import {
    fetchStandingsJson,
    generateNotificationMessage,
    getNewSolvedProblems,
    getSolvedProblems,
    INTERVAL_MILLI_SEC
} from "./util/AtcoderStandingsHandler";
import {sleep} from "./util/utilities";

interface IState {
    tasksMap: Map<string, string>;
    solvedProblems: Set<string>;
}

class App extends React.Component<any, IState> {
    private contestIdRef = React.createRef<HTMLInputElement>();

    constructor(props: any) {
        super(props);

        this.state = {
            solvedProblems: new Set(),
            tasksMap: new Map()
        };
    }

    public render() {
        const fetchAndNotifyFirstAccepts = async () => {
            if (this.contestIdRef.current === null || Notification.permission !== 'granted') {
                return;
            }

            const contestId = this.contestIdRef.current.value;

            while (true) {
                const json = await fetchStandingsJson(contestId);
                const tasksMap = new Map();

                Object.keys(json.TaskInfo).forEach(
                    (key) => tasksMap.set(json.TaskInfo[key].TaskScreenName, json.TaskInfo[key].Assignment)
                );

                const solvedProblems = getSolvedProblems(json.StandingsData);
                const newAccepts = getNewSolvedProblems(solvedProblems, this.state.solvedProblems);
                const notificationMessage = generateNotificationMessage(newAccepts, tasksMap);

                if (notificationMessage !== null && Notification.permission === 'granted') {
                    new Notification(notificationMessage);
                }

                this.setState({tasksMap, solvedProblems});

                await sleep(INTERVAL_MILLI_SEC, null);
            }
        };

        const onWatchClick = async () => {
            Notification.requestPermission(fetchAndNotifyFirstAccepts);
        };

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">AtCoder First Accept Notification</h1>
                </header>
                <div>
                    <input type="text" name="contestId" ref={this.contestIdRef}/>
                    <button type="button" onClick={onWatchClick}>watch</button>
                    <button type="button">stop</button>
                    <button type="button">reset</button>
                </div>
                <div>
                    <table>
                        <thead><tr><th>Problem</th><th>Accepted</th></tr></thead>
                        <tbody>
                            {
                                Array.from(this.state.tasksMap.entries())
                                    .map(([screenName, assignment], index) => (
                                        <tr key={index}>
                                            <td>{assignment}</td>
                                            <td>{this.state.solvedProblems.has(screenName) ? 'O' : '-'}</td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
