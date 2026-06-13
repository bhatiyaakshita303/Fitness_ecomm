import React from "react";

function Contact() {
    return (
        <div className="contact-page">
            <section className="contact-section">
                <div className="container">
                    <div className="contact-info">
                        <h4>CONTACT US</h4>
                        <div className="info-item">
                            <label>🏡 333 Middle Winchendon Rd, Rindge, NH 03461</label>
                        </div>
                        <div className="info-item">
                            <label>📞 125-711-811 | 125-668-886</label>
                        </div>
                        <div className="info-item">
                            <label>✉️ Support.gymcenter@gmail.com</label>
                        </div>
                    </div>
                    <div className="contact-form">
                        <form>
                            <input type="text" placeholder="Name" required />
                            <input type="email" placeholder="Email" required />
                            <input type="text" placeholder="Mobile Number" />
                            <textarea placeholder="Comment" rows="5" required></textarea>
                            <button className="con_btn">SUBMIT</button>
                        </form>
                    </div>
                </div>
            </section>

            <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120612.91300161625!2d72.78207618363064!3d21.164062395301293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04faf2751705b%3A0xb9cc9ee71a6b38c8!2sMy%20Fitness%20Zone%20Gym!5e1!3m2!1sen!2sin!4v1772539543655!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy">
                </iframe>

            </div>
        </div >
    )
}

export default Contact;