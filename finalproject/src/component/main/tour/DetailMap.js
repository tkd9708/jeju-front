import React,{Component} from 'react';

class DetailMap extends Component {

    render() {
        const {title} = this.props;
        return (
            <div>
                <div style={{marginLeft: '200px', marginRight: '200px'}}>
                    <h1 style={{fontWeight: '900'}}>명소 주변</h1>
                    <br/>
                    <div className="map_wrap" style={{textAlign: 'center'}}>
                        <div id="map" style={{width:'100%', height:'100%', position:'relative', overflow:'hidden'}}></div>
                        <ul id="category">
                            <li id="FD6" data-order="0"> 
                                <span className="category_bg restaurant"></span>
                                음식점
                            </li>  
                            <li id="CE7" data-order="1"> 
                                <span className="category_bg cafe"></span>
                                카페
                            </li>
                            <li id="AD5" data-order="2"> 
                                <span className="category_bg hotel"></span>
                                숙박
                            </li>     
                        </ul>   
                        <input type="hidden" value={title} id="keyword" size="15"></input>
                    </div>
                    <br/><br/>
                    <ul id="placesList"></ul>
                    <div id="pagination"></div>
                </div>

                
            </div>
        );
    }
}

export default DetailMap;