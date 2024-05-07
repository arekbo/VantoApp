import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import randomusersService from "./components/Services/randomuser.service";
import usersService from "./components/Services/user.service";
import generatorService from "./components/Services/generator.service";
import { safeNewDate } from "./components/Utils/safeNewDate";
import * as ReactBootStrap from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdMoreVert } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdCloudDownload } from "react-icons/md";
import './App.css';

const App = () => {

    const usersStatic = [
        { id: 0, nazwa: "User Zero", adresEmail: "u0@home.com", numerTelefonu: "+48-000-000-000", dataUtworzenia: "2024-04-27T17:47:51.335Z", status: false, pictureThumbnailUrl: "https://randomuser.me/api/portraits/thumb/men/72.jpg", pictureMediumUrl: "https://randomuser.me/api/portraits/med/men/72.jpg", pictureLargeUrl: "https://randomuser.me/api/portraits/men/72.jpg" },
        { id: 1, nazwa: "User One", adresEmail: "u1@home.com", numerTelefonu: "+48-000-000-001", dataUtworzenia: "2024-04-28T17:47:51.335Z", status: false, pictureThumbnailUrl: "https://randomuser.me/api/portraits/thumb/men/73.jpg", pictureMediumUrl: "https://randomuser.me/api/portraits/med/men/73.jpg", pictureLargeUrl: "https://randomuser.me/api/portraits/men/73.jpg" },
        { id: 2, nazwa: "User Two", adresEmail: "u2@home.com", numerTelefonu: "+48-000-000-002", dataUtworzenia: "2024-04-29T17:47:51.335Z", status: false, pictureThumbnailUrl: "https://randomuser.me/api/portraits/thumb/men/74.jpg", pictureMediumUrl: "https://randomuser.me/api/portraits/med/men/74.jpg", pictureLargeUrl: "https://randomuser.me/api/portraits/men/74.jpg" },
        { id: 3, nazwa: "User Three", adresEmail: "u3@home.com", numerTelefonu: "+48-000-000-003", dataUtworzenia: "2024-04-30T17:47:51.335Z", status: false, pictureThumbnailUrl: "https://randomuser.me/api/portraits/thumb/men/75.jpg", pictureMediumUrl: "https://randomuser.me/api/portraits/med/men/75.jpg", pictureLargeUrl: "https://randomuser.me/api/portraits/men/75.jpg" }
    ];

    const [data, setData] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [col, setCol] = useState("nazwa");

    const [show, setShow] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const handleClose = () => setShow(false);
    const handleCloseAddUser = () => setShowAddUser(false);
    const [userId, setUserId] = useState(-1);

    const [showRowNazwa, setShowRowNazwa] = useState(false);
    const [showRowAdresEmail, setShowRowAdresEmail] = useState(false);
    const [showRowNumerTelefonu, setShowRowNumerTelefonu] = useState(false);

    const [nazwa, setNazwa] = useState("");
    const [adresEmail, setAdresEmail] = useState("");
    const [numerTelefonu, setNumerTelefonu] = useState("");
    const [dataUtworzenia, setDataUtworzenia] = useState("");
    const [safeDataUtworzenia, setSafeDataUtworzenia] = useState("");
    const [status, setStatus] = useState("");

    const [userPictureThumb, setUserPictureThumb] = useState("https://randomuser.me/api/portraits/thumb/men/72.jpg");
    const [userPictureMed, setUserPictureMed] = useState("https://randomuser.me/api/portraits/med/men/72.jpg");
    const [userPicture, setUserPicture] = useState("https://randomuser.me/api/portraits/men/72.jpg");



    useEffect(() => {
        async function fetchData() {
            const users = await usersService.getAll();
            //await setData(users.data);
            await sortingAfterLoad("nazwa", users.data);
        }
        fetchData();
    }, []);

    const sortingAfterLoad = async (col, dataLocal) => {
        const sorted = await [...dataLocal].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
        await setData(sorted);
    }

    const sorting = async (col, dataLocal) => {
        await setCol(col);
        if (order === "ASC") {
            const sorted = await [...dataLocal].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            await setData(sorted);
            await setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = await [...dataLocal].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            await setData(sorted);
            await setOrder("ASC");
        }
    }

    const sorting2 = async (col) => {
        sorting(col, data);
    }

    const sorting3 = async (col, dataLocal) => {
        await setCol(col);
        if (order === "ASC") {
            const sorted = await [...dataLocal].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            await setData(sorted);
        }
        if (order === "DSC") {
            const sorted = await [...dataLocal].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            await setData(sorted);
        }
    }


    const renderUser = (user, index) => {
        const eventKeyOdblokuj = `Odblokuj|${user.id}`;
        const eventKeyZablokuj = `Zablokuj|${user.id}`;
        return (
            <tr key={user.id}>
                <td><img className="img-responsive user-picture-thumb" src={user.pictureThumbnailUrl ? user.pictureThumbnailUrl : "https://randomuser.me/api/portraits/thumb/men/72.jpg"} alt={user.nazwa} /></td>
                <td>{user.nazwa}</td>
                <td>{user.adresEmail}</td>
                <td>{user.numerTelefonu}</td>
                <td>{safeNewDate(user.dataUtworzenia)}</td>
                <td>{user.status ? <Badge bg="success">Aktywny</Badge> : <Badge bg="danger">Blokada</Badge>}</td>
                <td><Button variant="outline-primary" size="sm" onClick={() => showUserDetail(user.id)}><MdMoreVert /></Button></td>
                <td><Dropdown onSelect={(eventKey, event) => userDropDownSelect(eventKey, event)}>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        <Dropdown.Item eventKey={eventKeyOdblokuj}>Odblokuj</Dropdown.Item>
                        <Dropdown.Item eventKey={eventKeyZablokuj}>Zablokuj</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </td>
            </tr>
        )
    }

    const showUserDetail = (id) => {
        const user = data.find(u => u.id === id);
        if (user) {
            setNazwa(user.nazwa);
            setAdresEmail(user.adresEmail);
            setNumerTelefonu(user.numerTelefonu);
            setDataUtworzenia(user.dataUtworzenia);
            setUserId(id);
            setStatus(user.status);
            setUserPictureThumb(user.pictureThumbnailUrl);
            setUserPictureMed(user.pictureMediumUrl);
            setUserPicture(user.pictureLargeUrl);
            setShow(true);
        }
    }

    const showUserAddDetail = () => {
        setNazwa("");
        setAdresEmail("");
        setNumerTelefonu("");
        setDataUtworzenia("2024-04-27T17:47:51.335Z");
        setStatus(false);
        setShowAddUser(true);
    }

    const editRowNazwa = () => {
        setShowRowNazwa(!showRowNazwa);
    }

    const editRowAdresEmail = () => {
        setShowRowAdresEmail(!showRowAdresEmail);
    }

    const editRowNumerTelefonu = () => {
        setShowRowNumerTelefonu(!showRowNumerTelefonu);
    }

    const saveNazwa = async () => {
        const data = {
            "id": userId,
            "nazwa": nazwa,
            "adresEmail": adresEmail,
            "numerTelefonu": numerTelefonu,
            "dataUtworzenia": dataUtworzenia,
            "status": status,
            "pictureThumbnailUrl": userPictureThumb,
            "pictureMediumUrl": userPictureMed,
            "pictureLargeUrl": userPicture
        };

        await usersService.update(userId, data);
        editRowNazwa();

        const users = await usersService.getAll();
        await sorting3(col, users.data);

        Swal.fire({
            title: "Status",
            text: "Nazwa została zaktualizowana",
            icon: "success"
        });
    }

    const saveAdresEmail = async () => {
        const data = {
            "id": userId,
            "nazwa": nazwa,
            "adresEmail": adresEmail,
            "numerTelefonu": numerTelefonu,
            "dataUtworzenia": dataUtworzenia,
            "status": status,
            "pictureThumbnailUrl": userPictureThumb,
            "pictureMediumUrl": userPictureMed,
            "pictureLargeUrl": userPicture
        };

        await usersService.update(userId, data);
        editRowAdresEmail();

        const users = await usersService.getAll();
        await sorting3(col, users.data);

        Swal.fire({
            title: "Status",
            text: "Adres Email został zaktualizowany",
            icon: "success"
        });
    }

    const saveNumerTelefonu = async () => {
        const data = {
            "id": userId,
            "nazwa": nazwa,
            "adresEmail": adresEmail,
            "numerTelefonu": numerTelefonu,
            "dataUtworzenia": dataUtworzenia,
            "status": status,
            "pictureThumbnailUrl": userPictureThumb,
            "pictureMediumUrl": userPictureMed,
            "pictureLargeUrl": userPicture
        };

        await usersService.update(userId, data);
        editRowNumerTelefonu();

        const users = await usersService.getAll();
        await sorting3(col, users.data);

        Swal.fire({
            title: "Status",
            text: "Numer Telefonu został zaktualizowany",
            icon: "success"
        });

    }

    const saveNewUser = async () => {
        const data = {
            "id": 0,
            "nazwa": nazwa,
            "adresEmail": adresEmail,
            "numerTelefonu": numerTelefonu,
            "dataUtworzenia": "2024-05-03T12:09:45.929Z",
            "status": false,
            "pictureThumbnailUrl": userPictureThumb,
            "pictureMediumUrl": userPictureMed,
            "pictureLargeUrl": userPicture
        };

        await usersService.create(data);

        const users = await usersService.getAll();
        await sorting3(col, users.data);


        Swal.fire({
            title: "Status",
            text: "Nowy urzytkownik został dodany",
            icon: "success"
        });

    }

    const autoFillUser = async () => {
        const data = await randomusersService.getOneUser()
        console.log(data.data.results[0]);
        const user = data.data.results[0];
        if (user) {
            setNazwa(`${user.name.first} ${user.name.last}`);
            setAdresEmail(user.email);
            setNumerTelefonu(user.phone);
            setDataUtworzenia("");
            setUserPicture(user.picture.large);
            setUserPictureMed(user.picture.medium);
            setUserPictureThumb(user.picture.thumbnail);
            setStatus(false);
        }

    }

    const userDropDownSelect = async (eventKey, event) => {
        event.persist();
        console.log(eventKey)
        console.log(event)

        const action = eventKey.split('|')[0];
        const id = eventKey.split('|')[1];

        const user = data.find(u => u.id == id);
        if (user) {
            const data = {
                "id": user.id,
                "nazwa": user.nazwa,
                "adresEmail": user.adresEmail,
                "numerTelefonu": user.numerTelefonu,
                "dataUtworzenia": user.dataUtworzenia,
                "status": action == "Odblokuj" ? true : false,
                "pictureThumbnailUrl": user.pictureThumbnailUrl,
                "pictureMediumUrl": user.pictureMediumUrl,
                "pictureLargeUrl": user.pictureLargeUrl
            };

            await usersService.update(user.id, data);
            const users = await usersService.getAll();
            //await setData(users.data);

            await sorting3(col, users.data);
            
            Swal.fire({
                title: "Status",
                text: "Status został zaaktualizowany",
                icon: "success"
            });
        }
    }

    const handleImportUsers = async () => {

        await generatorService.generate();

        const users = await usersService.getAll();

        await sorting3(col, users.data);

        Swal.fire({
            title: "Status",
            text: "Urzytkownicy zostali zimportowani",
            icon: "success"
        });
    }


    return (
        <div className="App">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{nazwa}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <img className="img-responsive user-picture" src={userPicture ? userPicture : "https://randomuser.me/api/portraits/men/72.jpg"} alt="..." />
                                </Row>
                                <Row>
                                    {status ? (<Badge bg="success">Aktywny</Badge>) : (<Badge bg="danger">Blokada</Badge>)}
                                </Row>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <span>Nazwa</span>
                                </Row>
                                <Row>
                                    <Col md={8}>{showRowNazwa ? (<input id="nazwa" value={nazwa} onChange={(e) => { setNazwa(e.target.value) }} />) : (<span id="nazwaSpan">{nazwa}</span>)}</Col>
                                    <Col md={4}>{showRowNazwa ? (<><Button variant="outline-secondary" size="sm" onClick={saveNazwa}><MdDone /></Button> <Button variant="outline-secondary" size="sm" onClick={editRowNazwa}><MdDelete /></Button></>) : (<Button variant="outline-primary" size="sm" onClick={editRowNazwa}><MdCreate /></Button>)}</Col>
                                </Row>

                                <Row>
                                    <span>Adres Email</span>
                                </Row>
                                <Row>
                                    <Col md={8}>{showRowAdresEmail ? (<input id="adresEmail" value={adresEmail} onChange={(e) => { setAdresEmail(e.target.value) }} />) : (<span id="adresEmailSpan">{adresEmail}</span>)}</Col>
                                    <Col md={4}>{showRowAdresEmail ? (<><Button variant="outline-secondary" size="sm" onClick={saveAdresEmail}><MdDone /></Button> <Button variant="outline-secondary" size="sm" onClick={editRowAdresEmail}><MdDelete /></Button></>) : (<Button variant="outline-primary" size="sm" onClick={editRowAdresEmail}><MdCreate /></Button>)}</Col>
                                </Row>

                                <Row>
                                    <span>Numer Telefonu</span>
                                </Row>
                                <Row>
                                    <Col md={8}>{showRowNumerTelefonu ? (<input id="numerTelefonu" value={numerTelefonu} onChange={(e) => { setNumerTelefonu(e.target.value) }} />) : (<span id="numerTelefonuSpan">{numerTelefonu}</span>)}</Col>
                                    <Col md={4}>{showRowNumerTelefonu ? (<><Button variant="outline-secondary" size="sm" onClick={saveNumerTelefonu}><MdDone /></Button> <Button variant="outline-secondary" size="sm" onClick={editRowNumerTelefonu}><MdDelete /></Button></>) : (<Button variant="outline-primary" size="sm" onClick={editRowNumerTelefonu}><MdCreate /></Button>)}</Col>
                                </Row>

                                <Row>
                                    <span>Data Utworzenia</span>
                                </Row>
                                <Row>
                                    <span id="dataUtworzenia">{safeNewDate(dataUtworzenia)}</span>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAddUser}
                onHide={handleCloseAddUser}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>Dodawanie nowego członka zespołu</span>
                        <p>Wypełnij wszystkie pola poniżej lub pobierz z internetu</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Button variant="outline-secondary" size="sm" onClick={autoFillUser}><MdDone /> Wypełnij formularz automatycznie</Button>
                        </Row>
                        <Row>
                            Uwaga! Wszystkie pola formularza zostaną nadpisane danymi z internetu.
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <img className="img-responsive user-picture" src={userPicture} alt="..." />
                                </Row>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <span>Nazwa</span>
                                </Row>
                                <Row>
                                    <input id="nazwa" value={nazwa} onChange={(e) => { setNazwa(e.target.value) }} />
                                </Row>

                                <Row>
                                    <span>Adres Email</span>
                                </Row>
                                <Row>
                                    <input id="adresEmail" value={adresEmail} onChange={(e) => { setAdresEmail(e.target.value) }} />
                                </Row>

                                <Row>
                                    <span>Numer Telefonu</span>
                                </Row>
                                <Row>
                                    <input id="numerTelefonu" value={numerTelefonu} onChange={(e) => { setNumerTelefonu(e.target.value) }} />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Button variant="secondary" onClick={handleCloseAddUser}>Anuluj</Button>
                            </Col>
                            <Col md={6}>
                                <Button variant="warning" onClick={saveNewUser}>Potwierdź</Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>

            <Container>
                <Row>
                    <Col md={4}>
                        <p style={{ fontSize: "30px" }}>Lista członków zespołu</p>
                    </Col>
                    <Col md={8}>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p style={{ fontSize: "10px" }}>Zarządzaj listą członków swojego zespołu</p>
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col md={3}>
                        <Button variant="secondary" size="sm" onClick={handleImportUsers}><MdCloudDownload /> Zaimportuj 5 członków zespołu</Button>
                    </Col>
                    <Col md={3}>
                        <Button variant="secondary" size="sm" onClick={showUserAddDetail}><MdAdd /> Dodaj członka zespołu</Button>
                    </Col>
                </Row>
            </Container>
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Zdjęcie</th>
                        <th onClick={() => sorting2("nazwa")}>Nazwa</th>
                        <th onClick={() => sorting2("adresEmail")}>Adres Email</th>
                        <th onClick={() => sorting2("numerTelefonu")}>Numer Telefonu</th>
                        <th onClick={() => sorting2("dataUtworzenia")}>Data Utworzenia</th>
                        <th onClick={() => sorting2("status")}>Status</th>
                        <th>Edytuj</th>
                        <th>Blokuj/Odblokuj</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderUser)}
                </tbody>
            </ReactBootStrap.Table>
        </div>
    )
}

export default App;