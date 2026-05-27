// export const API_URL = 
//   process.env.NODE_ENV === "test" 
//     ? "http://mocked-api-url" 
//     : import.meta.env.REACT_APP_PAGERDUTY_API_URL;
//
// Above is the preferred configuration; manual usage below due to errors.
export const API_URL =
  process.env.NODE_ENV === "development"
    ? "https://your-production-api.com"
    : "http://localhost:3000/api/v1";