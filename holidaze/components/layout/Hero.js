import Button from "react-bootstrap/Button";

function Hero() {
    return (
        <div className="hero__image">
            <div className="hero__content">
                <h1>Find the best place in Bergen!</h1>
                <Button className="btn-primary" size="lg" href="/places">
                    See places
                </Button>
            </div>
            <div className="testimonial-card">
                <div className="testimonial-card__image"></div>
                <div className="testimonial-card__text">
                    <div className="testimonial-card__text__paragraph">
                        "If you aren't sure, always go for Holidaze. Holidaze
                        should be nominated for service of the year. Gladly
                        recommend!"
                    </div>
                    <div className="testimonial-card__text__name">
                        Arabela N.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
