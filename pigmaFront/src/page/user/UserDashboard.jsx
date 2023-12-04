import UserHeader from '../../components/user/UserHeader'
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const UserDashboard = () => {
    const jwt = Cookies.get('jwt');
    const user = jwtDecode(jwt);

    return (
        <>
            <UserHeader />
            <main>
                <p className='welcomeClient'>Bienvenue {user.data.name}</p>
                <section className="form">
                    <h2>Publication d'un avis</h2>
                    <form >
                        <div className="form-element">
                            <label htmlFor="content">Contenu :</label>
                            <textarea
                                id="content"
                                name="content"
                                required
                            ></textarea>
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
                        <button type="submit">Publier l'avis</button>
                    </form>
                </section>
            </main>
        </>
    );
};

export default UserDashboard