import React, { useState } from 'react';
import LoginComponent from '../components/LoginComponent';
import talent from '../assets/talent1-removebg-preview.png';
import RegisterComponent from '../components/RegisterComponent';
export function HomePage() {

    const [isRegister, setRegister] = useState(false);
    return (
        <>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>

                <div style={{ marginLeft: 50, float: 'left' }}>
                    <img src={talent} alt="Talent" style={{ minWidth: 500, height: 'auto', borderRadius: 8 }} />
                </div>

                <div className="container" style={{ float: 'right', marginLeft: 200, backgroundColor: '#f2f2f2', borderRadius: 6, maxWidth: 500 }}>

                    {
                        !isRegister && <LoginComponent setRegister={setRegister} />
                    }

                    {
                        isRegister && <RegisterComponent setRegister={setRegister} />
                    }

                </div>

            </div>





        </>
    );
};

export default HomePage;