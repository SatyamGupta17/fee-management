import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Image from 'next/image';
const Testimonial = (props) => {
  return (
    <>
      <div className="thq-section-padding">
        <div className="testimonial18-max-width thq-section-max-width">
          <div className="testimonial18-container10">
            <h2 className="thq-heading-2">
              {props.heading1 ?? (
                <Fragment>
                  <span className="testimonial18-text35">What People Say</span>

                </Fragment>
              )}
            </h2>
            <span className="testimonial18-text11 thq-body-small">
              {props.content1 ?? (
                <Fragment>
                  <span className="testimonial18-text32">
                     I have been assisting parents in managing their children&apos;s school fees using this platform for the past year, and it has made the process so much more efficient and hassle-free. I highly recommend it to all parents for its convenience and reliability.!
                  </span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="thq-grid-2">
            {[1, 2, 3, 4].map((num) => (
              <div className="thq-animated-card-bg-2" key={`card-${num}`}>
                <div className="thq-animated-card-bg-1">
                  <div data-animated="true" className={`thq-card testimonial18-card${num}`}>
                    <div className={`testimonial18-container1${num + 1}`}>
                      <Image
                        alt={props[`author${num}Alt`]}
                        src={props[`author${num}Src`]}
                        className={`testimonial18-image${num}`}
                      />
                      <div className={`testimonial18-container1${num + 2}`}>
                        <strong className="thq-body-large">
                          {props[`author${num}Name`] ?? (
                            <Fragment>
                              <span className={`testimonial18-text${num + 25}`}>User {num}</span>
                            </Fragment>
                          )}
                        </strong>
                        <span className="thq-body-small">
                          {props[`author${num}Position`] ?? (
                            <Fragment>
                              <span className={`testimonial18-text${num + 24}`}>Role {num}</span>
                            </Fragment>
                          )}
                        </span>
                      </div>
                    </div>
                    <span className="testimonial18-text14 thq-body-small">
                      {props[`review${num}`] ?? (
                        <Fragment>
                          <span className={`testimonial18-text${num + 34}`}>Default review text.</span>
                        </Fragment>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .testimonial18-max-width {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .testimonial18-container10 {
            gap: var(--dl-space-space-unit);
            display: flex;
            max-width: 600px;
            align-items: center;
            margin-bottom: var(--dl-space-space-fourunits);
            flex-direction: column;
          }
          .testimonial18-text11 {
            text-align: center;
          }
          .testimonial18-container11 {
            gap: var(--dl-space-space-unit);
            display: flex;
            align-self: flex-start;
            align-items: center;
            flex-direction: row;
            justify-content: center;
          }
          .testimonial18-image1 {
            width: var(--dl-size-size-small);
            height: var(--dl-size-size-small);
            object-fit: cover;
            border-radius: var(--dl-radius-radius-round);
          }
          .testimonial18-container12 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .testimonial18-text14 {
            text-align: left;
          }
          @media (max-width: 991px) {
            .testimonial18-container10 {
              margin-bottom: var(--dl-space-space-threeunits);
            }
          }
          @media (max-width: 767px) {
            .testimonial18-container10 {
              margin-bottom: var(--dl-space-space-oneandhalfunits);
            }
            .testimonial18-card1,
            .testimonial18-card2,
            .testimonial18-card3,
            .testimonial18-card4 {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
};

Testimonial.propTypes = {
  heading1: PropTypes.node,
  content1: PropTypes.node,
  author1Name: PropTypes.node,
  author1Position: PropTypes.node,
  author1Alt: PropTypes.string,
  author1Src: PropTypes.string,
  review1: PropTypes.node,
  author2Name: PropTypes.node,
  author2Position: PropTypes.node,
  author2Alt: PropTypes.string,
  author2Src: PropTypes.string,
  review2: PropTypes.node,
  author3Name: PropTypes.node,
  author3Position: PropTypes.node,
  author3Alt: PropTypes.string,
  author3Src: PropTypes.string,
  review3: PropTypes.node,
  author4Name: PropTypes.node,
  author4Position: PropTypes.node,
  author4Alt: PropTypes.string,
  author4Src: PropTypes.string,
  review4: PropTypes.node,
};

export default Testimonial;
