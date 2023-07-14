function About() {
    return (
      <div className='m-3 text-white rounded'>
        <h1 className='mb-4'>Github Finder</h1>
        <p className='mb-4 font-light'>
          A React app to search GitHub profiles and see profile details. This
          project is part of the
          <a className='text-light' href='https://www.udemy.com/course/modern-react-front-to-back/'>
            {' '}
            React Front To Back
          </a>{' '}
          Udemy course by
          <strong>
            <a className='text-light' href='https://traversymedia.com'> Brad Traversy</a>
          </strong>
          .
        </p>
        <p>
          Version <span>1.0.0</span>
        </p>
        <p>
          Layout By:
          <a className='text-light' href='https://twitter.com/hassibmoddasser'>
            {' '}Hassib Moddasser
          </a>
        </p>
      </div>
    )
  }
  
  export default About