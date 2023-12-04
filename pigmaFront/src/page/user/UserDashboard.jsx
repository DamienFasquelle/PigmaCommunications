import UserHeader from '../../components/user/UserHeader'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {

    const navigate = useNavigate()
    const [content, setContent] = useState('');
    const [reviewPublished, setReviewPublished] = useState([])
    const [publishedError, setPublishedError] = useState(false)
    const [publishedValidate, setPublishedValidate] = useState(false)
    const [responseDeleteError, setResponseDeleteError] = useState(false)
    const jwt = Cookies.get('jwt');
    const user = jwtDecode(jwt);

    const fetchReviewPublished = async () => {
        const responseAPI = await fetch("http://localhost:3000/review")
        const responseJson = await responseAPI.json()
        const userReviews = responseJson.data
            .filter((review) => review.UserId === user.data.id)
            .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        setReviewPublished(userReviews);
    }

    const handleClickPostReview = async (event) => {
        event.preventDefault()

        const content = event.target.content.value;
        const rating = event.target.rating.value;

        const reviewDataReview = {
            content: content,
            rating: parseInt(rating)
        };
        const responsePostReview = await fetch(`http://localhost:3000/review`, {
            method: 'POST',
            body: JSON.stringify(reviewDataReview),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (responsePostReview.ok) {
            setPublishedValidate(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            setPublishedError(true);
        }
    };
    const handleDeleteReview = async (idDelete) => {
        const responseDeleteReview = await fetch(`http://localhost:3000/review/${idDelete}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (responseDeleteReview.ok) {
            fetchReviewPublished();
        } else {
            responseDeleteError(true);
        }
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
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
            <UserHeader />
            <main>
                <p className='welcomeClient'>Bienvenue {user.data.name}</p>
                <section className="form-review form">
                    <h2>Publication d'un avis</h2>
                    <form onSubmit={handleClickPostReview}>
                        <div className="form-element">
                            <label htmlFor="content">Contenu :</label>
                            <textarea
                                id="content"
                                name="content"
                                maxLength={300}
                                value={content}
                                onChange={handleContentChange}
                                required
                            ></textarea>
                            <span className="char-count">
                                {content.length}/300
                            </span>
                        </div>
                        <div className="form-element">
                            <label htmlFor="rating">Notation (0 à 5) :</label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                min={0}
                                max={5}
                                step={0.1}
                                required
                            />
                        </div>
                        <div className="form-btn">
                            <button type="submit">Publier l'avis</button>
                        </div>
                        {publishedError && (
                            <div className="connexionFail">Erreur lors de la publication, veuillez réessayer</div>
                        )}
                        {publishedValidate && (
                            <div className="connexionFail">Avis publié avec succès</div>
                        )}
                    </form>
                </section>
                <section className="reviewPublished">
                    {responseDeleteError && (
                        <div className="connexionFail">Avis supprimé avec succés</div>
                    )}
                    <h2>Vos Avis Publiés</h2>
                    <div className="reviews-list">
                        {reviewPublished.map((review) => (
                            <div key={review.id} className="review-item">
                                <p>Contenu : {review.content}</p>
                                <p>Notation : {review.rating}</p>
                                <p>Date de création : {formattedDate(review.createdAt)}</p>
                                <div className="review-buttons">
                                    {/* /* <button onClick={() => handleEditReview(review.id)} className='update-button'>
                                        Modifier
                                    </button> */}
                                    <button onClick={() => handleDeleteReview(review.id)} className='delete-button'>
                                        Supprimer
                                    </button>
                                    <button className='update-button'>
                                        Modifier
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};

export default UserDashboard