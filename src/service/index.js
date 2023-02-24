import axios from "axios";

//Temp global state
// Should switch to session storage or local storage
var STATE = {
    user: {
        name: '',
        isAdmin: false,
        isAuth: false,
        mail: '',
        mobilePhone: ''
    },
    getUserInfo: (cb) => {

        console.log('get user info');
        axios
            .get("/user")
            .then((res) => {
                console.log(res.data);
                const user = {
                    name: res.data.name,
                    isAdmin: res.data.isAdmin,
                    isAuth: res.data.isAuthenticated,
                    mail: res.data.mail,
                    mobilePhone: res.data.mobilePhone
                }
                STATE.user = user;
                return cb()
            })
            .catch((err) => {
                console.log(err);
                cb()
            });
    }
}

export default STATE;