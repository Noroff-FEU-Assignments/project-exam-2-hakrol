import Button from "react-bootstrap/Button";

function Hero() {
    return (
        <div className="hero_image">
            <div className="hero_content">
                <h1>Find the best place in Bergen!</h1>
                <Button className="btn-primary" size="lg" href="/places">
                    See places
                </Button>
            </div>
            <div className="testimonial-card">
                <div className="testimonial-card_image"></div>
                <div className="testimonial-card_text">
                    <div className="testimonial-card_text_paragraph">
                        "If you aren't sure, always go for Holidaze. Holidaze
                        should be nominated for service of the year. Gladly
                        recommend!"
                    </div>
                    <div className="testimonial-card_text_name">Arabela N.</div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
