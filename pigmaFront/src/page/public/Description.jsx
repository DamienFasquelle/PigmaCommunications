import React from 'react'

const Description = () => {
    return (
        <>
            <section class="container">
                <h1>Connectez-vous à un monde de possibilités</h1>
                <div class="container-text">
                    <p>
                        Découvrez notre page d'accueil conviviale et explorez un univers de services connectés. Explorez, créez et connectez-vous avec facilité pour donner vie à vos idées.
                    </p>
                    <img src={process.env.PUBLIC_URL + '/fondDescription.jpg'} alt="pigma description" />
                </div>
            </section>
            <section class="presentation">
                <div class="presentation-text">
                    <h2>Bienvenue dans votre espace numérique.</h2>
                    <p>
                        Plongez dans un monde d'opportunités grâce à notre page d'accueil intuitive. Explorez, interagissez et découvrez des outils conçus pour simplifier votre expérience en ligne.
                    </p>
                </div>
            </section>
            <section class="review">
                <div class="review-card">

                </div>
            </section>
        </>
    )
}

export default Description