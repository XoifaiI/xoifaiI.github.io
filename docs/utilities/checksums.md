---
sidebar_position: 3
---

# Checksums

For data integrity without security requirements. These are fast but NOT cryptographically secure. An attacker can easily make data with any checksum they want.

## CRC32

```luau
local CRC32 = Cryptography.Checksums.CRC32
```

### `CRC32(Message: buffer, Mode: "Jam" | "Iso"?, Hex: boolean?) -> number`

Computes a 32 bit CRC.

```luau
-- Default mode, returns number
local Checksum = CRC32(buffer.fromstring("data"))
print(Checksum) -- e.g., 3632233996

-- Return as hex string
local HexChecksum = CRC32(buffer.fromstring("data"), nil, true)
print(HexChecksum) -- e.g., "d87f7e0c"

-- JAM mode (different polynomial finalization)
local JamChecksum = CRC32(buffer.fromstring("data"), "Jam")

-- ISO mode
local IsoChecksum = CRC32(buffer.fromstring("data"), "Iso")
```

**Modes:**
- Default: Standard CRC 32 (Ethernet, ZIP, PNG)
- `"Jam"`: CRC 32/JAMCRC (inverted, no final XOR)
- `"Iso"`: CRC 32/ISO HDLC

Use CRC32 for file integrity, error detection, and anywhere you need a fast checksum. Do not use it for security.

## Adler

```luau
local Adler = Cryptography.Checksums.Adler
```

### `Adler(Message: buffer) -> number`

Computes an Adler 32 checksum.

```luau
local Checksum = Adler(buffer.fromstring("data"))
print(Checksum)
```

Adler 32 is faster than CRC32 but has weaker error detection properties. It is used in zlib compression. The checksum is computed as two running sums modulo 65521.

## When to Use What

| Use Case | Algorithm |
|----------|-----------|
| File integrity (no adversary) | CRC32 |
| zlib/deflate compatibility | Adler |
| Maximum speed, weak detection | Adler |
| Hash tables, bloom filters | XXH32 or MurMur |
| **Any security requirement** | SHA256, BLAKE3, or HMAC |

:::warning Not for Security
These checksums are easily forgeable. If someone might tamper with your data, use a cryptographic hash (SHA256, BLAKE3) or a MAC (HMAC, BLAKE3 DigestKeyed).
:::
