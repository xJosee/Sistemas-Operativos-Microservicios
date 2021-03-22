
import '../../App.css';
import RamCake from './ram/ramcake'
import LineExample from './ram/line'
import Proc from './proc';
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ButtonGroup, Button } from "react-bootstrap";

function Modules() {
    const [loading, setLoading] = useState(false);
    const [indexSize, setIndexSize] = useState(0);
    const [size, setSize] = useState(1);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        setSize((indexSize === 0) ? 1 : (indexSize === 1) ? 1024 : 1024 * 1024)
    }, [indexSize])

    const renderPage = () => {
        return (
            <>
                <style type="text/css">
                    {`
                        .btn-optionRAM {
                            background-color: #f05454;
                            color: white;
                        }

                        .btn-optionRAM:hover {
                            color: #30475e;
                        }

                        .btn-optionRAMActive {
                            background-color: #30475e;
                            color: #f05454;
                        }

                        .btn-optionRAMActive:hover {
                            color: white;
                        }
                        .btn:focus{
                            outline:none;
                            box-shadow: none
                        }
                    `}
                </style>

                <div className="container">
                    <div className="row">
                        <div className="col-md-2 mx-auto" align="center">
                            <ButtonGroup style={{ paddingTop: 10 }}>
                                <Button variant={(indexSize === 0) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(0) }}>KB</Button>
                                <Button variant={(indexSize === 1) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(1) }}>MB</Button>
                                <Button variant={(indexSize === 2) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(2) }}>GB</Button>
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
            {renderPage()}
        </>
    );
}

export default Modules;