import React from "react";
import '../styles/footer.css';

export default function Footer(){
    return (

        <footer class="footer" style={{position: 'absolute', bottom: '0',marginTop: '100px'}}>
            <div class="waves">
                <div class="wave" id="wave1"></div>
                <div class="wave" id="wave2"></div>

            </div>
            <p>&copy;Isabella + Shivani | All Rights Reserved</p>
        </footer>
    );
};

// export default Footer;