
import '../../App.css';
import RamCake from './ram/ramcake'
import LineExample from './ram/line'
import Proc from './proc';
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Modules() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const renderPage = () => {
        return (
            <>
                <div className="row">
                    <div className="col-md-6" >
                        <LineExample />
                    </div>
                    <div className="col-md-6">
                        <RamCake />
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