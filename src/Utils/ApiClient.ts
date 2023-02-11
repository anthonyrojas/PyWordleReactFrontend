import axios, { AxiosInstance } from "axios";
const ApiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_PY_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": ""
    }
});

const errorResHandler = async (err: any) => {
    try {
        if (err.response.status === 401) {
            const res = await ApiClient.post("/auth/refresh", {
                "refresh_token": localStorage.getItem("refreshToken"),
                "device_key": ""
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            const data = res.data.AuthResult;
            let accessExpiresAt = Math.round(Date.now() / 1000) + data.ExpiresIn - 60;
            localStorage.setItem("accessToken", data.AccessToken);
            localStorage.setItem("idToken", data.IdToken);
            localStorage.setItem("accessExpiresAt", accessExpiresAt.toString());
            return err;
        }
        return Promise.reject(err);
    } catch (e: any) {
        if (e.response.status === 401) {
            //clear storage and redirect to /login
            localStorage.clear();
            window.location.pathname = "/login";
        }
        return Promise.reject(err);
    }
}
ApiClient.interceptors.response.use(async (res) => res, errorResHandler);


export default ApiClient;