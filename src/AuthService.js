const API_URL = "https://server-orientcv.onrender.com";

const AuthService = {
  login: (email, password) => {
    return fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("inUser", JSON.stringify(data.user));
        }
        return data;
      });
  },

  register: (name, email, password, experience, location, socialMedia, education, skills, languages, projects, awards, certificates) => {
    return fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        experience,
        location,
        socialMedia,
        education,
        skills,
        languages,
        projects,
        awards,
        certificates
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // if (data.accessToken) {
        //   localStorage.setItem("user", JSON.stringify(data));
        // }
        return data;
      });
  },

  logout: () => {
    localStorage.clear()
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
};

export default AuthService;
