/*
File: ./src/components/About.js
Purpose: Display information as to what this application is about.
Date        Dev  Description
2023/07/16  ITA  Updated the displayed content to be more concise.
*/ 

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
          Developer:
          <a className='text-light' href='https://github.com/IsaiahTshabalala/IsaiahTshabalala'>
            {' '}Isaiah Tshabalala
          </a>
        </p>
        <p>
          A big thank you to: {' '}
          <a className='text-light' href='https://twitter.com/hassibmoddasser'>
            {' '}Hassib Moddasser
          </a>
          {' '}for the layout design.
        </p>
        <p>
          A big thank you to <a className='text-light' href='https://traversymedia.com'> Brad Traversy</a>
          {', '}
          <a className='text-light' href='www.w3schools.com'>w3Schools.com</a>
          {' '} and many others who share their knowledge online. At virtually little to no price. Please do not give up on this cause
          of bringing education to the masses! You are one big online varsity!
        </p>
      </div>
    )
  }
  
  export default About