// @flow
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {isNullOrUndefined} from '../../../services/utils.service';
import './list.css';

class List extends Component {

    render() {
        return (
            <ul className="List">
                {this.props.data.map((item, i) => {
                    let listContent = (
                        <div className="List-Content">
                            <h6>{item.key}</h6>
                            <p>{item.value}</p>
                        </div>
                    );
                    return (
                        <li key={i} onClick={() => {
                            !isNullOrUndefined(this.props.onClick) && this.props.onClick(item)
                        }}>
                            {!isNullOrUndefined(item.icon) ? (
                                <Fragment>
                                    <img alt="" className="List-Icon" src={item.icon}/>
                                    {listContent}
                                </Fragment>
                            ) : listContent}
                        </li>
                    )
                })}
            </ul>
        )
    }
}

List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    onClick: PropTypes.func
};

export default List;
