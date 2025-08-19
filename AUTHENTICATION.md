# Sistem Autentikasi Cakradana

Dokumen ini menjelaskan implementasi sistem autentikasi yang terintegrasi dengan backend API Cakradana.

## Fitur Utama

- ✅ Login dengan email dan password
- ✅ Registrasi user baru dengan berbagai tipe akun
- ✅ Forgot password dengan email reset
- ✅ Change password dengan token reset
- ✅ Auto-refresh token JWT
- ✅ Protected routes untuk halaman dashboard
- ✅ Public routes untuk halaman auth
- ✅ Persistent authentication state
- ✅ Logout dan clear session

## Struktur File

```
src/
├── lib/
│   ├── auth-service.ts          # Service untuk API calls
│   ├── auth-context.tsx         # React Context untuk state management
│   ├── use-auto-refresh.ts      # Hook untuk auto-refresh token
│   └── auto-refresh-wrapper.tsx # Wrapper component
├── components/
│   ├── ProtectedRoute.tsx       # Component untuk protected routes
│   ├── PublicRoute.tsx          # Component untuk public routes
│   └── DashboardNavbar.tsx      # Navbar untuk dashboard
└── app/
    ├── login/page.tsx           # Halaman login
    ├── signup/page.tsx          # Halaman registrasi
    ├── forgot-password/page.tsx # Halaman forgot password
    ├── change-password/page.tsx # Halaman change password
    └── dashboard/page.tsx       # Halaman dashboard (protected)
```

## API Endpoints

### Base URL
```
https://api.cakradana.org
```

### 1. Login
```
POST /user/auth/email/login
Content-Type: application/json

{
  "email": "dev@cakradana.org",
  "password": "testtest"
}

Response:
{
  "status": "success",
  "message": "Login Success",
  "data": {
    "email": "galel27140@baxidy.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Register
```
POST /user/auth/email/register
Content-Type: application/json

{
  "name": "Tes",
  "email": "galel27140@baxidy.com",
  "password": "testtest",
  "type": "political-party"
}

Response:
{
  "status": "success",
  "message": "Email registration successful",
  "data": {
    "email": "galel27140@baxidy.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Refresh Token
```
POST /user/auth/refresh-token
Authorization: Bearer {access_token}

Response:
{
  "status": "success",
  "message": "Token refreshed",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 4. Forgot Password
```
POST /user/auth/email/forgot-password
Content-Type: application/json

{
  "email": "dev@cakradana.org"
}
```

### 5. Change Password
```
POST /user/auth/email/change-password
Content-Type: application/json

{
  "password": "newpass",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Tipe Akun yang Didukung

- `individual` - Individual
- `corporation` - Corporation
- `organization` - Organization
- `political-party` - Political Party
- `government` - Government
- `other` - Other

## Cara Penggunaan

### 1. Setup AuthProvider

Wrap aplikasi dengan `AuthProvider` di `layout.tsx`:

```tsx
import { AuthProvider } from "@/lib/auth-context";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Gunakan Hook useAuth

```tsx
import { useAuth } from '@/lib/auth-context';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.email}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### 3. Protected Routes

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Dashboard content (only visible when authenticated)</div>
    </ProtectedRoute>
  );
}
```

### 4. Public Routes

```tsx
import PublicRoute from '@/components/PublicRoute';

function LoginPage() {
  return (
    <PublicRoute>
      <div>Login form (redirects to dashboard if already authenticated)</div>
    </PublicRoute>
  );
}
```

## State Management

### AuthContext State
```tsx
interface AuthContextType {
  user: User | null;           // User data (email)
  isAuthenticated: boolean;     // Authentication status
  isLoading: boolean;           // Loading state
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<void>;
  refreshToken: () => Promise<void>;
}
```

### Local Storage
- `access_token` - JWT token untuk autentikasi
- `user_email` - Email user yang sedang login

## Auto-Refresh Token

Sistem secara otomatis akan refresh token JWT 5 menit sebelum expired untuk memastikan user tetap terautentikasi.

## Error Handling

Semua API calls memiliki error handling yang konsisten:
- Network errors
- API response errors
- Validation errors
- JWT parsing errors

## Security Features

- JWT token validation
- Automatic token expiration check
- Secure token storage (localStorage)
- Protected route guards
- Public route redirects

## Testing

### Test Credentials
```
Email: dev@cakradana.org
Password: testtest
```

### Test Registration
```
Name: Parpol B
Email: parpol@cakradana.org
Password: testtest
Type: political-party
```

## Troubleshooting

### Common Issues

1. **Token expired**: Sistem akan otomatis logout user
2. **Network error**: Periksa koneksi internet dan API endpoint
3. **Invalid credentials**: Periksa email dan password
4. **Route protection**: Pastikan menggunakan `ProtectedRoute` untuk halaman yang memerlukan auth

### Debug Mode

Aktifkan console logging untuk debugging:
```tsx
// Di auth-service.ts
console.log('API request failed:', error);
```

## Dependencies

- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Lazy loading untuk auth components
- Optimized re-renders dengan React Context
- Efficient token validation
- Minimal API calls dengan caching

## Future Enhancements

- [ ] Remember me functionality
- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Role-based access control
- [ ] Audit logging
