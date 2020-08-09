import React from 'react';
import './nav.css';

const filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
    { name: 'important', label: 'Important' }
  ];

const Nav = ({filter, onFilterChange = () => {}}) => {

    const buttons = filterButtons.map(({name, label}) => {
        const isActive = name === filter;
        const classNames = 'btn ' + (isActive ? 'btn-primary' : 'btn-outline-secondary');
    
        return (
          <button key={name}
                  type="button"
                  onClick={() => onFilterChange(name)}
                  className={classNames}>{label}</button>
        );
      });
    

    return (
            <React.Fragment >
                <nav className="nav d-flex justify-content-center mt-3 bg-light col-6">
                  <div className="btn-group">
                      { buttons }
                  </div>
                </nav>
            </React.Fragment>
    );
}




        // <React.Fragment >
        //             <nav className="nav d-flex justify-content-center mt-3 bg-light col-6">
        //                 <a className="nav-link active" href="#">All</a>
        //                 <a className="nav-link" href="#">Active</a>
        //                 <a className="nav-link" href="#" onClick={() => onFilterChange()}>important</a>
        //             </nav>
        // </React.Fragment>

export default Nav;




