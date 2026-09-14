# Security Policy

## What brasa.ui IS and IS NOT

brasa.ui is a **UI component library**. It renders forms, inputs, QR codes, and payment interfaces.

It does **NOT**:
- Process payments or communicate with banks/PSPs
- Generate Pix EMV payloads (your backend does this)
- Store, transmit, or handle sensitive financial data
- Provide PCI DSS compliance
- Replace your payment gateway

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability in brasa.ui, please report it responsibly:

1. **Do NOT open a public issue**
2. Email: douglasp.araujo96@gmail.com
3. Include: description, steps to reproduce, potential impact

We will respond within 48 hours and work on a fix. Credit will be given to reporters unless they prefer anonymity.

## Security Measures

- Zero runtime dependencies (minimal supply chain risk)
- All inputs are sanitized client-side (masks strip non-allowed characters)
- No network requests except CEPInput (ViaCEP, a public Brazilian postal code API)
- No data persistence or storage
- No cookies, no tracking, no analytics
- npm packages published with 2FA enabled

## For Users

When integrating brasa.ui in production:

- **Never** pass real payment credentials to demo/placeholder components
- **Always** generate Pix EMV payloads on your backend, never client-side
- **Always** validate CPF/CNPJ on your backend too (client-side validation is UX, not security)
- **Always** use HTTPS in production (required for clipboard API)
- Keep your dependencies updated (`npm audit`)
