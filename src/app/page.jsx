'use client'
import React from 'react'
import Head from 'next/head'
import Hero17 from '../../components/hero17'
import Design from '../../components/design'
import Features24 from '../../components/features24'
import CTA26 from '../../components/cta26'
import Features25 from '../../components/features25'
import Steps2 from '../../components/steps2'
import Testimonial from '../../components/testimonial' 
import dotenv from 'dotenv';
dotenv.config();

const Home = (props) => {
  
  return (
    <>
      <div className="home-container">
        <Head>
          <title>Prakash Public School</title>
          <meta property="og:title" content="Red Political Squirrel"/>
        </Head>
        <Hero17/>
        <Design/>
        <Features24/>
        <CTA26/>
        <Features25/>
        <Steps2/>
        <Testimonial
          author1Name={<span>Arvind Kumar Gupta</span>}
          author1Position={<span>School Administrator</span>}
          author1Src=""
          review1={<span>Effortless fee management. Highly recommend!</span>}
          author2Name={<span>Umang Gupta</span>}
          author2Position={<span>School Head</span>}
          author2Src=""
          review2={<span>Great for tracking student payments!</span>}
          author3Name={<span>Swadesh Sharma</span>}
          author3Position={<span>Clerk</span>}
          author3Src=""
          review3={<span>Great for tracking student payments!</span>}
          author4Name={<span>Satyam Gupta</span>}
          author4Position={<span>Developer</span>}
          author4Src=""
          review4={<span>Its created by me</span>}
        />


      </div>
      <style jsx>
        {`
           .home-container {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .home-text114 {
            display: inline-block;
          }
          .home-text115 {
            display: inline-block;
          }
          .home-text116 {
            display: inline-block;
          }
          .home-text117 {
            display: inline-block;
          }
          .home-text118 {
            display: inline-block;
          }
          .home-text119 {
            display: inline-block;
          }
          .home-text120 {
            display: inline-block;
          }
          .home-text121 {
            display: inline-block;
          }
          .home-text122 {
            display: inline-block;
          }
          .home-text123 {
            display: inline-block;
          }
          .home-text124 {
            display: inline-block;
          }
          .home-text125 {
            display: inline-block;
          }
          .home-text126 {
            display: inline-block;
          }
          .home-text127 {
            display: inline-block;
          }
          .home-text128 {
            display: inline-block;
          }
          .home-text129 {
            display: inline-block;
          }
          .home-text130 {
            display: inline-block;
          }
          .home-text131 {
            display: inline-block;
          }
          .home-text132 {
            display: inline-block;
          }
          .home-text133 {
            display: inline-block;
          }
          .home-text186 {
            display: inline-block;
          }
          .home-text187 {
            display: inline-block;
          }
          .home-text188 {
            display: inline-block;
          }
          .home-text189 {
            display: inline-block;
          }
          .home-text190 {
            display: inline-block;
          }
          .home-text191 {
            display: inline-block;
          }
          .home-text192 {
            display: inline-block;
          }
          .home-text193 {
            display: inline-block;
          }
        `}
      </style>
    </>
  )
}

export default Home
