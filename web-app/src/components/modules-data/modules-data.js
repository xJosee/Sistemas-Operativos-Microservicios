
import '../../App.css';
import RamCake from './ram/ramcake'
import LineExample from './ram/line'
import Proc from './proc';
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ButtonGroup, Button, Jumbotron } from "react-bootstrap";

function Modules() {
    const [loading, setLoading] = useState(false);
    const [indexSize, setIndexSize] = useState(0);
    const [size, setSize] = useState(1);
    const [free, setFree] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2500);
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
<<<<<<< HEAD
        <div className="container">
            <div className="row">
                <div className="col-md-2 mx-auto" align="center">
                    <ButtonGroup style={{ paddingTop: 10, paddingBottom: 15 }}>
                        <Button variant={(indexSize === 0) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(0) }}>KB</Button>
                        <Button variant={(indexSize === 1) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(1) }}>MB</Button>
                        <Button variant={(indexSize === 2) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(2) }}>GB</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <Jumbotron >
                        <h2 style={{ textAlign: "left", color: "#30475e" }}>  {(size === 1) ? total + 'KB' : (size === 1024) ? (total / size).toFixed(2) + 'MB' : (total / size).toFixed(4) + 'GB'}</h2>
                        <h3><span style={{ color: "#30475e" }}>Usada</span> | <span style={{ color: "#f05454" }}>Libre</span></h3>
                        <h2 style={{ textAlign: "right", color: "#f05454" }}> {(size === 1) ? total - free + 'KB' : (size === 1024) ? ((total - free) / size).toFixed(2) + 'MB' : ((total - free) / size).toFixed(4) + 'GB'}</h2>
                    </Jumbotron>
                </div>
=======

                <div className="container">
                    <div className="row">
                        <div className="col-md-2 mx-auto" align="center">
                            <ButtonGroup style={{ paddingTop: 10 }}>
                                <Button variant={(indexSize === 0) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(0) }}>KB</Button>
                                <Button variant={(indexSize === 1) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(1) }}>MB</Button>
                                <Button variant={(indexSize === 2) ? "optionRAMActive" : "optionRAM"} onClick={() => { setIndexSize(2) }}>GB</Button>
                            </ButtonGroup>
                        </div>
<<<<<<< HEAD
>>>>>>> graficas
=======
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <Jumbotron >
                                <h2><span style ={{color:"#30475e"}}>Usada</span> | <span style ={{color:"#f05454"}}>Libre</span></h2>
                                <h3 style={{textAlign: "center"}}>
                                    <span style={{ color:"#30475e" }}>  { (size === 1) ? total + 'KB' : (size === 1024) ? (total/size).toFixed(2) + 'MB' : (total/size).toFixed(4) + 'GB'  }</span> |
                                    <span style={{ color:"#f05454"}}> { (size === 1) ? total-free + 'KB' : (size === 1024) ? ((total-free)/size).toFixed(2) + 'MB' : ((total-free)/size).toFixed(4) + 'GB'  }</span>
                                </h3>
                                
                            </Jumbotron>
                        </div>
>>>>>>> 6b0c297d9e37fbff7a30be22fc1513bdfe923474
                    </div>
                    <div className="row">
                        <div className="col-md-6" >
                            <LineExample libre={free} total={total} size={size} />
                        </div>
                        <div className="col-md-6">
                            <RamCake libre={free} total={total} />
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