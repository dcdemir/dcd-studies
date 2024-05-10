import React from "react";
import './App.css';
import contacts from "../contacts";


function Card(item) {
        return (
            <>
                <div className="card">
                    <div className="top">
                        <h2 className="name">{item.name}</h2>
                        <img
                            src={item.imgURL}
                            alt="avatar_img"
                            className="circle-img"
                        />
                    </div>
                    <div className="bottom">
                        <p>{item.phone}</p>
                        <p>{item.email}</p>
                    </div>
                </div>
            </>
        )
}

function createCard(contact) {
    return (
        <Card
        key={contact.id}
        index={contact.id}
        name={contact.name}
        imgURL={contact.imgURL}
        phone={contact.phone}
        email={contact.email}
     />
    )
}


function App() {

        return (
            <>
                <div>
                    <h1 className="heading">My Contacts</h1>
                    {contacts.map(createCard)}

                    {/* <Card
                        name={contacts[0].name}
                        imgURL={contacts[0].imgURL}
                        phone={contacts[0].phone}
                        email={contacts[0].email}
                    />
                    <Card
                        name={contacts[1].name}
                        imgURL={contacts[1].imgURL}
                        phone={contacts[1].phone}
                        email={contacts[1].email}
                    />
                    <Card
                        name={contacts[2].name}
                        imgURL={contacts[2].imgURL}
                        phone={contacts[2].phone}
                        email={contacts[2].email}

                    /> */}
                    

                </div>
            </>
        )
}

export default App;
