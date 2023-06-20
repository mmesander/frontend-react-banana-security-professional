import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {
                email: email,
                username: username,
                password: password,
            });
            if (response.data) {
                setEmail("");
                setUsername("");
                setPassword("");
                navigate("/signin")
            }
        } catch (e) {
            console.error("Registratie mislukt!")
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='reg-username-field'>
                    Email
                    <input
                        type="email"
                        name="reg-email"
                        id="reg-email-field"
                        placeholder="jouw@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor='reg-username-field'>
                    Gebruikersnaam
                    <input
                        type="text"
                        name="reg-username"
                        id="reg-username-field"
                        placeholder="Gebruikersnaam"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor='reg-password-field'>
                    Wachtwoord
                    <input
                        type="password"
                        name="reg-password"
                        id="reg-password-field"
                        placeholder="Wachtwoord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                >
                    Registreren
                </button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;