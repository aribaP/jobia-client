import React from 'react'
import { Link } from 'react-router-dom'

const AddJob = ({ handleOnSave, onChangeTabs }) => {
  return (
    <div style={{ padding: '30px' }}>
      <div class='row'>
        <div class='col-12 profile-body-right'>
          <div style={{ padding: '30px' }}>
            <label className='mb-3 mt-15'>Required Skills</label>
            <div>
              <button className='btn-resume ml-15'> Add Skills</button>
            </div>
            <div className='resume-brdr'></div>
            <label className='mb-3 mt-15'>Minimum Experience</label>
            <div>
              <button className='btn-job ml-15'>In Years</button>
            </div>
            <label className='mb-3 mt-15'>Location</label>
            <div>
              <textarea
                class="form-control mb-3 input-Fields"
                id="Location"
                rows="4"
              />
            </div>
            <label className='mb-3 mt-15'>City</label>
            <div>
              <button className='btn-job ml-15'>City</button>
            </div>
            <form className="d-flex justifyContent width-100">
              <Link to='/login'><button className="btn button-style-outline me-2 btn-sm" type="submit">Cancel</button></Link>
              <Link to='/'><button className="btn button-style-full me-2 btn-sm" type="submit" onClick={() => {
                handleOnSave('ResumeView')
                onChangeTabs('Job')
              }}
              >Save</button></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddJob