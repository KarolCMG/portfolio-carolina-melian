// Configuración de la API para el portfolio frontend
const API_CONFIG = {
  // URLs de la API
  BASE_URL: {
    development: 'http://localhost:3001',
    production: 'https://portfolio-api-carolina.vercel.app'
  },
  
  // Endpoints
  ENDPOINTS: {
    health: '/api/health',
    contact: '/api/contact',
    auth: '/api/auth',
    docs: '/api-docs'
  },
  
  // Configuración de autenticación
  AUTH: {
    tokenKey: 'portfolio_auth_token',
    loginEndpoint: '/api/auth/login'
  },
  
  // Configuración de contacto
  CONTACT: {
    submitEndpoint: '/api/contact',
    validation: {
      name: { min: 2, max: 100 },
      email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      subject: { min: 5, max: 200 },
      message: { min: 10, max: 2000 }
    }
  }
};

// Función para obtener la URL base según el entorno
function getBaseURL() {
  const isDevelopment = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
  
  return isDevelopment ? 
    API_CONFIG.BASE_URL.development : 
    API_CONFIG.BASE_URL.production;
}

// Función para hacer requests a la API
async function apiRequest(endpoint, options = {}) {
  const baseURL = getBaseURL();
  const url = `${baseURL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  // Añadir token de autenticación si existe
  const token = localStorage.getItem(API_CONFIG.AUTH.tokenKey);
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }
  
  const finalOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, finalOptions);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error en la petición');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Funciones específicas para el portfolio
const PortfolioAPI = {
  // Health check
  async checkHealth() {
    return await apiRequest(API_CONFIG.ENDPOINTS.health);
  },
  
  // Enviar mensaje de contacto
  async sendContact(contactData) {
    return await apiRequest(API_CONFIG.ENDPOINTS.contact, {
      method: 'POST',
      body: JSON.stringify(contactData)
    });
  },
  
  // Login
  async login(username, password) {
    const response = await apiRequest(API_CONFIG.AUTH.loginEndpoint, {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    
    if (response.success && response.token) {
      localStorage.setItem(API_CONFIG.AUTH.tokenKey, response.token);
    }
    
    return response;
  },
  
  // Logout
  logout() {
    localStorage.removeItem(API_CONFIG.AUTH.tokenKey);
  },
  
  // Verificar si está autenticado
  isAuthenticated() {
    return !!localStorage.getItem(API_CONFIG.AUTH.tokenKey);
  },
  
  // Obtener mensajes de contacto (requiere autenticación)
  async getContacts(page = 1, limit = 10) {
    return await apiRequest(`${API_CONFIG.ENDPOINTS.contact}?page=${page}&limit=${limit}`);
  }
};

// Exportar para uso en el portfolio
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { API_CONFIG, PortfolioAPI, getBaseURL, apiRequest };
} else {
  window.PortfolioAPI = PortfolioAPI;
  window.API_CONFIG = API_CONFIG;
}
