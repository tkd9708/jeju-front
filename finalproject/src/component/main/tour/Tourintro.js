import React,{Component} from 'react';
import './TourCss.css';
import udo from '../../../image/Tour_udo.jpg';
import seogwipo from '../../../image/Tour_seogwipo.jpg';
import aewol from '../../../image/Tour_aewol.jpg';
import andeok from '../../../image/Tour_andeok.jpg';
import daejung from '../../../image/Tour_daejung.jpg';
import gujwa from '../../../image/Tour_Gujwa.jpg';
import hangyeong from '../../../image/Tour_hangyeong.jpg';
import hanrim from '../../../image/Tour_hanrim.jpg';
import jeju from '../../../image/Tour_jeju.jpg';
import jocheon from '../../../image/Tour_jocheon.jpg';
import namwon from '../../../image/Tour_namwon.jpg';
import pyoseon from '../../../image/Tour_pyoseon.jpg';
import sungsan from '../../../image/Tour_sungsan.jpg';

class Tourintro extends Component {

    constructor(props){
        super(props);

        this.area = this.props.area;
    }

    render() {

        let img = this.area=="jeju"?<img id="jejuImg" src={jeju}/>:(this.area=="jocheon"?<img id="jocheonImg" src={jocheon}/>:
            (this.area=="aewol"?<img id="aewolImg" src={aewol}/>:(this.area=="andeok"?<img id="andeokImg" src={andeok}/>:
            (this.area=="daejung"?<img id="daejungImg" src={daejung}/>:(this.area=="gujwa"?<img id="gujwaImg" src={gujwa}/>:
            (this.area=="hangyeong"?<img id="hangyeongImg" src={hangyeong}/>:(this.area=="hanrim"?<img id="hanrimImg" src={hanrim}/>:
            (this.area=="namwon"?<img id="namwonImg" src={namwon}/>:(this.area=="pyoseon"?<img id="pyoseonImg" src={pyoseon}/>:
            (this.area=="seogwipo"?<img id="seogwipoImg" src={seogwipo}/>:(this.area=="sungsan"?<img id="sungsanImg" src={sungsan}/>:
            (this.area=="udo"?<img id="udoImg" src={udo}/>:""))))))))))));
        return (
            <div>
                {/* <h4>Tourintro {this.props.area}</h4> */}
                <div id="mainImg">
                    {img}
                </div>
            </div>
        );
    }
}

export default Tourintro;