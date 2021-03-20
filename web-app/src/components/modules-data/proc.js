import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
function Proc() {
    const [data, setData] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {

            fetchValues()

        }, 1500);
        return () => clearInterval(interval);

    }, []);

    const fetchValues = () => {
        fetch('http://34.67.69.50:7000/modulos/getProcesos')
            .then((response) => response.json())
            .then((json) => {
                setData(json)
                //console.log(json.length)
            })
            .catch((error) => console.error(error))
    }

    return (
        <div style={{ padding: 15, overflow: 'auto', height: 225 }}>
            <Table striped bordered hover size="sm">

                <tbody>
                    <tr>
                        <th>No</th>
                        <th>PadrePID</th>
                        <th>PIDe</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                    </tr>
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{item.PadrePID}</td>
                                <td>{item.PID}</td>
                                <td>{item.Nombre}</td>
                                <td>{            
                                    (item.Estado === '0') ? 'RUNNING' :
                                    (item.Estado === '1') ? 'INTERRUPTIBLE' :
                                    (item.Estado === '2') ? 'UNINTERRUPTIBLE' :
                                    (item.Estado === '4') ? 'STOPPED':
                                    (item.Estado === '8') ? 'TRACE' :
                                    (item.Estado === '16') ? 'EXIT_DEAD' :
                                    (item.Estado === '32') ? 'EXIT_ZOMBIE' :
                                    (item.Estado === '64') ? 'DEAD' :
                                    (item.Estado === '128') ? 'WAKEKILL' :
                                    (item.Estado === '256') ? 'WAKING' :
                                    (item.Estado === '512') ? 'PARKED' :
                                    (item.Estado === '1024') ? 'NOLOAD' :
                                    (item.Estado === '1026') ? 'SLEEPING' :
                                    (item.Estado === '2048') ? 'STATE_MAX'
                                    : item.Estado
                                    }</td>
                            </tr>
                        ))
                    }


                </tbody>
            </Table>
        </div>
    );
}

export default Proc;
