import { useState } from "react";
import { api } from "../../helpers/api";

const InscriptionForm = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await api.post('/users/signup', {
                userName,
                email,
                password
            });

            if (response.status === 201) {
                setSuccess("Inscription réussie ! Vous pouvez vous connecter.");
                setUserName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Erreur lors de l'inscription");
            } else {
                setError("Serveur injoignable");
            }
        }
    };

    return (
        <div className="register-form">
            <fieldset className="fieldset">
                <legend>Créer un compte</legend>
                <form onSubmit={handleSubmit}>
                    <div className='field label max border round fill'>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <label htmlFor="userName">Nom d'utilisateur</label>
                    </div>
                    <div className='field label max border round fill'>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className='field label max border round fill'>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Mot de passe</label>
                    </div>
                    <div className='field label max border round fill'>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                    </div>
                    <button type="submit">S'inscrire</button>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <div className="register-form__footer">
                    <p>Déjà un compte ? <a href="/connexion">Connectez-vous ici</a></p>
                </div>
            </fieldset>
        </div>
    );
};

export default InscriptionForm;