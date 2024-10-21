import React, { useEffect, useRef, useState } from 'react';
import './welcome.css';
import Navbar from '../commons/Navbar';
import { Parallax } from 'react-parallax';
import img1 from '../images/home11-task.png'
import img2 from '../images/home22.png'
import img3 from '../images/home4-task1.png'
import { BiCalendarCheck } from "react-icons/bi";
import { BiChart } from "react-icons/bi";
import { BiCalendarEdit } from "react-icons/bi";
import { feedback } from '../feedback/feedback';
import ReactStars from 'react-rating-stars-component';
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { motion } from 'framer-motion';
import Footer from '../commons/Footer';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const navigate = useNavigate()
  const feedback1 = feedback
  const [first,setFirst] = useState(feedback1[0])
  const [second,setSecond] = useState(feedback1[1])
  const [third,setThird] = useState(feedback1[2])

  const sectionsRef = useRef([]);

  const [index, setIndex] = useState(0);

  const testimonialVariants = {
    initial: { opacity: 0,x:50 },
    animate: { opacity: 1,x:0},
    exit: { opacity: 0,x:0 },
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % feedback1.length);
  };
  const handlePrev = () => {
  setIndex((prevIndex) => (prevIndex - 1 + feedback1.length) % feedback1.length);
};

  useEffect(() => {

    setFirst(feedback1[index]);
    setSecond(feedback1[(index + 1) % feedback1.length]);
    setThird(feedback1[(index + 2) % feedback1.length]);

    const options = {
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-section');
        } else {
          entry.target.classList.remove('show-section');
        }
      });
    }, options);

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) {
            observer.unobserve(section);
          }
        });
      }
    };
  }, [index]);

  return (
    <div className='home'>
    <div className='home-main'>
      <Navbar />
      <div className='home1'> 
        <div className='home1-1'>
          <h1 className='home1-title'>TaskFlow</h1>
          <p className='home1-p'>Streamline your workflow, manage tasks efficiently, and achieve your goals faster!</p>
          <button class="cta-button" className='home1-a' onClick={()=>navigate('/signup')}>Get Started</button>
        </div>
        <div className='home1-2'>
          <img src={img1} alt='home-hero' />
        </div>
      </div>
      <section id="how-it-works" className='home2'>
        <h2 ref={(el) => sectionsRef.current[0] = el}>How TaskFlow Works</h2>
        <div className='home2-1'>
          <div class="steps-container">
            <section class="step1" ref={(el) => sectionsRef.current[1] = el}>
            <span><BiCalendarCheck/></span>
            <h3>Create a Task</h3>
          
          </section>
          <section class="step2" ref={(el) => sectionsRef.current[2] = el}>
            <span><BiChart/></span>
            <h3>Manage Your Board</h3>
          </section>
          <div class="step3" ref={(el) => sectionsRef.current[3] = el}>
            <span><BiCalendarEdit/></span>
            <h3>Collaborate & Track</h3>
          </div>
          </div>
          <div className='home2-1-hero'>
            <img src={img2} alt='hero-2' ref={(el) => sectionsRef.current[4] = el}/>
          </div>
        </div>
      </section>
      {/* ----------------------------------------------------------------------- */}


      <section className='home3'>
        <section className='home3-title'>
          <h1 ref={(el) => sectionsRef.current[5] = el}>Don't take our word for it</h1>
          <h1 ref={(el) => sectionsRef.current[6] = el}>Over 100+ people trust us</h1>
        </section>
        <div className='home3-testimonials' ref={(el) => sectionsRef.current[7] = el}>
          <motion.div
            className='test-1'
            key={`first-${index}`}
            variants={testimonialVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0 }}
          >
            <p>{first.feed}</p>
            <div className='stars'>
            <p>{first.name}</p>
            <ReactStars
              key={first.value}
              count={5}
              value={first.value}
              size={24}
              activeColor="#45a0ac"
              isHalf={true}
              edit={false}
              classNames='star-value'
            />
            </div>
            
          </motion.div>
          <motion.div
            className='test-2'
            key={`second-${index}`}
            variants={testimonialVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <p>{second.feed}</p>
            <div className='stars'>
            <p>{second.name}</p>
            <ReactStars
              key={second.value}
              count={5}
              value={second.value}
              size={18}
              activeColor="#45a0ac"
              isHalf={true}
              edit={false}
              classNames='star-value'
            />
            </div>
            
          </motion.div>
          <motion.div
            className='test-3'
            key={`third-${index}`}
            variants={testimonialVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <p>{third.feed}</p>
            <div className='stars'>
            <p>{third.name}</p>
            <ReactStars
              key={third.value}
              count={5}
              value={third.value}
              size={18}
              activeColor="#45a0ac"
              isHalf={true}
              edit={false}
              classNames='star-value'
            />
            </div>
            
          </motion.div>
        </div>
        <div className='home3-change'>
          <div className='change-prev'>
            <p onClick={handlePrev}><FiChevronLeft/></p>
          </div>
          <div className='change-next'>
            <p onClick={handleNext}><FiChevronRight/></p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}

      <section className='home4'>
        <div className='home4-desc'>
          <h2 ref={(el) => sectionsRef.current[8] = el}>Start Managing Your Tasks Today</h2>
          <p ref={(el) => sectionsRef.current[9] = el}>Sign up now to get access to powerful task management tools and features</p>
          <button onClick={()=>navigate('/signup')} className="cta-button" ref={(el) => sectionsRef.current[10] = el}>Sign Up for Free</button>
        </div>
        <div className='home4-img'>
          <img src={img3} className='home4-hero' ref={(el) => sectionsRef.current[11] = el}/>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}


      <section className='home-footer'>
        <Footer/>
      </section>

    </div>
    </div>
  );
};

export default Welcome;
