import React from "react";
import "./about.css";

export default class Privacy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="about">
        <div className="title">
          <div className="yellow">P</div>rivacy
        </div>
        <div className="aboutText">
          In short, we do not share your data with anybody. Our data is uploaded
          to Google Cloud Vision, and that data obides by the{" "}
          <a href="https://cloud.google.com/sec…">
            Google Cloud's Privacy Policy
          </a>
        </div>
        <div className="privacyPolicy">
          Privacy Notice This privacy notice discloses the privacy practices for{" "}
          <a href="https://svisions.tech">svisions.tech</a>.
          <br />
          This privacy notice applies solely to information collected by this
          website. It will notify you of the following:
          <br />
          1. What personally identifiable information is collected from you
          through the website, how it is used and with whom it may be shared.
          <br />
          2. What choices are available to you regarding the use of your data.
          <br />
          3. The security procedures in place to protect the misuse of your
          information.
          <br />
          4. How you can correct any inaccuracies in the information.
          <br />
          <div className="bold">Information Collection, Use, and Sharing</div>
          We are the sole owners of the information collected on this site. We
          only have access to/collect information that you voluntarily give us
          via email or other direct contact from you. We will not sell or rent
          this information to anyone.
          <br />
          We will use your information to respond to you, regarding the reason
          you contacted us. We will not share your information with any third
          party outside of our organization, other than as necessary to fulfill
          your request, e.g. to ship an order.
          <br />
          Unless you ask us not to, we may contact you via email in the future
          to tell you about specials, new products or services, or changes to
          this privacy policy.
          <br />
          <div className="bold">
            Your Access to and Control Over Information
          </div>
          You may opt out of any future contacts from us at any time. You can do
          the following at any time by contacting us via the email address or
          phone number given on our website:
          <br />
          - See what data we have about you, if any.
          <br />
          - Change/correct any data we have about you.
          <br />
          - Have us delete any data we have about you.
          <br />- Express any concern you have about our use of your data.
          <div className="bold">Security</div>
          We take precautions to protect your information. When you submit
          sensitive information via the website, your information is protected
          both online and offline.
          <br />
          We do not collect any sensitive information. Any data transmitted is
          done so through secure protocols. You can verify this by looking for a
          lock icon in the address bar and looking for "https" at the beginning
          of the address of the Web page.
          <br />
          While we use encryption to protect sensitive information transmitted
          online, we also protect your information offline. Only employees who
          need the information to perform a specific job (for example, billing
          or customer service) are granted access to personally identifiable
          information. The computers/servers in which we store personally
          identifiable information are kept in a secure environment.
        </div>
      </div>
    );
  }
}
