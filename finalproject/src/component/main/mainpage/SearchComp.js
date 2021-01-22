import React, {Component} from "react";

class SearchComp extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="searchComp">
                searchComp
                <br/>
                {this.props.name}<br/>
                <select>
                    <option>All</option>
                    <option>Location</option>
                    <option>Tour</option>
                    <option>Tag</option>
                </select>
                <input type="text" placeholder="Input For Search."/>
                <button type="button">Search</button>
            </div>
        )
    }

}

export default SearchComp;
