import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
    baseURL: API_URL,
});

export function setToken(token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function login(email, password) {
    // FastAPI OAuth2PasswordRequestForm expects data as x-www-form-urlencoded
    const form = new FormData();
    form.append("username", email);
    form.append("password", password);
    const res = await api.post("/login", form);
    return res.data;
}

export async function register(email, password) {
    const res = await api.post("/register", null, { params: { email, password } });
    return res.data;
}

export async function getContent() {
    const res = await api.get("/content");
    return res.data;
}

export async function addContent(title, url) {
    const res = await api.post("/content", null, { params: { title, url } });
    return res.data;
}

export async function deleteContent(id) {
    const res = await api.delete(`/content/${id}`);
    return res.data;
}

export async function getUsageTrend(contentId) {
    const res = await api.get(`/analytics/usage/${contentId}`);
    return res.data;
}

export async function getChart(contentId) {
    const res = await api.get(`/chart/${contentId}`);
    return res.data;
}

export async function getGeminiInsights(contentId) {
    const res = await api.post(`/gemini/analyze/${contentId}`);
    return res.data;
}
