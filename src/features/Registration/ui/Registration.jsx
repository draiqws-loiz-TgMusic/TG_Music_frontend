import React from 'react';
const Registration = ({logins, passwords, setLogins, setPasswords}) => {
    return (
        <div>
            <div>
                <label>Login:</label> {/*Будет внутри поля написано*/}
                <input
                    type="text"
                    value={logins}
                    onChange={(e) => setLogins(e.target.value)}
                    required //Обязательно для заполнения
                /> 
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={passwords}
                        onChange={(e) => setPasswords(e.target.value)}
                        required
                    />
                </div>
        </div>
    );
};

export default Registration;
