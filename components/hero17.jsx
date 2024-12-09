import React, { Fragment } from 'react'
import { useRouter } from 'next/navigation'

const Hero17 = () => {
  const router = useRouter();
  const handleSignInClick = () => {
    router.push("/auth/signin");
  };
  return (
    <>
      <div className="hero17-header78">
        <div className="hero17-column thq-section-padding thq-section-max-width">
          <div className="hero17-content1">
            <h1 className="hero17-text1 thq-heading-1">
              <Fragment>
                <span className="hero17-text7">
                  Prakash Public School
                  <br /> Fee Management
                </span>
              </Fragment>

            </h1>
            <p className="hero17-text2 thq-body-large">

              <Fragment>
                <span className="hero17-text8">
                  Simplify and streamline the process of managing school fees
                  with our user-friendly platform.
                </span>
              </Fragment>

            </p>
          </div>
          <div className="hero17-actions">
            <button className="thq-button-filled hero17-button1"
            onClick={handleSignInClick}
            >
              <span className="thq-body-small">

                <Fragment>
                  <span className="hero17-text6">Get Sign In</span>
                </Fragment>

              </span>
            </button>
            <button className="thq-button-outline hero17-button2">
              <span className="thq-body-small">

                <Fragment>
                  <span className="hero17-text5">Learn More</span>
                </Fragment>

              </span>
            </button>
          </div>
        </div> 
      </div >
      <style jsx>
        {`.hero17-header78 {
            gap: var(--dl-space-space-threeunits);
            width: 100%;
            height: auto;
            display: flex;
            overflow: hidden;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            flex-direction: column;
          }
          .hero17-column {
            gap: var(--dl-space-space-oneandhalfunits);
            width: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-bottom: var(--dl-space-space-unit);
          }
          .hero17-content1 {
            gap: var(--dl-space-space-oneandhalfunits);
            display: flex;
            align-self: stretch;
            align-items: center;
            flex-direction: column;
          }
          .hero17-text1 {
            text-align: center;
          }
          .hero17-text2 {
            text-align: center;
          }
          .hero17-actions {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-space-space-unit);
          }
          .hero17-content2 {
            gap: var(--dl-space-space-oneandhalfunits);
            width: 100%;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .hero17-row-container1 {
            width: 100%;
          }
          
          .hero17-container2 {
            display: contents;
          }
          .hero17-text5 {
            display: inline-block;
          }
          .hero17-text6 {
            display: inline-block;
          }
          .hero17-text7 {
            display: inline-block;
          }
          .hero17-text8 {
            display: inline-block;
          }
          @media (max-width: 767px) {
            .hero17-content2 {
              width: 100%;
            }
          }
          @media (max-width: 479px) {
            .hero17-actions {
              width: 100%;
              flex-direction: column;
            }
            .hero17-button1 {
              width: 100%;
            }
            .hero17-button2 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}
export default Hero17;