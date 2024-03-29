
import '../App.css';
import jose from '../assets/Jose.jfif';
import moran from '../assets/Moran.jfif'
import cante from '../assets/Cante.jpg'

function About() {
    return (
        <div className="container">
            <div className="row mt-4">
                <h3>Desarrolladores</h3>
            </div>
            <div className="row">
                <div className="col-md-4 mx-auto mt-3" align="center">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={jose} alt="Card image cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">José Luis Herrera</h5>
                            <p className="card-text">201807431</p>
                            <a href="https://github.com/xJosee" className="btn btn-primary">GitHub Profile</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mx-auto mt-3" align="center">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={cante} alt="Card image cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">Jorge Alexander Canté</h5>
                            <p className="card-text">201800499</p>
                            <a href="https://github.com/JACLs" className="btn btn-primary">GitHub Profile</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mx-auto mt-3" align="center">
                    <div className="card" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={moran} alt="Card image cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">José Eduardo Morán</h5>
                            <p className="card-text">201807455</p>
                            <a href="https://github.com/josemoran40" className="btn btn-primary">GitHub Profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;