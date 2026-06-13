import react from "react";

function Footer() {
    return (
        <div className="Footer-page">
            <footer>
                <div className="footer-top">
                    <h2>GET STARTED TODAY</h2>
                    <p>New student special! $30 unlimited Gym for the first week anh 50% of our member!</p>
                    <button className="book-btn">BOOK NOW</button>
                </div>
                <div className="footer-main">
                    <div className="footer-section">
                        <h3><i className="fa fa-dumbbell"></i> ACTIVITAR</h3>
                        <p>Despite growth of the Internet over the past seven years, the use of toll-free phone numbers in television
                            advertising continues.</p>
                        <div className="social-icons">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>OUR BLOG</h4>
                        <p>Most People Who Work<br /><small>JAN 02, 2019</small></p>
                        <p>Freelance Design Tricks How<br /><small>JAN 02, 2019</small></p>
                        <p>Have A Computer At Home Have Had<br /><small>JAN 02, 2019</small></p>
                    </div>

                    <div className="footer-section">
                        <h4>PROGRAM</h4>
                        <p>Bodybuilding</p>
                        <p>Running</p>
                        <p>Streching</p>
                        <p>Weight Loss</p>
                        <p>Gym FlexZone</p>
                    </div>

                    <div className="footer-section">
                        <h4>GET INFO</h4>
                        <p>📞 Phone: (12) 345 6789</p>
                        <p>📧 Email: Colorlib.info@gmail.com</p>
                        <p>🏠 Address: Iris Watson, Box 283 8562</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    Copyright ©2025 All rights reserved | This template is made with ❤ by Colorlib
                </div>
            </footer>
        </div>
    )
}

export default Footer;