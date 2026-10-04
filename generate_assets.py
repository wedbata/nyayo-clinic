"""
Generate high-quality PNG assets for Nyayo Clinic
"""
import zlib
import struct
import math
import os

def create_png_rgba(width, height, pixel_func, filename):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # Filter type 0 (None)
        for x in range(width):
            r, g, b, a = pixel_func(x, y, width, height)
            raw_data.extend([int(r) & 0xFF, int(g) & 0xFF, int(b) & 0xFF, int(a) & 0xFF])

    compressed = zlib.compress(bytes(raw_data), 9)

    png = bytearray(b'\x89PNG\r\n\x1a\n')

    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    png.extend(struct.pack('>I', len(ihdr_data)))
    png.extend(b'IHDR')
    png.extend(ihdr_data)
    png.extend(struct.pack('>I', zlib.crc32(b'IHDR' + ihdr_data)))

    # IDAT
    png.extend(struct.pack('>I', len(compressed)))
    png.extend(b'IDAT')
    png.extend(compressed)
    png.extend(struct.pack('>I', zlib.crc32(b'IDAT' + compressed)))

    # IEND
    png.extend(struct.pack('>I', 0))
    png.extend(b'IEND')
    png.extend(struct.pack('>I', zlib.crc32(b'IEND')))

    os.makedirs(os.path.dirname(filename) if os.path.dirname(filename) else '.', exist_ok=True)
    with open(filename, 'wb') as f:
        f.write(png)
    print(f"Generated {filename} ({width}x{height})")

def generate_logo_badge():
    # 240x240 circular badge with medical cross + leaf accents
    W, H = 240, 240
    cx, cy = 120, 120

    def pixel(x, y, w, h):
        dx = x - cx
        dy = y - cy
        dist = math.hypot(dx, dy)

        # Outer soft shadow / subtle border
        if 105 <= dist <= 112:
            alpha = max(0, min(255, int((112 - dist) / 7.0 * 180)))
            return (26, 74, 46, alpha) # #1a4a2e

        # Outer ring
        if 98 <= dist < 105:
            return (46, 125, 77, 255) # Emerald accent #2e7d4d

        # Inner shield/circle
        if dist < 98:
            # Check for medical cross
            # Vertical bar
            in_v_bar = abs(dx) <= 14 and abs(dy) <= 48
            # Horizontal bar
            in_h_bar = abs(dx) <= 48 and abs(dy) <= 14

            # Subtle rounded corners on cross
            if in_v_bar or in_h_bar:
                # White cross with subtle inner relief
                return (255, 255, 255, 255)

            # Cross center circle accent or leaf accents
            # Leaf top-right
            leaf_dx = dx - 40
            leaf_dy = dy + 40
            if math.hypot(leaf_dx, leaf_dy) < 12 and (leaf_dx + leaf_dy) > 0:
                return (234, 243, 236, 220) # Soft light green

            # Deep forest green background
            # Subtle radial gradient for depth
            grad = dist / 98.0
            r = int(26 + grad * 15)
            g = int(74 + grad * 20)
            b = int(46 + grad * 15)
            return (r, g, b, 255)

        return (0, 0, 0, 0)

    create_png_rgba(W, H, pixel, 'images/logo.png')

generate_logo_badge()
