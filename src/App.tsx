import * as React from 'react';
import './App.css';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">AtCoder First Accept Notification</h1>
                </header>
                <div>
                    <input type="text" name="contestId"/>
                    <button type="button">watch</button>
                    <button type="button">stop</button>
                    <button type="button">reset</button>
                </div>
                <div>
                    <table>
                        <thead><tr><th>Problem</th><th>Accepted</th></tr></thead>
                        <tbody>
                            <tr><td>A</td><td>-</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
