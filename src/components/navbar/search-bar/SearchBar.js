import { useState } from "react";
import "./search-bar.css";

const SearchBar = (props) => {
	const [ typedText, setTypedText ] = useState('');
	const handleSubmit = async (event) => {
  	event.preventDefault();
    props.onSubmit(typedText);
    setTypedText('');
  };

  	return (
    	<form onSubmit={handleSubmit}>
    	  <input 
          type="text" 
          className="text-bar"
          value={typedText}
          onChange={event => setTypedText(event.target.value)}
          placeholder="search launch name, rocket name, launch agency, mission name or spacecraft name" 
          required 
        />
        <button className="search-button">Search</button>
    	</form>
    );
}

export default SearchBar;