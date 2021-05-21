import { FaInstagram, FaFacebook } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__container__misc-elements">
                    <h4>Booking information</h4>
                    <ul>
                        <a href="#" className="footer-link">
                            <li>How it works</li>
                        </a>
                        <a href="#" className="footer-link">
                            <li>Opening hours</li>
                        </a>
                        <a href="#" className="footer-link">
                            <li>Payment</li>
                        </a>
                    </ul>
                </div>
                <div className="footer__container__misc-elements">
                    <h4>Privacy</h4>
                    <ul>
                        <a href="#" className="footer-link">
                            <li>See what we gather</li>
                        </a>
                        <a href="#" className="footer-link">
                            <li>Secure information</li>
                        </a>
                    </ul>
                </div>
                <div className="footer__container__misc-elements">
                    <h4>Our partners</h4>
                    <ul>
                        <a href="#" className="footer-link">
                            <li>People we work with</li>
                        </a>
                        <a href="#" className="footer-link">
                            <li>Want to work togheter?</li>
                        </a>
                    </ul>
                </div>
                <div className="footer__container__misc-elements">
                    <h4>Social media</h4>
                    <ul className="social-media-icons">
                        <a href="#" className="footer-link">
                            <li>
                                <FaFacebook size={40} />
                            </li>
                        </a>
                        <a href="#" className="footer-link">
                            <li>
                                <FaInstagram size={40} />
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
            <div className="footer__copyright">Copyright 2020</div>
        </footer>
    );
}

export default Footer;
