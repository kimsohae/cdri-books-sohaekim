const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
    throw new Error("Missing env : VITE_API_KEY");
}

export const Config = {
    API_KEY
}
