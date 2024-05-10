import React from "react";
import Entry from "./Entry";
import emojiDB from "../emojipedia.js"




function createEntry(posts) {
  return (
    <Entry
    key={posts.id}
    id={posts.id}
    emoji={posts.emoji}
    name={posts.name}
    description={posts.meaning}
  />
  )
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojiDB.map(createEntry)}
        
      </dl>
    </div>
  );
}

export default App;
