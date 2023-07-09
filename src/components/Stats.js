import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import GithubContext from '../hooks/GithubProvider';

function Stats({fields, valueFontSize}) {
  const {clickedUser} = useContext(GithubContext);
  return (
    (fields !== null && fields !== undefined && fields.length > 0) &&
    <div className='card-group mt-3 text-bg-secondary container-fluid shadow'>
      {fields.map((field)=> {
        return (
          <div key={field.fieldName} class-name='card bg-secondary container-fluid'>
            <div className='card-group mt-1 mb-2 bg-secondary container-fluid shadow-sm border border-secondary border-start-0 border-top-0 border-bottom-0 rounded-0'>
              <div className='card bg-secondary container-fluid border-0'>
                <div className='çard-body container-fluid'>
                  <div className='card-title text-muted' style={{width: (field.width !== undefined)? field.width : 'auto'}}>
                    {field.caption}
                  </div>
                  <div className='card-text bg-secondary text-white' style={{fontSize: `${valueFontSize}`}}>
                    <strong>{clickedUser[field.fieldName]}</strong>
                  </div>
                </div>
              </div>
              
              {(field.icon !== undefined && field.icon !== null) &&
                <div className='card card-text pink-text icon-large bg-secondary border-0 m-0'>
                  <div className='card-body'>
                    <div className='card-text'>
                      <strong>{field.icon}</strong>
                    </div>
                  </div>
                </div>}
            </div>
          </div>  
        );
      })}
    </div>
  );
}

Stats.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object),
  valueFontSize: PropTypes.string
};

Stats.defaultPropTypes = {
  valueFontSize: '1rem'
};

export default Stats;