
import '../../App.css';
import RamCake from './ram/ramcake'
import LineExample from './ram/line'
import Proc from './proc';
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ButtonGroup, Button } from "react-bootstrap";

function Modules() {
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState(1);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        setSize(size)
    },[size])

    const renderPage = () => {
        return (
            <>
                <style type="text/css">
                    {`
                        .btn-optionSide {
                            background-color: #f05454;
                            color: white;
                        }

                        .btn-optionCenter {
                            background-color: #30475e;
                            color: white;
                        }

                        .btn-optionCenter:hover {
                            color: #f05454;
                        }
                    `}
                </style>

                <div className="row">
                    <div className="col-md-2 mx-auto" align="center">
                        <ButtonGroup style={{ paddingTop: 10 }}>
                            <Button variant="optionSide" onClick={() => {setSize(1)}}>KB</Button>
                            <Button variant="optionCenter" onClick={() => {setSize(1024)}}>MB</Button>
                            <Button variant="optionSide" onClick={() => {setSize(1024*1024)}}>GB</Button>
                        </ButtonGroup>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-md-6" >
                        <LineExample size={size} />
                    </div>
                    <div className="col-md-6">
                        <RamCake size={size} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Proc />
                    </div>
                </div>
            </>
        );
    }

    const renderLoader = () => {
        return (
            <div className="wrapper">
                <h1 className="title">Covid App</h1>
                <ClipLoader color={"#000"} loading={loading} size={40} />
            </div>
        );
    }

    return (
        <>
            {loading ? renderLoader() : null}
            { renderPage()}
        </>
    );
}

export default Modules;