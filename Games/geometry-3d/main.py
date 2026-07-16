"""
Geometry Galaxy - Learn 3D Shapes!
A fun educational game for children to explore geometry.
Controls: Mouse to rotate shapes, Click to interact, ESC to go back
"""

import pygame
import numpy as np
import math
import sys
import random
import time

pygame.init()
pygame.mixer.init()

# --- Constants ---
WIDTH, HEIGHT = 1024, 768
FPS = 60

# Colors (child-friendly palette)
BG_DARK = (15, 10, 40)
BG_MENU = (20, 15, 50)
PINK = (255, 105, 180)
LIGHT_PINK = (255, 182, 213)
HOT_PINK = (255, 20, 147)
MAGENTA = (255, 0, 255)
CYAN = (0, 255, 255)
LIGHT_CYAN = (150, 255, 255)
GOLD = (255, 215, 0)
LIGHT_GOLD = (255, 235, 100)
GREEN = (0, 255, 120)
LIGHT_GREEN = (150, 255, 200)
BLUE = (80, 120, 255)
LIGHT_BLUE = (150, 180, 255)
PURPLE = (180, 80, 255)
LIGHT_PURPLE = (200, 150, 255)
ORANGE = (255, 165, 0)
LIGHT_ORANGE = (255, 200, 120)
RED = (255, 80, 80)
WHITE = (255, 255, 255)
LIGHT_GRAY = (200, 200, 220)
DARK_GRAY = (60, 60, 80)
VERY_LIGHT = (240, 240, 255)

# Shape colors
SHAPE_COLORS = [
    (255, 105, 180),  # Pink
    (0, 200, 255),    # Cyan
    (255, 215, 0),    # Gold
    (0, 255, 120),    # Green
    (180, 80, 255),   # Purple
    (255, 165, 0),    # Orange
    (255, 80, 80),    # Red
    (100, 200, 255),  # Light Blue
]

# --- Screen ---
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Geometry Galaxy")
clock = pygame.time.Clock()

# --- Fonts ---
try:
    FONT_TITLE = pygame.font.SysFont("segoeui", 56, bold=True)
    FONT_SUBTITLE = pygame.font.SysFont("segoeui", 32, bold=True)
    FONT_BODY = pygame.font.SysFont("segoeui", 22)
    FONT_SMALL = pygame.font.SysFont("segoeui", 18)
    FONT_BOLD = pygame.font.SysFont("segoeui", 22, bold=True)
    FONT_HUGE = pygame.font.SysFont("segoeui", 72, bold=True)
    FONT_SHAPE = pygame.font.SysFont("segoeui", 28, bold=True)
except:
    FONT_TITLE = pygame.font.Font(None, 56)
    FONT_SUBTITLE = pygame.font.Font(None, 32)
    FONT_BODY = pygame.font.Font(None, 22)
    FONT_SMALL = pygame.font.Font(None, 18)
    FONT_BOLD = pygame.font.Font(None, 22)
    FONT_HUGE = pygame.font.Font(None, 72)
    FONT_SHAPE = pygame.font.Font(None, 28)


# ============================================================
#   3D SHAPE DEFINITIONS
# ============================================================

class Shape3D:
    """Base class for 3D shapes."""
    def __init__(self, name, vertices, edges, faces, color, fun_fact="", emoji=""):
        self.name = name
        self.vertices = np.array(vertices, dtype=float)
        self.edges = edges
        self.faces = faces
        self.color = color
        self.fun_fact = fun_fact
        self.emoji = emoji
        self.num_faces = len(faces)
        self.num_edges = len(edges)
        self.num_vertices = len(vertices)
        # Verify Euler's formula: V - E + F = 2
        self.euler_check = self.num_vertices - self.num_edges + self.num_faces

    def get_rotated(self, ax, ay, az):
        """Return vertices after rotation around X, Y, Z axes."""
        rx = self._rotation_matrix(ax, 0)
        ry = self._rotation_matrix(ay, 1)
        rz = self._rotation_matrix(az, 2)
        verts = self.vertices.copy()
        verts = verts @ rx.T
        verts = verts @ ry.T
        verts = verts @ rz.T
        return verts

    @staticmethod
    def _rotation_matrix(angle, axis):
        c, s = math.cos(angle), math.sin(angle)
        if axis == 0:  # X
            return np.array([[1,0,0],[0,c,-s],[0,s,c]])
        elif axis == 1:  # Y
            return np.array([[c,0,s],[0,1,0],[-s,0,c]])
        else:  # Z
            return np.array([[c,-s,0],[s,c,0],[0,0,1]])


# --- Shape Definitions ---

def make_cube():
    v = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
         [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]]
    e = [(0,1),(1,2),(2,3),(3,0),(4,5),(5,6),(6,7),(7,4),
         (0,4),(1,5),(2,6),(3,7)]
    f = [(0,1,2,3),(4,5,6,7),(0,1,5,4),(2,3,7,6),(0,3,7,4),(1,2,6,5)]
    return Shape3D("Cube", v, e, f, (0, 200, 255),
        "Every face is a square! Boxes are cubes.", "📦")


def make_pyramid():
    v = [[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1],[0,1.5,0]]
    e = [(0,1),(1,2),(2,3),(3,0),(0,4),(1,4),(2,4),(3,4)]
    f = [(0,1,2,3),(0,1,4),(1,2,4),(2,3,4),(3,0,4)]
    return Shape3D("Pyramid", v, e, f, (255, 215, 0),
        "Egyptian pyramids are giant pyramids!", "🔺")


def make_tetrahedron():
    s = 1.5
    v = [[s,s,s],[s,-s,-s],[-s,s,-s],[-s,-s,s]]
    e = [(0,1),(0,2),(0,3),(1,2),(1,3),(2,3)]
    f = [(0,1,2),(0,1,3),(0,2,3),(1,2,3)]
    return Shape3D("Tetrahedron", v, e, f, (255, 105, 180),
        "A pyramid with a triangle base! Only 4 faces.", "🔻")


def make_octahedron():
    v = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]
    e = [(0,2),(0,3),(0,4),(0,5),(1,2),(1,3),(1,4),(1,5),
         (2,4),(2,5),(3,4),(3,5)]
    f = [(0,2,4),(0,4,3),(0,3,5),(0,5,2),
         (1,2,4),(1,4,3),(1,3,5),(1,5,2)]
    return Shape3D("Octahedron", v, e, f, (0, 255, 120),
        "Like two pyramids joined at the base! 8 faces.", "💎")


def make_dodecahedron():
    phi = (1 + math.sqrt(5)) / 2
    inv = 1 / phi
    v = []
    # Cube vertices
    for x in [-1, 1]:
        for y in [-1, 1]:
            for z in [-1, 1]:
                v.append([x, y, z])
    # Rectangle vertices
    for x in [-1, 1]:
        for y in [-inv, inv]:
            for z in [-phi, phi]:
                v.append([0, y*phi if x==0 else y, z*phi if x==0 else z])
    # Recalculate dodecahedron vertices properly
    phi = (1 + math.sqrt(5)) / 2
    inv_phi = 1 / phi
    v = []
    # 8 cube vertices
    for i in [-1, 1]:
        for j in [-1, 1]:
            for k in [-1, 1]:
                v.append([i, j, k])
    # 12 vertices on rectangular faces
    for i in [-1, 1]:
        for j in [-1, 1]:
            v.append([0, i * inv_phi, j * phi])
            v.append([i * inv_phi, j * phi, 0])
            v.append([j * phi, 0, i * inv_phi])

    # Edges - connect vertices at distance ~1.28
    edges = []
    for i in range(len(v)):
        for j in range(i+1, len(v)):
            d = math.sqrt(sum((v[i][k]-v[j][k])**2 for k in range(3)))
            if 1.1 < d < 1.35:
                edges.append((i, j))

    # For simplicity, use approximate face count
    faces_approx = [(0,)] * 12  # placeholder

    return Shape3D("Dodecahedron", v, edges, [(0,)]*12, (180, 80, 255),
        "Has 12 pentagon faces! Like a soccer ball pattern.", "🔮")


def make_icosahedron():
    phi = (1 + math.sqrt(5)) / 2
    v = []
    # 12 vertices
    for i in [-1, 1]:
        for j in [-1, 1]:
            v.append([0, i * phi, j])
            v.append([i, 0, j * phi])
            v.append([j * phi, i, 0])

    # Find edges
    edges = []
    for i in range(len(v)):
        for j in range(i+1, len(v)):
            d = math.sqrt(sum((v[i][k]-v[j][k])**2 for k in range(3)))
            if d < 2.1:
                edges.append((i, j))

    return Shape3D("Icosahedron", v, edges, [(0,)]*20, (255, 165, 0),
        "20 triangle faces! Almost a sphere.", "🌐")


def make_sphere(n=24):
    """Approximate sphere with latitude/longitude lines."""
    v = []
    e = []
    f = []

    # Generate vertices
    rings = n // 2
    for i in range(rings + 1):
        theta = math.pi * i / rings
        for j in range(n):
            phi = 2 * math.pi * j / n
            x = math.sin(theta) * math.cos(phi)
            y = math.cos(theta)
            z = math.sin(theta) * math.sin(phi)
            v.append([x, y, z])

    # Generate edges
    for i in range(rings + 1):
        for j in range(n):
            idx = i * n + j
            # Horizontal edge
            e.append((idx, i * n + (j + 1) % n))
            # Vertical edge
            if i < rings:
                e.append((idx, (i + 1) * n + j))

    return Shape3D("Sphere", v, e, [(0,)]*(rings*n), (100, 200, 255),
        "Every point on the surface is the same distance from the center!", "⚽")


def make_cylinder(n=24):
    """Cylinder shape."""
    v = []
    e = []

    # Top and bottom circles
    for i in range(n):
        angle = 2 * math.pi * i / n
        x = math.cos(angle)
        z = math.sin(angle)
        v.append([x, 1.5, z])   # top
        v.append([x, -1.5, z])  # bottom

    # Edges
    for i in range(n):
        ni = (i + 1) % n
        e.append((i*2, ni*2))        # top circle
        e.append((i*2+1, ni*2+1))    # bottom circle
        e.append((i*2, i*2+1))       # vertical

    return Shape3D("Cylinder", v, e, [(0,)]*(2*n), (255, 100, 100),
        "A can of soup is a cylinder! 2 circles and a tube.", "🥫")


def make_cone(n=24):
    """Cone shape."""
    v = [[0, 2, 0]]  # apex
    e = []

    # Base circle
    for i in range(n):
        angle = 2 * math.pi * i / n
        x = math.cos(angle) * 1.2
        z = math.sin(angle) * 1.2
        v.append([x, -1, z])

    # Edges
    for i in range(1, n+1):
        ni = (i % n) + 1
        e.append((i, ni))     # base circle
        e.append((0, i))      # sides to apex

    return Shape3D("Cone", v, e, [(0,)]*(n+1), (255, 150, 0),
        "An ice cream cone! A circle on the bottom comes to a point.", "🍦")


def make_torus(m=12, n=24):
    """Torus (donut) shape."""
    v = []
    e = []
    R = 1.5  # major radius
    r = 0.6  # minor radius

    for i in range(m):
        theta = 2 * math.pi * i / m
        for j in range(n):
            phi = 2 * math.pi * j / n
            x = (R + r * math.cos(phi)) * math.cos(theta)
            y = r * math.sin(phi)
            z = (R + r * math.cos(phi)) * math.sin(theta)
            v.append([x, y, z])

    for i in range(m):
        for j in range(n):
            idx = i * n + j
            e.append((idx, i * n + (j+1) % n))
            e.append((idx, ((i+1) % m) * n + j))

    return Shape3D("Torus", v, e, [(0,)]*(m*n), (255, 180, 220),
        "A donut shape! Like a tire or a life saver.", "🍩")


# All shapes
ALL_SHAPES = [
    make_cube(),
    make_pyramid(),
    make_tetrahedron(),
    make_octahedron(),
    make_dodecahedron(),
    make_icosahedron(),
    make_sphere(),
    make_cylinder(),
    make_cone(),
    make_torus(),
]


# ============================================================
#   3D RENDERER
# ============================================================

class Renderer3D:
    """Projects 3D shapes onto 2D screen."""

    def __init__(self, cx, cy, scale=150):
        self.cx = cx
        self.cy = cy
        self.scale = scale
        self.focal = 6

    def project(self, vertices):
        """Project 3D vertices to 2D screen coordinates."""
        points = []
        for v in vertices:
            x, y, z = v
            z_shifted = z + self.focal
            if z_shifted < 0.1:
                z_shifted = 0.1
            factor = self.focal / z_shifted
            sx = self.cx + x * self.scale * factor
            sy = self.cy - y * self.scale * factor
            points.append((sx, sy, z))
        return points

    def draw_shape(self, shape, ax, ay, az, show_edges=True, show_vertices=True, 
                   show_faces=True, highlight_faces=None, alpha=200):
        """Draw a 3D shape on the screen."""
        verts = shape.get_rotated(ax, ay, az)
        points = self.project(verts)

        # Sort faces by average Z for proper rendering
        if show_faces and shape.faces:
            face_data = []
            for i, face in enumerate(shape.faces):
                if isinstance(face, tuple) and len(face) >= 3:
                    avg_z = sum(verts[j][2] for j in face) / len(face)
                    face_data.append((avg_z, i, face))

            face_data.sort(reverse=True)

            for avg_z, fi, face in face_data:
                pts = []
                valid = True
                for idx in face:
                    if idx < len(points):
                        pts.append(points[idx][:2])
                    else:
                        valid = False
                        break
                if not valid or len(pts) < 3:
                    continue

                # Color based on depth
                depth_factor = max(0.3, min(1.0, (avg_z + 3) / 6))
                base_color = shape.color

                is_highlighted = highlight_faces and fi in highlight_faces
                if is_highlighted:
                    color = tuple(min(255, int(c * 1.3)) for c in base_color)
                    alpha_val = 255
                else:
                    color = tuple(int(c * depth_factor) for c in base_color)
                    alpha_val = alpha

                # Draw filled face
                face_surf = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
                pygame.draw.polygon(face_surf, (*color, alpha_val), pts)
                screen.blit(face_surf, (0, 0))

                # Draw face outline
                if show_edges:
                    edge_color = tuple(min(255, c + 60) for c in color)
                    pygame.draw.polygon(screen, edge_color, pts, 2)

        # Draw edges
        if show_edges:
            for i, j in shape.edges:
                if i < len(points) and j < len(points):
                    p1 = points[i][:2]
                    p2 = points[j][:2]
                    avg_depth = (verts[i][2] + verts[j][2]) / 2
                    depth_factor = max(0.3, min(1.0, (avg_depth + 3) / 6))
                    color = tuple(int(min(255, c * depth_factor + 40)) for c in shape.color)
                    pygame.draw.line(screen, color, p1, p2, 2)

        # Draw vertices
        if show_vertices:
            for i, p in enumerate(points):
                avg_depth = verts[i][2] if i < len(verts) else 0
                depth_factor = max(0.3, min(1.0, (avg_depth + 3) / 6))
                color = tuple(int(min(255, c * depth_factor + 80)) for c in shape.color)
                r = max(2, int(4 * depth_factor))
                pygame.draw.circle(screen, color, (int(p[0]), int(p[1])), r)
                pygame.draw.circle(screen, WHITE, (int(p[0]), int(p[1])), r, 1)


# ============================================================
#   UI HELPERS
# ============================================================

class Button:
    def __init__(self, x, y, w, h, text, color=LIGHT_PINK, hover_color=HOT_PINK,
                 text_color=BG_DARK, font=None, rounded=True):
        self.rect = pygame.Rect(x, y, w, h)
        self.text = text
        self.color = color
        self.hover_color = hover_color
        self.text_color = text_color
        self.font = font or FONT_BOLD
        self.rounded = rounded
        self.hovered = False
        self.click_anim = 0

    def draw(self, surface):
        color = self.hover_color if self.hovered else self.color

        # Button shadow
        shadow_rect = self.rect.copy()
        shadow_rect.y += 3
        pygame.draw.rect(surface, (0,0,0,60), shadow_rect, border_radius=12)

        # Button body
        pygame.draw.rect(surface, color, self.rect, border_radius=12)

        # Gradient effect
        if self.hovered:
            gradient = pygame.Surface((self.rect.width, self.rect.height // 2), pygame.SRCALPHA)
            pygame.draw.rect(gradient, (255,255,255,40),
                           (0, 0, self.rect.width, self.rect.height // 2), border_radius=12)
            surface.blit(gradient, self.rect.topleft)

        # Border
        border_color = tuple(max(0, min(255, c - 30)) for c in color)
        pygame.draw.rect(surface, border_color, self.rect, 3, border_radius=12)

        # Text
        text_surf = self.font.render(self.text, True, self.text_color)
        text_rect = text_surf.get_rect(center=self.rect.center)
        surface.blit(text_surf, text_rect)

    def update(self, mouse_pos):
        self.hovered = self.rect.collidepoint(mouse_pos)
        if self.hovered:
            pygame.mouse.set_cursor(pygame.SYSTEM_CURSOR_HAND)
        else:
            pygame.mouse.set_cursor(pygame.SYSTEM_CURSOR_ARROW)

    def clicked(self, mouse_pos):
        return self.rect.collidepoint(mouse_pos)


def draw_text_centered(surface, text, font, color, y, x=None):
    if x is None:
        x = WIDTH // 2
    surf = font.render(text, True, color)
    rect = surf.get_rect(center=(x, y))
    surface.blit(surf, rect)


def draw_stars_bg(surface, time_val):
    """Draw animated background stars."""
    random.seed(42)  # Fixed seed for consistent star positions
    for _ in range(80):
        x = random.randint(0, WIDTH)
        y = random.randint(0, HEIGHT)
        size = random.randint(1, 3)
        brightness = int(128 + 127 * math.sin(time_val * 2 + x * 0.01 + y * 0.01))
        color = (brightness, brightness, min(255, brightness + 30))
        pygame.draw.circle(surface, color, (x, y), size)


def draw_info_panel(surface, shape, x, y, w, h):
    """Draw shape information panel."""
    panel = pygame.Surface((w, h), pygame.SRCALPHA)
    pygame.draw.rect(panel, (20, 15, 50, 200), (0, 0, w, h), border_radius=15)
    pygame.draw.rect(panel, PINK, (0, 0, w, h), 3, border_radius=15)
    surface.blit(panel, (x, y))

    # Shape name
    draw_text_centered(surface, f"{shape.emoji} {shape.name}", FONT_SHAPE, GOLD, y + 30, x + w//2)

    # Properties
    props = [
        f"Vertices: {shape.num_vertices}",
        f"Edges: {shape.num_edges}",
        f"Faces: {shape.num_faces}",
        f"Euler: V-E+F = {shape.num_vertices}-{shape.num_edges}+{shape.num_faces} = {shape.euler_check}",
    ]

    for i, prop in enumerate(props):
        draw_text_centered(surface, prop, FONT_SMALL, WHITE, y + 65 + i * 24, x + w//2)

    # Fun fact
    if shape.fun_fact:
        # Word wrap the fun fact
        words = shape.fun_fact.split()
        lines = []
        current_line = ""
        for word in words:
            test_line = current_line + " " + word if current_line else word
            if FONT_SMALL.size(test_line)[0] < w - 20:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        if current_line:
            lines.append(current_line)

        for i, line in enumerate(lines[:3]):
            draw_text_centered(surface, line, FONT_SMALL, LIGHT_CYAN, y + 175 + i * 20, x + w//2)


# ============================================================
#   GAME MODES
# ============================================================

class ExploreMode:
    """Interactive 3D shape explorer."""
    def __init__(self):
        self.renderer = Renderer3D(WIDTH // 2 - 100, HEIGHT // 2)
        self.shape_idx = 0
        self.ax = 0.3
        self.ay = 0.5
        self.az = 0
        self.auto_rotate = True
        self.dragging = False
        self.last_mouse = (0, 0)
        self.show_faces = True
        self.show_edges = True
        self.show_vertices = True

        # Buttons
        btn_w, btn_h = 140, 45
        self.btn_prev = Button(20, HEIGHT - 70, btn_w, btn_h, "< Prev", LIGHT_PURPLE, PURPLE)
        self.btn_next = Button(180, HEIGHT - 70, btn_w, btn_h, "Next >", LIGHT_PURPLE, PURPLE)
        self.btn_auto = Button(340, HEIGHT - 70, btn_w, btn_h, "Auto: ON", LIGHT_CYAN, CYAN, BG_DARK)
        self.btn_back = Button(WIDTH - 140, 15, 120, 40, "Back", LIGHT_PINK, HOT_PINK, BG_DARK, FONT_SMALL)
        self.btn_faces = Button(WIDTH - 160, HEIGHT - 70, btn_w, btn_h, "Faces", LIGHT_GREEN, GREEN, BG_DARK)
        self.btn_edges = Button(WIDTH - 310, HEIGHT - 70, btn_w, btn_h, "Edges", LIGHT_ORANGE, ORANGE, BG_DARK)
        self.btn_verts = Button(WIDTH - 460, HEIGHT - 70, btn_w, btn_h, "Vertices", LIGHT_BLUE, BLUE, BG_DARK)

        self.buttons = [self.btn_prev, self.btn_next, self.btn_auto, self.btn_back,
                       self.btn_faces, self.btn_edges, self.btn_verts]

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            mx, my = event.pos
            if event.button == 1:
                if self.btn_prev.clicked(event.pos):
                    self.shape_idx = (self.shape_idx - 1) % len(ALL_SHAPES)
                elif self.btn_next.clicked(event.pos):
                    self.shape_idx = (self.shape_idx + 1) % len(ALL_SHAPES)
                elif self.btn_auto.clicked(event.pos):
                    self.auto_rotate = not self.auto_rotate
                    self.btn_auto.text = f"Auto: {'ON' if self.auto_rotate else 'OFF'}"
                elif self.btn_back.clicked(event.pos):
                    return "menu"
                elif self.btn_faces.clicked(event.pos):
                    self.show_faces = not self.show_faces
                    self.btn_faces.color = LIGHT_GREEN if self.show_faces else DARK_GRAY
                elif self.btn_edges.clicked(event.pos):
                    self.show_edges = not self.show_edges
                    self.btn_edges.color = LIGHT_ORANGE if self.show_edges else DARK_GRAY
                elif self.btn_verts.clicked(event.pos):
                    self.show_vertices = not self.show_vertices
                    self.btn_verts.color = LIGHT_BLUE if self.show_vertices else DARK_GRAY
                else:
                    self.dragging = True
                    self.last_mouse = event.pos

        elif event.type == pygame.MOUSEBUTTONUP:
            self.dragging = False

        elif event.type == pygame.MOUSEMOTION and self.dragging:
            dx = event.pos[0] - self.last_mouse[0]
            dy = event.pos[1] - self.last_mouse[1]
            self.ay += dx * 0.01
            self.ax += dy * 0.01
            self.last_mouse = event.pos

        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                self.shape_idx = (self.shape_idx - 1) % len(ALL_SHAPES)
            elif event.key == pygame.K_RIGHT:
                self.shape_idx = (self.shape_idx + 1) % len(ALL_SHAPES)
            elif event.key == pygame.K_SPACE:
                self.auto_rotate = not self.auto_rotate
                self.btn_auto.text = f"Auto: {'ON' if self.auto_rotate else 'OFF'}"
            elif event.key == pygame.K_ESCAPE:
                return "menu"

        return None

    def update(self, dt, time_val):
        if self.auto_rotate and not self.dragging:
            self.ay += dt * 0.8
            self.ax += dt * 0.3

    def draw(self, time_val):
        draw_stars_bg(screen, time_val)

        shape = ALL_SHAPES[self.shape_idx]

        # Title
        draw_text_centered(screen, "Explore Shapes", FONT_SUBTITLE, GOLD, 35)

        # Draw shape
        self.renderer.draw_shape(shape, self.ax, self.ay, self.az,
                                self.show_edges, self.show_vertices, self.show_faces)

        # Info panel
        draw_info_panel(screen, shape, WIDTH - 280, 70, 260, 250)

        # Shape counter
        counter = f"{self.shape_idx + 1} / {len(ALL_SHAPES)}"
        draw_text_centered(screen, counter, FONT_SMALL, LIGHT_GRAY, HEIGHT - 28)

        # Hints
        draw_text_centered(screen, "Drag to rotate  |  Arrow keys to switch shapes", FONT_SMALL, (150,150,180), HEIGHT - 55)

        # Draw buttons
        mouse = pygame.mouse.get_pos()
        for btn in self.buttons:
            btn.update(mouse)
            btn.draw(screen)


class QuizMode:
    """Quiz game about shapes."""
    def __init__(self):
        self.renderer = Renderer3D(WIDTH // 2, HEIGHT // 2 - 40, scale=120)
        self.score = 0
        self.total_q = 0
        self.streak = 0
        self.best_streak = 0
        self.question = ""
        self.options = []
        self.correct_idx = 0
        self.selected_idx = -1
        self.show_result = False
        self.result_timer = 0
        self.ax = 0.3
        self.ay = 0.5
        self.current_shape = None
        self.question_type = ""
        self.feedback_text = ""
        self.feedback_color = WHITE

        # Buttons
        self.btn_back = Button(WIDTH - 140, 15, 120, 40, "Back", LIGHT_PINK, HOT_PINK, BG_DARK, FONT_SMALL)
        self.option_buttons = []
        self.btn_next_q = Button(WIDTH//2 - 100, HEIGHT - 80, 200, 50, "Next Question", LIGHT_CYAN, CYAN, BG_DARK)

        self.generate_question()

    def generate_question(self):
        self.show_result = False
        self.selected_idx = -1
        self.result_timer = 0
        shape = random.choice(ALL_SHAPES)
        self.current_shape = shape
        self.ax = random.uniform(0, math.pi)
        self.ay = random.uniform(0, math.pi)

        q_types = ["identify", "vertices", "edges", "faces", "fact"]
        self.question_type = random.choice(q_types)

        if self.question_type == "identify":
            self.question = "What shape is this?"
            # Show the shape, ask to identify
            wrong_names = [s.name for s in ALL_SHAPES if s.name != shape.name]
            random.shuffle(wrong_names)
            self.options = [shape.name] + wrong_names[:3]
            self.correct_idx = 0
            random.shuffle(self.options)
            self.correct_idx = self.options.index(shape.name)

        elif self.question_type == "vertices":
            self.question = f"How many vertices does a {shape.name} have?"
            correct = shape.num_vertices
            self.options = self._make_number_options(correct, 0, 30)
            self.correct_idx = self.options.index(correct)

        elif self.question_type == "edges":
            self.question = f"How many edges does a {shape.name} have?"
            correct = shape.num_edges
            self.options = self._make_number_options(correct, 0, 40)
            self.correct_idx = self.options.index(correct)

        elif self.question_type == "faces":
            self.question = f"How many faces does a {shape.name} have?"
            correct = shape.num_faces
            self.options = self._make_number_options(correct, 0, 30)
            self.correct_idx = self.options.index(correct)

        elif self.question_type == "fact":
            self.question = f"What shape am I? ({shape.fun_fact})"
            wrong_names = [s.name for s in ALL_SHAPES if s.name != shape.name]
            random.shuffle(wrong_names)
            self.options = [shape.name] + wrong_names[:3]
            random.shuffle(self.options)
            self.correct_idx = self.options.index(shape.name)

        # Create option buttons
        self.option_buttons = []
        for i, opt in enumerate(self.options):
            bx = 100 + (i % 2) * 220
            by = HEIGHT - 220 + (i // 2) * 65
            color = LIGHT_PINK if self.question_type != "identify" else SHAPE_COLORS[i % len(SHAPE_COLORS)]
            self.option_buttons.append(
                Button(bx, by, 200, 55, str(opt), color, GOLD, BG_DARK)
            )

    def _make_number_options(self, correct, low, high):
        opts = [correct]
        while len(opts) < 4:
            fake = random.randint(max(low, correct - 5), min(high, correct + 5))
            if fake not in opts and fake >= 0:
                opts.append(fake)
        random.shuffle(opts)
        return opts

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            if self.btn_back.clicked(event.pos):
                return "menu"

            if self.show_result:
                if self.btn_next_q.clicked(event.pos):
                    self.generate_question()
                return None

            for i, btn in enumerate(self.option_buttons):
                if btn.clicked(event.pos):
                    self.selected_idx = i
                    self.show_result = True
                    self.result_timer = 0
                    self.total_q += 1

                    if i == self.correct_idx:
                        self.score += 10 + self.streak * 2
                        self.streak += 1
                        self.best_streak = max(self.best_streak, self.streak)
                        self.feedback_text = random.choice([
                            "Correct! You're a geometry star!",
                            "Amazing! You know your shapes!",
                            "Perfect! Keep it up!",
                            "Brilliant! Shape master!",
                            "Yes! Euler would be proud!",
                        ])
                        self.feedback_color = GREEN
                    else:
                        self.streak = 0
                        correct_answer = self.options[self.correct_idx]
                        self.feedback_text = f"Not quite! The answer is {correct_answer}."
                        self.feedback_color = LIGHT_ORANGE

        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                return "menu"
            if self.show_result and event.key == pygame.K_SPACE:
                self.generate_question()
            if not self.show_result:
                for i in range(min(4, len(self.options))):
                    if event.key == pygame.K_1 + i:
                        self.selected_idx = i
                        self.show_result = True
                        self.total_q += 1
                        if i == self.correct_idx:
                            self.score += 10 + self.streak * 2
                            self.streak += 1
                            self.best_streak = max(self.best_streak, self.streak)
                            self.feedback_text = "Correct! "
                            self.feedback_color = GREEN
                        else:
                            self.streak = 0
                            self.feedback_text = f"Answer: {self.options[self.correct_idx]}"
                            self.feedback_color = LIGHT_ORANGE

        return None

    def update(self, dt, time_val):
        self.ay += dt * 0.5
        if self.show_result:
            self.result_timer += dt

    def draw(self, time_val):
        draw_stars_bg(screen, time_val)

        # Header
        draw_text_centered(screen, "Shape Quiz", FONT_SUBTITLE, GOLD, 30)

        # Score
        score_text = f"Score: {self.score}  |  Streak: {self.streak}  |  Questions: {self.total_q}"
        draw_text_centered(screen, score_text, FONT_SMALL, LIGHT_CYAN, 60)

        # Draw current shape
        if self.current_shape:
            self.renderer.draw_shape(self.current_shape, self.ax, self.ay, 0)

        # Question
        draw_text_centered(screen, self.question, FONT_SHAPE, WHITE, HEIGHT - 290)

        # Option buttons
        mouse = pygame.mouse.get_pos()
        for i, btn in enumerate(self.option_buttons):
            btn.update(mouse)

            if self.show_result:
                if i == self.correct_idx:
                    btn.color = GREEN
                    btn.hover_color = GREEN
                elif i == self.selected_idx:
                    btn.color = RED
                    btn.hover_color = RED

            btn.draw(screen)
            # Draw number hints
            hint = FONT_SMALL.render(str(i+1), True, BG_DARK)
            screen.blit(hint, (btn.rect.x + 8, btn.rect.centery - 8))

        # Feedback
        if self.show_result:
            draw_text_centered(screen, self.feedback_text, FONT_BOLD, self.feedback_color, HEIGHT - 150)
            self.btn_next_q.update(mouse)
            self.btn_next_q.draw(screen)
            draw_text_centered(screen, "Press SPACE for next", FONT_SMALL, LIGHT_GRAY, HEIGHT - 20)

        # Back button
        self.btn_back.update(mouse)
        self.btn_back.draw(screen)


class CountingMode:
    """Count faces, edges, vertices interactively."""
    def __init__(self):
        self.renderer = Renderer3D(WIDTH // 2 - 120, HEIGHT // 2 - 30, scale=130)
        self.shape_idx = 0
        self.ax = 0.3
        self.ay = 0.5
        self.score = 0
        self.total_q = 0
        self.streak = 0
        self.current_property = ""
        self.user_answer = ""
        self.show_result = False
        self.feedback = ""
        self.feedback_color = WHITE
        self.cursor_blink = 0

        self.properties = ["faces", "edges", "vertices"]
        self.current_prop_idx = 0

        self.btn_back = Button(WIDTH - 140, 15, 120, 40, "Back", LIGHT_PINK, HOT_PINK, BG_DARK, FONT_SMALL)
        self.btn_submit = Button(WIDTH//2 - 80, HEIGHT - 120, 160, 50, "Check!", LIGHT_GREEN, GREEN, BG_DARK)
        self.btn_next = Button(WIDTH//2 - 80, HEIGHT - 120, 160, 50, "Next", LIGHT_CYAN, CYAN, BG_DARK)

        self.new_question()

    def new_question(self):
        self.shape_idx = random.randint(0, len(ALL_SHAPES) - 1)
        self.current_prop_idx = random.randint(0, 2)
        self.current_property = self.properties[self.current_prop_idx]
        self.user_answer = ""
        self.show_result = False
        self.ax = random.uniform(-0.5, 0.5)
        self.ay = random.uniform(0, math.pi)

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            if self.btn_back.clicked(event.pos):
                return "menu"
            if self.show_result:
                if self.btn_next.clicked(event.pos):
                    self.new_question()
            else:
                if self.btn_submit.clicked(event.pos):
                    self.check_answer()
            return None

        if event.type == pygame.KEYDOWN and not self.show_result:
            if event.key == pygame.K_ESCAPE:
                return "menu"
            elif event.key == pygame.K_RETURN:
                self.check_answer()
            elif event.key == pygame.K_BACKSPACE:
                self.user_answer = self.user_answer[:-1]
            elif event.key == pygame.K_SPACE:
                pass
            elif event.unicode.isdigit():
                self.user_answer += event.unicode

        if event.type == pygame.KEYDOWN and self.show_result:
            if event.key in (pygame.K_RETURN, pygame.K_SPACE):
                self.new_question()
            elif event.key == pygame.K_ESCAPE:
                return "menu"

        return None

    def check_answer(self):
        shape = ALL_SHAPES[self.shape_idx]
        correct = getattr(shape, f"num_{self.current_property}")
        try:
            user_val = int(self.user_answer)
        except:
            user_val = -1

        self.show_result = True
        self.total_q += 1

        if user_val == correct:
            self.score += 10
            self.streak += 1
            self.feedback = random.choice([
                f"Correct! {shape.name} has {correct} {self.current_property}!",
                f"Amazing! You counted perfectly!",
                f"Perfect! {correct} is right!",
            ])
            self.feedback_color = GREEN
        else:
            self.streak = 0
            self.feedback = f"The answer is {correct} {self.current_property}!"
            self.feedback_color = LIGHT_ORANGE

    def update(self, dt, time_val):
        self.ay += dt * 0.6
        self.cursor_blink += dt

    def draw(self, time_val):
        draw_stars_bg(screen, time_val)

        shape = ALL_SHAPES[self.shape_idx]

        # Title
        draw_text_centered(screen, "Count the Shape Parts!", FONT_SUBTITLE, GOLD, 30)

        # Score
        score_text = f"Score: {self.score}  |  Questions: {self.total_q}"
        draw_text_centered(screen, score_text, FONT_SMALL, LIGHT_CYAN, 60)

        # Draw shape
        self.renderer.draw_shape(shape, self.ax, self.ay, 0, show_vertices=True)

        # Shape name
        draw_text_centered(screen, f"{shape.emoji} {shape.name}", FONT_SHAPE, WHITE, HEIGHT - 195,
                          WIDTH // 2 - 120)

        # Question
        prop_labels = {"faces": "Faces", "edges": "Edges", "vertices": "Vertices"}
        prop_colors = {"faces": GREEN, "edges": ORANGE, "vertices": BLUE}
        prop_color = prop_colors.get(self.current_property, WHITE)

        q_text = f"How many {self.current_property}?"
        draw_text_centered(screen, q_text, FONT_SHAPE, prop_color, HEIGHT - 160, WIDTH // 2 - 120)

        if not self.show_result:
            # Input box
            input_rect = pygame.Rect(WIDTH//2 - 200, HEIGHT - 130, 160, 45)
            pygame.draw.rect(screen, WHITE, input_rect, border_radius=8)
            pygame.draw.rect(screen, prop_color, input_rect, 3, border_radius=8)

            answer_display = self.user_answer
            if int(self.cursor_blink * 2) % 2 == 0:
                answer_display += "|"

            ans_surf = FONT_BOLD.render(answer_display, True, BG_DARK)
            screen.blit(ans_surf, (input_rect.x + 15, input_rect.y + 8))

            self.btn_submit.update(pygame.mouse.get_pos())
            self.btn_submit.draw(screen)
        else:
            # Show result
            result_color = GREEN if self.streak > 0 else LIGHT_ORANGE
            draw_text_centered(screen, self.feedback, FONT_BOLD, result_color,
                             HEIGHT - 130, WIDTH // 2 - 120)

            self.btn_next.update(pygame.mouse.get_pos())
            self.btn_next.draw(screen)

        # Back button
        self.btn_back.update(pygame.mouse.get_pos())
        self.btn_back.draw(screen)


class BuilderMode:
    """Build structures with shapes."""
    def __init__(self):
        self.renderer = Renderer3D(WIDTH // 2, HEIGHT // 2, scale=100)
        self.ax = 0.4
        self.ay = 0.5
        self.placed_shapes = []
        self.available_shapes = list(range(len(ALL_SHAPES)))
        self.selected_shape_idx = 0
        self.build_x = 0
        self.build_y = 0
        self.build_z = 0
        self.dragging = False
        self.last_mouse = (0, 0)
        self.auto_rotate = True
        self.show_grid = True

        self.btn_back = Button(WIDTH - 140, 15, 120, 40, "Back", LIGHT_PINK, HOT_PINK, BG_DARK, FONT_SMALL)
        self.btn_clear = Button(20, HEIGHT - 65, 120, 40, "Clear All", LIGHT_ORANGE, ORANGE, BG_DARK, FONT_SMALL)
        self.btn_undo = Button(150, HEIGHT - 65, 120, 40, "Undo", LIGHT_PURPLE, PURPLE, BG_DARK, FONT_SMALL)

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            if self.btn_back.clicked(event.pos):
                return "menu"
            if self.btn_clear.clicked(event.pos):
                self.placed_shapes = []
                return None
            if self.btn_undo.clicked(event.pos):
                if self.placed_shapes:
                    self.placed_shapes.pop()
                return None

            if event.button == 1:
                # Place a shape
                shape_data = {
                    'shape_idx': self.selected_shape_idx,
                    'x': self.build_x,
                    'y': self.build_y,
                    'z': self.build_z,
                    'ax': self.ax,
                    'ay': self.ay,
                    'color_offset': random.uniform(0, 0.3),
                }
                self.placed_shapes.append(shape_data)
            elif event.button == 3:
                self.dragging = True
                self.last_mouse = event.pos
            elif event.button == 4:  # Scroll up
                self.selected_shape_idx = (self.selected_shape_idx + 1) % len(ALL_SHAPES)
            elif event.button == 5:  # Scroll down
                self.selected_shape_idx = (self.selected_shape_idx - 1) % len(ALL_SHAPES)

        elif event.type == pygame.MOUSEBUTTONUP:
            self.dragging = False

        elif event.type == pygame.MOUSEMOTION and self.dragging:
            dx = event.pos[0] - self.last_mouse[0]
            dy = event.pos[1] - self.last_mouse[1]
            self.ay += dx * 0.01
            self.ax += dy * 0.01
            self.last_mouse = event.pos

        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                return "menu"
            elif event.key == pygame.K_LEFT:
                self.build_x -= 0.3
            elif event.key == pygame.K_RIGHT:
                self.build_x += 0.3
            elif event.key == pygame.K_UP:
                self.build_y += 0.3
            elif event.key == pygame.K_DOWN:
                self.build_y -= 0.3
            elif event.key == pygame.K_PAGEUP:
                self.build_z += 0.3
            elif event.key == pygame.K_PAGEDOWN:
                self.build_z -= 0.3
            elif event.key == pygame.K_TAB:
                self.selected_shape_idx = (self.selected_shape_idx + 1) % len(ALL_SHAPES)
            elif event.key == pygame.K_z:
                if self.placed_shapes:
                    self.placed_shapes.pop()
            elif event.key == pygame.K_SPACE:
                self.auto_rotate = not self.auto_rotate

        return None

    def update(self, dt, time_val):
        if self.auto_rotate:
            self.ay += dt * 0.3

    def draw(self, time_val):
        draw_stars_bg(screen, time_val)

        # Title
        draw_text_centered(screen, "Shape Builder", FONT_SUBTITLE, GOLD, 30)

        # Shape count
        count_text = f"Shapes placed: {len(self.placed_shapes)}"
        draw_text_centered(screen, count_text, FONT_SMALL, LIGHT_CYAN, 58)

        # Draw grid base
        if self.show_grid:
            grid_pts = []
            for i in range(-3, 4):
                for j in range(-3, 4):
                    v = np.array([[i * 0.4, -2, j * 0.4]])
                    rotated = v @ Renderer3D._rotation_matrix(self.ax, 0).T
                    rotated = rotated @ Renderer3D._rotation_matrix(self.ay, 1).T
                    pt = self.renderer.project(rotated)[0]
                    grid_pts.append((pt[0], pt[1]))

            for i in range(-3, 4):
                line_pts = []
                for j in range(-3, 4):
                    idx = (i + 3) * 7 + (j + 3)
                    if 0 <= idx < len(grid_pts):
                        line_pts.append(grid_pts[idx])
                if len(line_pts) > 1:
                    pygame.draw.lines(screen, (50, 50, 80), False, line_pts, 1)

        # Draw placed shapes
        for sd in self.placed_shapes:
            shape = ALL_SHAPES[sd['shape_idx']]
            verts = shape.get_rotated(sd['ax'], sd['ay'], 0)
            verts += np.array([sd['x'], sd['y'], sd['z']])
            points = self.renderer.project(verts)

            # Draw edges
            for i, j in shape.edges:
                if i < len(points) and j < len(points):
                    p1 = points[i][:2]
                    p2 = points[j][:2]
                    color = SHAPE_COLORS[sd['shape_idx'] % len(SHAPE_COLORS)]
                    pygame.draw.line(screen, color, p1, p2, 2)

            # Draw vertices
            for p in points:
                pygame.draw.circle(screen, WHITE, (int(p[0]), int(p[1])), 2)

        # Draw cursor shape
        cursor_shape = ALL_SHAPES[self.selected_shape_idx]
        cursor_verts = cursor_shape.get_rotated(self.ax + time_val * 0.5, self.ay + time_val * 0.3, 0)
        cursor_verts *= 0.4
        cursor_verts += np.array([self.build_x, self.build_y, self.build_z])
        cursor_points = self.renderer.project(cursor_verts)

        for i, j in cursor_shape.edges:
            if i < len(cursor_points) and j < len(cursor_points):
                p1 = cursor_points[i][:2]
                p2 = cursor_points[j][:2]
                color = (100, 100, 100)
                pygame.draw.line(screen, color, p1, p2, 1)

        # Current shape selector
        selector_text = f"Selected: {cursor_shape.emoji} {cursor_shape.name}"
        draw_text_centered(screen, selector_text, FONT_SMALL, LIGHT_GRAY, HEIGHT - 30)

        # Instructions
        draw_text_centered(screen, "Click: Place | Arrow: Move cursor | Tab: Switch shape | Scroll: Cycle shapes",
                          FONT_SMALL, (120,120,150), HEIGHT - 58)

        # Buttons
        mouse = pygame.mouse.get_pos()
        self.btn_back.update(mouse)
        self.btn_back.draw(screen)
        self.btn_clear.update(mouse)
        self.btn_clear.draw(screen)
        self.btn_undo.update(mouse)
        self.btn_undo.draw(screen)


# ============================================================
#   MAIN MENU
# ============================================================

class MainMenu:
    def __init__(self):
        self.buttons = [
            Button(WIDTH//2 - 180, 280, 360, 65, "Explore Shapes", LIGHT_PINK, HOT_PINK, BG_DARK, FONT_SUBTITLE),
            Button(WIDTH//2 - 180, 365, 360, 65, "Shape Quiz", LIGHT_CYAN, CYAN, BG_DARK, FONT_SUBTITLE),
            Button(WIDTH//2 - 180, 450, 360, 65, "Count Parts", LIGHT_GREEN, GREEN, BG_DARK, FONT_SUBTITLE),
            Button(WIDTH//2 - 180, 535, 360, 65, "Shape Builder", LIGHT_PURPLE, PURPLE, BG_DARK, FONT_SUBTITLE),
            Button(WIDTH//2 - 180, 620, 360, 65, "Quit", LIGHT_ORANGE, ORANGE, BG_DARK, FONT_SUBTITLE),
        ]
        self.titles = ["Geometry", "Galaxy"]
        self.title_colors = [GOLD, CYAN]
        self.title_y = 120
        self.subtitle = "Learn 3D Shapes!"
        self.shape_preview_idx = 0
        self.preview_time = 0

    def handle_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            if self.buttons[0].clicked(event.pos):
                return "explore"
            elif self.buttons[1].clicked(event.pos):
                return "quiz"
            elif self.buttons[2].clicked(event.pos):
                return "counting"
            elif self.buttons[3].clicked(event.pos):
                return "builder"
            elif self.buttons[4].clicked(event.pos):
                return "quit"
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_1:
                return "explore"
            elif event.key == pygame.K_2:
                return "quiz"
            elif event.key == pygame.K_3:
                return "counting"
            elif event.key == pygame.K_4:
                return "builder"
            elif event.key == pygame.K_ESCAPE:
                return "quit"
        return None

    def update(self, dt, time_val):
        self.preview_time = time_val
        self.shape_preview_idx = int(time_val * 0.5) % len(ALL_SHAPES)

    def draw(self, time_val):
        draw_stars_bg(screen, time_val)

        # Draw preview shape in background
        preview_renderer = Renderer3D(WIDTH // 2, 200, scale=80)
        shape = ALL_SHAPES[self.shape_preview_idx]
        preview_renderer.draw_shape(shape, time_val * 0.3, time_val * 0.5, 0,
                                   show_edges=True, show_vertices=False, alpha=80)

        # Title
        y_offset = math.sin(time_val * 1.5) * 5
        draw_text_centered(screen, "Geometry", FONT_HUGE, GOLD, self.title_y + y_offset - 15)
        draw_text_centered(screen, "Galaxy", FONT_HUGE, CYAN, self.title_y + 55 + y_offset)

        # Subtitle
        draw_text_centered(screen, self.subtitle, FONT_BODY, LIGHT_PINK, self.title_y + 110)

        # Decorative stars
        for i in range(6):
            sx = WIDTH//2 + math.cos(time_val + i * math.pi/3) * 250
            sy = self.title_y + 20 + math.sin(time_val * 1.5 + i * math.pi/3) * 30
            star_size = 3 + math.sin(time_val * 3 + i) * 2
            pygame.draw.circle(screen, GOLD, (int(sx), int(sy)), int(star_size))

        # Buttons
        mouse = pygame.mouse.get_pos()
        for btn in self.buttons:
            btn.update(mouse)
            btn.draw(screen)

        # Footer
        draw_text_centered(screen, "Click a button or press 1-4 to start", FONT_SMALL, LIGHT_GRAY, HEIGHT - 25)


# ============================================================
#   MAIN GAME CLASS
# ============================================================

class GeometryGame:
    def __init__(self):
        self.state = "menu"
        self.modes = {
            "menu": MainMenu(),
            "explore": ExploreMode(),
            "quiz": QuizMode(),
            "counting": CountingMode(),
            "builder": BuilderMode(),
        }
        self.time_val = 0
        self.running = True

    def run(self):
        while self.running:
            dt = clock.tick(FPS) / 1000.0
            self.time_val += dt

            # Events
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    self.running = False
                    break

                result = self.modes[self.state].handle_event(event)
                if result == "menu":
                    self.state = "menu"
                elif result == "quit":
                    self.running = False
                elif result and result in self.modes:
                    self.state = result

            if not self.running:
                break

            # Update
            self.modes[self.state].update(dt, self.time_val)

            # Draw
            screen.fill(BG_DARK)
            self.modes[self.state].draw(self.time_val)

            pygame.display.flip()

        pygame.quit()
        sys.exit()


if __name__ == "__main__":
    game = GeometryGame()
    game.run()
