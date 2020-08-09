import React, {useState} from 'react';

import './count-items.css'

const CountItems = ({items}) => {

    const { amount: countAll } = items[0];
    const { amount: countDone } = items[1];



    return (
        <React.Fragment>

            <ul class="list-group col-md-5 d-flex flex-row justify-content-between">
                <li class="list-group-item d-flex justify-content-between align-items-center col-6">
                    All
                    <span class="badge badge-primary badge-pill">{countAll}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center col-6">
                Done
                    <span class="badge badge-primary badge-pill">{countDone}</span>
                </li>
            </ul>
        </React.Fragment>

    );
}



export default CountItems;