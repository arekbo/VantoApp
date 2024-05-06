import React, { useState } from "react";
import UsersDataService from "./services/user.service";

const AddUser = () => {
    const initialUserState = {
        id: null,
        nazwa: "",
        adresEmail: "",
        numerTelefonu: "",
        dataUtworzenia: null,
        status: true,
        pictureThumbnailUrl: "",
        pictureMediumUrl: "",
        pictureLargeUrl: ""
    };

    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        var data = {
            nazwa: user.nazwa,
            adresEmail: user.adresEmail,
            numerTelefonu: user.numerTelefonu,
            dataUtworzenia: user.dataUtworzenia,
            status: user.status,
            pictureThumbnailUrl: user.pictureThumbnailUrl,
            pictureMediumUrl: user.pictureMediumUrl,
            pictureLargeUrl: user.pictureLargeUrl
        };

        UsersDataService.create(data)
            .then(response => {
                setUser({
                    id: response.data.id,
                    nazwa: response.data.nazwa,
                    adresEmail: response.data.adresEmail,
                    numerTelefonu: response.data.numerTelefonu,
                    dataUtworzenia: response.data.dataUtworzenia,
                    status: response.data.status,
                    pictureThumbnailUrl: response.data.pictureThumbnailUrl,
                    pictureMediumUrl: response.data.pictureMediumUrl,
                    pictureLargeUrl: response.data.pictureLargeUrl
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newUser}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="nazwa">Nazwa</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nazwa"
                            required
                            value={user.nazwa}
                            onChange={handleInputChange}
                            name="nazwa"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="adresEmail">AdresEmail</label>
                        <input
                            type="text"
                            className="form-control"
                            id="adresEmail"
                            required
                            value={user.adresEmail}
                            onChange={handleInputChange}
                            name="adresEmail"
                        />
                    </div>

                    <button onClick={saveUser} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddTutorial;