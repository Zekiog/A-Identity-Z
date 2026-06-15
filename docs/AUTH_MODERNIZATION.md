# A-Identity-Z — Auth Modernization Plan

## Current State (as documented in CLAUDE.md)

The admin dashboard uses **mocked authentication**:
- `src/admin/hooks/useAuth.js` accepts any login
- Returns hardcoded `demo-token-12345`
- No real API call made

## Target Architecture

### Phase 1: JWT + FastAPI Backend (v1.1)

```
React Admin SPA
    │
    └── POST /api/auth/login {email, password}
            ↓
        FastAPI (A_ID/backend/)
            ↓
        Verify credentials (bcrypt)
            ↓
        Issue JWT (HS256, 8h expiry)
            ↓
        Return { access_token, user_profile }
```

**Files to update:**
- `A_ID/frontend/src/admin/hooks/useAuth.js` — replace mock with real fetch
- `A_ID/backend/main.py` — add `/api/auth/login` and `/api/auth/me` endpoints
- `.env` — `JWT_SECRET`, `JWT_EXPIRY_HOURS=8`

### Phase 2: OAuth Social Login (v1.2)

Support Google OAuth for Norwegian business accounts:
- `react-oauth/google` on frontend  
- FastAPI `authlib` integration
- Profile enriched with Google Workspace data

### Phase 3: Multi-tenant (v2.0)

Per-client workspaces for A-Identity-Z customers:
- Each translation client has isolated project view
- Role hierarchy: `super_admin > client_admin > reviewer`

## Quick Implementation (Phase 1)

```python
# A_ID/backend/auth.py
from datetime import datetime, timedelta
from jose import jwt
import bcrypt
import os

SECRET = os.getenv("JWT_SECRET", "change-me")

def create_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(hours=8)
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")

def verify_token(token: str) -> dict:
    return jwt.decode(token, SECRET, algorithms=["HS256"])
```

```javascript
// A_ID/frontend/src/admin/hooks/useAuth.js (updated)
const login = async (email, password) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Invalid credentials');
  const { access_token, user } = await res.json();
  localStorage.setItem('adminToken', access_token);
  setUser(user);
};
```

## AI Agent Orchestration Integration

Per the "Otonom Ajan Mimarisi" document in Google Drive:
- A-Identity-Z admin dashboard should expose a `/webhooks/translation-complete` endpoint
- This allows Hermes/N8N to trigger post-translation workflows automatically
- MCP tool: `trigger_translation(source_lang, target_langs, content_url)`

## Security Checklist

- [ ] JWT secret rotated and stored in Azure Key Vault
- [ ] HTTPS enforced (Azure Functions → custom domain)
- [ ] Rate limiting on `/api/auth/login` (5 req/min per IP)  
- [ ] Audit log for all admin actions
- [ ] i18n strings sanitized (XSS prevention for 7 languages)
