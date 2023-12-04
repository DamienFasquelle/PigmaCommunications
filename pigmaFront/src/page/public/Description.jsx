import React, { useEffect, useState } from 'react'

const Description = () => {

    const [reviewPublished, setReviewPublished] = useState([])

    const fetchReviewPublished = async () => {
        const responseAPI = await fetch("http://localhost:3000/review")
        const responseJson = await responseAPI.json()
        const userReviews = responseJson.data
            .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        setReviewPublished(userReviews);
    }

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const formatted = date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        return formatted.replace(',', '');
    };

    useEffect(() => {
        fetchReviewPublished()
    }, []);
    return (
        <>
            <section class="container">
                <div class="container-text">
                    <h1>Connectez-vous à un monde de possibilités</h1>
                    <p>
                        Découvrez notre page d'accueil conviviale et explorez un univers de services connectés. Explorez, créez et connectez-vous avec facilité pour donner vie à vos idées. Plongez dans un monde d'opportunités grâce à notre page d'accueil intuitive. Explorez, interagissez et découvrez des outils conçus pour simplifier votre expérience en ligne.
                    </p>
                </div>
            </section>
            <section className="reviewPublished">
                <h2>Avis Publiés</h2>
                <div className="reviews-list">
                    {reviewPublished.map((review) => (
                        <div key={review.id} className="review-item">
                            <p>{review.name}</p>
                            <p>Contenu : {review.content}</p>
                            <p>Notation : {review.rating}</p>
                            <p>Date de création : {formattedDate(review.createdAt)}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Description