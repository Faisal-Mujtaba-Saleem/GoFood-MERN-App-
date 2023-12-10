import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Footer(props) {
  return (
    <footer className="bg-success text-light py-4">
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-md-3">
            <h5>{props.appTitle}</h5>
            <p>{props.appDescription}</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {
                props.appLinks.map((appLink, index) => {
                  if (appLink.label === "Orders" && !localStorage.getItem("authToken")) {
                    return;
                  }
                  return (
                    <li key={index}>
                      <Link to={`/${appLink.link}`} className="text-light">{appLink.label}</Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {
            localStorage.getItem("authToken") &&
            <div className="col-md-3">
              <h5>My Cart</h5>
              <span type="button" className="text-light position-relative" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
            </div>
          }
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <p>  Email: <span className="text-decoration-underline">{props.email}</span></p>
            <p>  Phone: <span className="text-decoration-underline">{props.phone}</span></p>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>&copy; {new Date().getFullYear()} goFood. All rights reserved.</p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  appName: PropTypes.string.isRequired,
  appDescription: PropTypes.string.isRequired,
  appLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  )
};

Footer.defaultProps = {
  appName: 'Your App Name',
  appDescription: 'Your app description.',
  appLinks: [],
};