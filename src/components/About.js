function About() {
    return (
      <div className='mt-4 p-5 bg-primary text-white rounded'>
        <h1 className='mb-4 mt-4'>Github Finder</h1>
        <p className='mb-4 font-light'>
          A React app to search GitHub profiles and see profile details. This
          project is part of the
          <a href='https://www.udemy.com/course/modern-react-front-to-back/'>
            {' '}
            React Front To Back
          </a>{' '}
          Udemy course by
          <strong>
            <a href='https://traversymedia.com'> Brad Traversy</a>
          </strong>
          .
        </p>
        <p className='text-lg '>
          Version <span className='text-white'>1.0.0</span>
        </p>
        <p className='text-lg '>
          Layout By:
          <a className='text-white' href='https://twitter.com/hassibmoddasser'>
            {' '}Hassib Moddasser
          </a>
        </p>
      </div>
    )
  }
  
  export default About