import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../helpers/api';
import './connexionForm.css';


const ConnexionForm = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/users/login', {
                    userName,
                    password
                }
            );

            const data = response.data;
            console.log({token:data.token});
            localStorage.setItem('token', data.token);

            if (response.status !== 200) {
                throw new Error(data.message || 'Erreur lors de la connexion');
            }
            console.log(response);
            navigate('/nouvelle-recette');

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="connexion-form">
            <fieldset className="fieldset">
                <legend>Connexion</legend>
                    <form onSubmit={handleSubmit}>
                        <div className='field label max border round fill'>
                            <input type="text" id="userName" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                            <label htmlFor="userName">Nom d'utilisateur</label>
                        </div>
                        <div className='field label max border round fill'>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <label htmlFor="password">Mot de passe</label>
                        </div>
                        <button type="submit">Se connecter</button>
                    </form>
                {error && <p className="error-message">{error}</p>}
                <div className="connexion-form__footer">    
                    <p>Vous n'avez pas de compte ? <a href="/inscription">Inscrivez-vous ici</a></p>
                </div>  
            </fieldset>
        </div>
    );
}

export default ConnexionForm;