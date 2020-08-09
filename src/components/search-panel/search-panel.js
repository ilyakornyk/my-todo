import React, {useState} from 'react';

import './search-panel.css'

const SearchPanel = ({onSearchChange}) => {


    const onTermChange = (e) => {
        onSearchChange(e.target.value);
    };
    

    return (
        <React.Fragment>
            <div className="input-group d-flex justify-content-center mt-3 col-7">
                <input type="text" class="form-control" aria-label="Sizing example input" 
                aria-describedby="inputGroup-sizing-default" placeholder='search...'
                onChange={onTermChange}/>

            </div>
        </React.Fragment>
    );
}



export default SearchPanel;