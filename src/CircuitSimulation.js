import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import './CircuitSimulation.css'

function CircuitModel() {
    const [R, setR] = useState(0);
    const [L, setL] = useState(0);
    const [E, setE] = useState(0);
    const [t, setT] = useState([]);
    const [connectData, setConnectData] = useState([]);
    const [disconnectData, setDisconnectData] = useState([]);

    const calculateData = () => {
        let tData = [];
        let connectData = [];
        let disconnectData = [];

        for (let i = 0; i < 1000; i += 0.001) {
            tData.push(i);
            connectData.push(E / R * (1 - Math.exp(-R / L * i)));
            disconnectData.push(E / R * Math.exp(-R / L * i));

            if (E / R * Math.exp(-R / L * i) < 0.00001)
                break;
        }

        setT(tData);
        setConnectData(connectData);
        setDisconnectData(disconnectData);
    };

    const handleCalculate = () => {
        calculateData();
    };

    return (
        <div>
            <div>
                <label>
                    R (Ом):
                    <input type="number" value={R} onChange={(e) => setR(e.target.value)} />
                </label>
                <label>
                    L (Гн):
                    <input type="number" value={L} onChange={(e) => setL(e.target.value)} />
                </label>
                <label>
                    E (В):
                    <input type="number" value={E} onChange={(e) => setE(e.target.value)} />
                </label>
                <button class="button button-default" onClick={handleCalculate}>Рассчитать</button>
            </div>
            <div>
                <h2>График I(t) при замыкании цепи</h2>
                <Plot
                    data={[
                        {
                            mode: 'lines',
                            type: 'scatter',
                            x: t,
                            y: connectData,
                            line: {
                                color: '#a43a76'
                            }
                        }
                    ]}
                    layout={{
                        title: 'График I(t) при замыкании цепи',
                        xaxis: {
                            title: 'Время t (с)'
                        },
                        yaxis: {
                            title: 'I(t), А'
                        }
                    }}
                />
            </div>
            <div>
                <h2>График I(t) при размыкании цепи</h2>
                <Plot
                    data={[
                        {
                            mode: 'lines',
                            type: 'scatter',
                            x: t,
                            y: disconnectData,
                            line: {
                                color: '#34abc7'
                            }
                        }
                    ]}
                    layout={{
                        title: 'График I(t) при размыкании цепи',
                        xaxis: {
                            title: 'Время t (с)'
                        },
                        yaxis: {
                            title: 'I(t), А'
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default CircuitModel;
