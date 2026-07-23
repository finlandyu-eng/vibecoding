import sqlite3
import os
from flask import Flask, render_template, g

app = Flask(__name__)
DB_PATH = os.path.join(os.path.dirname(__file__), "blog.db")


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(exception):
    db = g.pop("db", None)
    if db:
        db.close()


def init_db():
    db = sqlite3.connect(DB_PATH)
    db.execute(
        """CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            icon TEXT NOT NULL,
            excerpt TEXT NOT NULL,
            content TEXT NOT NULL
        )"""
    )
    db.commit()

    count = db.execute("SELECT COUNT(*) FROM posts").fetchone()[0]
    if count == 0:
        posts = [
            ("morning-routine", "My Dreamy Morning Routine", "July 20, 2026", "Self Care", "🌸",
             "How I start my day feeling like a princess...",
             "<p>There's something magical about waking up before the world gets loud. I light a lavender candle, sip my matcha latte, and journal for ten minutes before reaching for my phone.</p>"
             "<p>Skincare comes next — a gentle cleanser, vitamin C serum, and SPF always. Then I pick out an outfit that makes me feel confident and ready to take on the day.</p>"
             "<p>It's the little rituals that make the biggest difference. You don't need a whole hour — just 20 minutes of intentional 'me time' can change everything. Try it for a week and watch the magic unfold!</p>"),
            ("pink-aesthetic-room", "How I Created My Pink Aesthetic Room", "July 15, 2026", "Lifestyle", "🎀",
             "Turning my room into a pink paradise on a budget...",
             "<p>Everyone deserves a space that feels like a warm hug. I transformed my bedroom using fairy lights, rose gold accents, and the softest pink throw pillows from Target.</p>"
             "<p>My favorite find? A fluffy pink rug that makes getting out of bed feel like stepping onto a cloud. Add some dried pampas grass in a ceramic vase and you've got instant cottagecore vibes.</p>"
             "<p>Pro tip: Stick to 3 colors max — mine are blush pink, white, and gold. It keeps everything looking cohesive and dreamy without feeling cluttered.</p>"),
            ("self-love-letter", "A Love Letter to Myself", "July 10, 2026", "Wellness", "💌",
             "Why writing yourself a love letter changes everything...",
             "<p>I sat down one evening with my favorite pen and wrote a letter to myself. Not to my future self, not to my past self — to me, right now, in this exact moment.</p>"
             "<p>I told myself I'm proud of how far I've come. I acknowledged the hard days and celebrated the small wins. I reminded myself that I don't need to earn rest or love — I already deserve them.</p>"
             "<p>If you've never tried this, grab some pretty stationery and just write. It might feel silly at first, but there's something incredibly healing about hearing kind words from the person who knows you best — you.</p>"),
            ("spring-recipes", "5 Pink Drinks for Your Next Girl's Night", "July 5, 2026", "Recipes", "🍓",
             "Aesthetically delicious drinks that taste as good as they look...",
             "<p>Nothing says 'girl's night' like a table full of pink drinks! Here are my top five favorites:</p>"
             "<p><strong>1. Strawberry Rosé Spritzer</strong> — Mix rosé with fresh strawberry puree and a splash of sparkling water. Garnish with a strawberry slice.</p>"
             "<p><strong>2. Pink Sunset Mocktail</strong> — Grapefruit juice, grenadine, and tonic water over ice. It looks like a sunset in a glass!</p>"
             "<p><strong>3. Rose Latte</strong> — Your favorite latte with a teaspoon of rose syrup. Floral and cozy.</p>"
             "<p><strong>4. Raspberry Lemonade Fizz</strong> — Fresh lemonade blended with raspberries and topped with Sprite.</p>"
             "<p><strong>5. Watermelon Cooler</strong> — Blended watermelon, lime juice, and a hint of mint. So refreshing!</p>"),
            ("book-club", "Books Every Girly Girl Should Read", "July 1, 2026", "Book Club", "📚",
             "My favorite feel-good reads for cozy nights in...",
             "<p>There's nothing better than curling up with a good book and a cup of tea. Here are my absolute favorites:</p>"
             "<p><strong>1. 'Beach Read' by Emily Henry</strong> — Witty, romantic, and the perfect summer read.</p>"
             "<p><strong>2. 'The Alchemist' by Paulo Coelho</strong> — A beautiful story about following your dreams.</p>"
             "<p><strong>3. 'Becoming' by Michelle Obama</strong> — Inspiring, empowering, and deeply personal.</p>"
             "<p><strong>4. 'Normal People' by Sally Rooney</strong> — Raw, emotional, and beautifully written.</p>"
             "<p><strong>5. 'The Secret Garden'</strong> — A timeless classic that feels like a warm hug. Perfect for re-reading!</p>"
             "<p>What's on your reading list? I'd love to know!</p>"),
        ]
        db.executemany(
            "INSERT INTO posts (slug, title, date, category, icon, excerpt, content) VALUES (?,?,?,?,?,?,?)",
            posts,
        )
        db.commit()
    db.close()


@app.route("/")
def home():
    db = get_db()
    posts = db.execute("SELECT * FROM posts ORDER BY id DESC LIMIT 3").fetchall()
    return render_template("index.html", posts=posts)


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/gallery")
def gallery():
    return render_template("gallery.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/blog")
def blog():
    db = get_db()
    posts = db.execute("SELECT * FROM posts ORDER BY id DESC").fetchall()
    return render_template("blog.html", posts=posts)


@app.route("/blog/<slug>")
def post(slug):
    db = get_db()
    row = db.execute("SELECT * FROM posts WHERE slug = ?", (slug,)).fetchone()
    if not row:
        return "Post not found", 404
    return render_template("post.html", post=row)


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
