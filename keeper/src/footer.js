import React from 'react';
import "./css/styles.css"

function Footer() {

    return (
        <>
            <section id="footer">
            <div>
                <p> Copyright © {new Date().getFullYear()}</p>
            </div>
            </section>
        </>
    )

}

export default  Footer;