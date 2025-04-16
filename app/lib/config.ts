const API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const API_BASE_URL = import.meta.env.VITE_KAKAO_API_URL;

if (!(API_KEY && API_BASE_URL)) {
    throw new Error("Missing env! env를 확인해 주세요.");
}

export const Config = {
    API_KEY,
    API_BASE_URL
}
