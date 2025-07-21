# Security Policy

## Supported Versions

We actively support the following versions of PDFY with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in PDFY, please report it responsibly.

### How to Report

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. **Email** us at: security@pdfy.com (or your designated security email)
3. **Include** the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes

### What to Expect

- **Acknowledgment**: We'll acknowledge your report within 48 hours
- **Assessment**: We'll assess the vulnerability within 5 business days
- **Updates**: We'll keep you informed of our progress
- **Resolution**: We'll work to resolve critical issues within 30 days

### Responsible Disclosure

We appreciate responsible disclosure and will:
- Credit you for the discovery (if desired)
- Work with you to understand the issue
- Keep you informed throughout the process
- Not pursue legal action for good-faith security research

## Security Best Practices

### For Users
- Keep your browser updated
- Use strong passwords
- Enable two-factor authentication when available
- Be cautious with uploaded files from untrusted sources

### For Developers
- Validate all user inputs
- Use HTTPS in production
- Keep dependencies updated
- Follow secure coding practices
- Regularly audit for vulnerabilities

## Security Features

### Client-Side Security
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure file handling

### Server-Side Security
- Authentication and authorization
- Rate limiting
- Input validation
- Secure file processing
- Environment variable protection

### Infrastructure Security
- HTTPS enforcement
- Secure headers
- Database security
- Regular security updates

## Known Security Considerations

### PDF Processing
- PDF files are processed in a sandboxed environment
- File size limits are enforced
- File type validation is performed
- Malicious content detection

### User Data
- Minimal data collection
- Secure data transmission
- Regular data cleanup
- Privacy by design

## Security Tools

We use the following tools to maintain security:

- **ESLint**: Code quality and security linting
- **npm audit**: Dependency vulnerability scanning
- **TypeScript**: Type safety to prevent runtime errors
- **Supabase**: Built-in security features for auth and database

## Reporting Other Issues

For non-security related issues:
- **Bugs**: Create a GitHub issue
- **Features**: Use GitHub discussions
- **Support**: Contact support@pdfy.com

---

Thank you for helping keep PDFY secure! 🔒
