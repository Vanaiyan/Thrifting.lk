// src/Components/Terms.js

import React from 'react';

const Terms = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderBottom: '2px solid #ccc',
    paddingBottom: '10px',
  };

  const sectionTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '20px',
  };

  const paragraphStyle = {
    marginBottom: '10px',
    textAlign: 'justify',
  };

  const listStyle = {
    paddingLeft: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Terms and Conditions</h1>

      <p style={paragraphStyle}>
        Welcome to Thrifting.lk! These terms and conditions outline the rules and regulations for the use of Thrifting.lk's Website, located at [Your Website URL].
      </p>

      <p style={paragraphStyle}>
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Thrifting.lk if you do not agree to take all of the terms and conditions stated on this page.
      </p>

      <h2 style={sectionTitleStyle}>Intellectual Property Rights</h2>
      <p style={paragraphStyle}>
        Other than the content you own, under these terms, Thrifting.lk and/or its licensors own all the intellectual property rights and materials contained in this website.
      </p>

      <p style={paragraphStyle}>
        You are granted limited license only for purposes of viewing the material contained on this website.
      </p>

      <h2 style={sectionTitleStyle}>Restrictions</h2>
      <ul style={listStyle}>
        <li style={paragraphStyle}>publishing any website material in any other media;</li>
        <li style={paragraphStyle}>selling, sublicensing and/or otherwise commercializing any website material;</li>
        <li style={paragraphStyle}>publicly performing and/or showing any website material;</li>
        <li style={paragraphStyle}>using this website in any way that is or may be damaging to this website;</li>
        <li style={paragraphStyle}>using this website in any way that impacts user access to this website;</li>
        <li style={paragraphStyle}>using this website contrary to applicable laws and regulations, or in any way may cause harm to the website, or to any person or business entity;</li>
        <li style={paragraphStyle}>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this website;</li>
        <li style={paragraphStyle}>using this website to engage in any advertising or marketing.</li>
      </ul>

      <h2 style={sectionTitleStyle}>Your Content</h2>
      <p style={paragraphStyle}>
        In these terms and conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this website. By displaying Your Content, you grant Thrifting.lk a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
      </p>

      <p style={paragraphStyle}>
        Your Content must be your own and must not be invading any third-party's rights. Thrifting.lk reserves the right to remove any of Your Content from this website at any time without notice.
      </p>

      <h2 style={sectionTitleStyle}>No warranties</h2>
      <p style={paragraphStyle}>
        This website is provided "as is," with all faults, and Thrifting.lk expresses no representations or warranties, of any kind related to this website or the materials contained on this website. Also, nothing contained on this website shall be interpreted as advising you.
      </p>

      <h2 style={sectionTitleStyle}>Limitation of liability</h2>
      <p style={paragraphStyle}>
        In no event shall Thrifting.lk, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Thrifting.lk, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.
      </p>

      <h2 style={sectionTitleStyle}>Indemnification</h2>
      <p style={paragraphStyle}>
        You hereby indemnify to the fullest extent Thrifting.lk from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these terms.
      </p>

      <h2 style={sectionTitleStyle}>Severability</h2>
      <p style={paragraphStyle}>
        If any provision of these terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
      </p>

      <h2 style={sectionTitleStyle}>Variation of Terms</h2>
      <p style={paragraphStyle}>
        Thrifting.lk is permitted to revise these terms at any time as it sees fit, and by using this website you are expected to review these terms on a regular basis.
      </p>

      <h2 style={sectionTitleStyle}>Assignment</h2>
      <p style={paragraphStyle}>
        The Thrifting.lk is allowed to assign, transfer, and subcontract its rights and/or obligations under these terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these terms.
      </p>

      <h2 style={sectionTitleStyle}>Entire Agreement</h2>
      <p style={paragraphStyle}>
        These terms constitute the entire agreement between Thrifting.lk and you in relation to your use of this website, and supersede all prior agreements and understandings.
      </p>

      <h2 style={sectionTitleStyle}>Governing Law & Jurisdiction</h2>
      <p style={paragraphStyle}>
        These terms will be governed by and interpreted in accordance with the laws of the jurisdiction of [Your Country], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your City] for the resolution of any disputes.
      </p>
    </div>
  );
}

export default Terms;
