import UserHeader from '../../components/user/UserHeader'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/public/Footer';

const UserDashboard = () => {

    const [content, setContent] = useState('');
    const [reviewPublished, setReviewPublished] = useState([])
    const [publishedError, setPublishedError] = useState(false)
    const [publishedValidate, setPublishedValidate] = useState(false)
    const [updateError, setUpdateError] = useState(false)
    const [updateValidate, setUpdateValidate] = useState(false)
    const [responseDeleteError, setResponseDeleteError] = useState(false)
    const [idUpdate, setIdUpdate] = useState(null);
    const [requestUpdate, setRequestUpdate] = useState(false);
    const [updateContentReview, setUpdateContentReview] = useState(null)
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
            setResponseDeleteError(true);
        }
    };
    const handleUpdate = (idUpdate, content) => {
        setUpdateContentReview(content)
        setRequestUpdate(true);
        setIdUpdate(idUpdate);
    };
    const confirmUpdate = async (event) => {
        event.preventDefault();

        const editedContent = document.getElementById('editedContent').value;
        const editedRating = document.getElementById('editedRating').value;

        const responseUpdateReview = await fetch(`http://localhost:3000/review/${idUpdate}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: editedContent,
                rating: editedRating,
            }),
        });

        if (responseUpdateReview.ok) {
            fetchReviewPublished()
            setUpdateValidate(true)
        } else {
            setUpdateError(true)
        }
        setRequestUpdate(false);
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
        const timeout = setTimeout(() => {
            setPublishedError(false);
            setPublishedValidate(false);
            setUpdateError(false);
            setUpdateValidate(false);
        }, 2500);

        return () => clearTimeout(timeout);
    }, [publishedError, publishedValidate, updateError, updateValidate]);

    return (
        <>
            <UserHeader />
            <main>
                {requestUpdate && (
                    <div className="edit-form-container">
                        <div className="edit-form-content">
                            <form onSubmit={confirmUpdate}>
                                <h2 className="edit-form-title">Modifier le Commentaire</h2>
                                <label htmlFor="editedContent">Nouveau Message :</label>
                                <textarea
                                    id="editedContent"
                                    name="editedContent"
                                    maxLength="100"
                                    defaultValue={updateContentReview}
                                    className="edit-form-textarea"
                                ></textarea>
                                <label htmlFor="editedRating">Nouvelle note :</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    max="5"
                                    min="0"
                                    id="editedRating"
                                    name="editedRating"
                                    className="edit-form-input rating"
                                />
                                <div className="edit-form-buttons">
                                    <button type="submit" className="edit-form-submit">
                                        Valider
                                    </button>
                                    <button
                                        type="button"
                                        className="edit-form-cancel"
                                        onClick={() => setRequestUpdate(false)}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <section className="welcome">
                    <p className='welcomeClient'>Bienvenue {user.data.name}</p></section>
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
                                step={0.5}
                                required
                            />
                        </div>
                        <div className="form-btn">
                            <button type="submit">Publier l'avis</button>
                        </div>
                        {publishedError && (
                            <div className="fail">Erreur lors de la publication, veuillez réessayer</div>
                        )}
                        {publishedValidate && (
                            <div className="success">Avis publié avec succès</div>
                        )}
                        {updateError && (
                            <div className="fail">Erreur lors de la modification, veuillez réessayer</div>
                        )}
                        {updateValidate && (
                            <div className="success">Avis modifié avec succès</div>
                        )}
                    </form>
                </section>
                <section className="reviewPublished">
                    {responseDeleteError && (
                        <div className="fail">Avis supprimé avec succés</div>
                    )}
                    <h2>Vos Avis Publiés</h2>
                    <div className="reviews-list">
                        {reviewPublished.map((review) => (
                            <div key={review.id} className="review-item">
                                <p>Contenu : {review.content}</p>
                                <p>Notation : {review.rating}</p>
                                <p>Date de création : {formattedDate(review.createdAt)}</p>
                                <div className="review-buttons">
                                    <button className='update-button' onClick={() => handleUpdate(review.id, review.content, review.rating)}>Modifier</button>
                                    <button onClick={() => handleDeleteReview(review.id)} className='delete-button'>
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default UserDashboard