// @flow
import React, {Component} from 'react';
import './status.css'

const models = [{
    'id': 'GL',
    'name': 'Global'
}, {
    'id': 'UK',
    'name': 'UKV'
}, {
    'id': 'UE',
    'name': 'MOGREPS-UK'
}, {
    'id': 'GE',
    'name': 'MOGREPS-G'
}];

class Status extends Component {
    constructor() {
        super();
        this.state = {
            selectedModel: models[0]
        }
    }

    render() {
        return (
            <div className="Status">
                <select className="Times">
                    <option>Observations</option>
                    <option>1hr forecast</option>
                    <option>3hr forecast</option>
                    <option>9hr forecast</option>
                </select>
                <div className="Models">
                    {models.map((element, index) => {
                        return (
                            <div className="Model"
                                 key={index}
                                 onClick={() => this.setState({
                                     selectedModel: element
                                 })}
                                 style={{background: this.state.selectedModel.id === element.id && '#00CED1'}}
                                 title={element.title}>
                                <p>{element.id}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Status;
