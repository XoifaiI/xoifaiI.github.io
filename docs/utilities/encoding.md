---
sidebar_position: 2
---

# Encoding and Conversions

Utilities for converting between formats.

## Base64

```luau
local Base64 = Cryptography.Utilities.Base64
```

### `Base64.Encode(Input: buffer) -> buffer`

Encodes a buffer to Base64.

```luau
local Data = buffer.fromstring("Hello World")
local Encoded = Base64.Encode(Data)
print(buffer.tostring(Encoded)) -- "SGVsbG8gV29ybGQ="
```

### `Base64.Decode(Input: buffer) -> buffer`

Decodes Base64 back to raw bytes.

```luau
local Encoded = buffer.fromstring("SGVsbG8gV29ybGQ=")
local Decoded = Base64.Decode(Encoded)
print(buffer.tostring(Decoded)) -- "Hello World"
```

Standard Base64 encoding (RFC 4648). Output is around 33% larger than input.

## Hex Conversions

```luau
local Conversions = Cryptography.Utilities.Conversions
```

### `Conversions.ToHex(Buffer: buffer) -> string`

Converts a buffer to a lowercase hex string.

```luau
local Data = buffer.fromstring("Hi")
local Hex = Conversions.ToHex(Data)
print(Hex) -- "4869"
```

### `Conversions.FromHex(Hex: string) -> buffer`

Converts a hex string back to bytes.

```luau
local Buf = Conversions.FromHex("48656c6c6f")
print(buffer.tostring(Buf)) -- "Hello"
```

Hex length must be even. Both uppercase and lowercase hex digits are accepted.

## RandomString

```luau
local RandomString = Cryptography.Utilities.RandomString
```

### `RandomString(Length: number, AsBuffer: false) -> string`
### `RandomString(Length: number, AsBuffer: true) -> buffer`

Generates random alphanumeric strings.

```luau
local Token = RandomString(20, false) -- string
local TokenBuf = RandomString(20, true) -- buffer
```

Characters are drawn from a set including lowercase, uppercase, digits, and some symbols.
