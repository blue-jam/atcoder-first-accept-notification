import * as React from 'react';
import './App.css';
import {fetchStandingsJson, getSolvedProblems} from "./util/AtcoderStandingsHandler";

interface IState {
    tasksMap: Map<string, string>;
    solvedProblems: Set<string>;
}

class App extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            solvedProblems: new Set(),
            tasksMap: new Map()
        };
    }

    public render() {
        const onWatchClick = () => {
            fetchStandingsJson('code-thanks-festival-2018')
                .then((json) => {
                    const tasksMap = new Map();

                    Object.keys(json.TaskInfo)
                        .forEach(
                            (key) => tasksMap.set(json.TaskInfo[key].TaskScreenName, json.TaskInfo[key].Assignment)
                        );
                    const solvedProblems = getSolvedProblems(json.StandingsData);

                    this.setState({tasksMap, solvedProblems});
                });
        };

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">AtCoder First Accept Notification</h1>
                </header>
                <div>
                    <input type="text" name="contestId"/>
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
