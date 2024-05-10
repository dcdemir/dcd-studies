import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from '../notes';


function createNote(items) {
  return (
    <Note
      key={items.key}
      id={items.key}
      title={items.title}
      content={items.content}
    />
  )    
}

function App() {

  return (
    <div>
      <Header />
      {notes.map(createNote)}
      <Footer />
    </div>
  );
}

export default App;
