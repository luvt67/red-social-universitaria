export async function login(email: string, password: string) {
    // Simula una llamada a la API (puedes reemplazar por axios o fetch real)
    return new Promise<{ token: string; user: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@unsaac.edu.pe" && password === "123456") {
          resolve({ token: "fake-jwt-token", user: "Admin UNSAAC" });
        } else {
          reject(new Error("Credenciales inválidas"));
        }
      }, 1000);
    });
  }