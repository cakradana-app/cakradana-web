const API_BASE_URL = 'https://api.cakradana.org';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    email: string;
    access_token: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  type: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    email: string;
    access_token: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  password: string;
  token: string;
}

export interface RefreshTokenResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
  };
}

class AuthService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAccessToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = false
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(includeAuth),
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.makeRequest<LoginResponse>('/user/auth/email/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.status === 'success') {
      this.setAccessToken(response.data.access_token);
      this.setUserEmail(response.data.email);
    }

    return response;
  }

  // Register
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.makeRequest<RegisterResponse>('/user/auth/email/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.status === 'success') {
      this.setAccessToken(response.data.access_token);
      this.setUserEmail(response.data.email);
    }

    return response;
  }

  // Forgot Password
  async forgotPassword(data: ForgotPasswordRequest): Promise<{ status: string; message: string }> {
    return this.makeRequest<{ status: string; message: string }>('/user/auth/email/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Change Password
  async changePassword(data: ChangePasswordRequest): Promise<{ status: string; message: string }> {
    return this.makeRequest<{ status: string; message: string }>('/user/auth/email/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Refresh Token
  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await this.makeRequest<RefreshTokenResponse>('/user/auth/refresh-token', {
      method: 'POST',
    }, true);

    if (response.status === 'success') {
      this.setAccessToken(response.data.access_token);
    }

    return response;
  }

  // Logout
  logout(): void {
    this.clearAuthData();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      // Basic JWT expiration check
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp < currentTime) {
        this.clearAuthData();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      this.clearAuthData();
      return false;
    }
  }

  // Get current user email
  getCurrentUserEmail(): string | null {
    return this.getUserEmail();
  }

  // Token management
  private getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private setAccessToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  private getUserEmail(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user_email');
    }
    return null;
  }

  private setUserEmail(email: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_email', email);
    }
  }

  private clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_email');
    }
  }

  // Get token for API calls
  getToken(): string | null {
    return this.getAccessToken();
  }
}

export const authService = new AuthService();
export default authService;
