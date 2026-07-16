from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/animals")
def animals():
    return render_template("animals.html")

@app.route("/colors")
def colors():
    return render_template("colors.html")

@app.route("/games")
def games():
    return render_template("games.html")

@app.route("/music")
def music():
    return render_template("music.html")

@app.route("/api/joke")
def joke():
    jokes = [
        {"q": "Why did the teddy bear say no to dessert?", "a": "Because she was already stuffed!"},
        {"q": "What do you call a sleeping dinosaur?", "a": "A dino-snore!"},
        {"q": "Why did the cookie go to the doctor?", "a": "Because it felt crummy!"},
        {"q": "What do cats eat for breakfast?", "a": "Mice Krispies!"},
        {"q": "Why was the math book sad?", "a": "Because it had too many problems!"},
        {"q": "What do you call a bear with no teeth?", "a": "A gummy bear!"},
        {"q": "Why do birds fly south?", "a": "Because it's too far to walk!"},
        {"q": "What did the big chimney say to the small chimney?", "a": "You're too young to smoke!"},
    ]
    return jsonify(random.choice(jokes))

@app.route("/api/animal-fact")
def animal_fact():
    facts = [
        {"animal": "Octopus", "fact": "Octopuses have 3 hearts!", "emoji": "\U0001f419"},
        {"animal": "Giraffe", "fact": "Giraffes only need 30 minutes of sleep!", "emoji": "\U0001f992"},
        {"animal": "Penguin", "fact": "Penguins propose with pebbles!", "emoji": "\U0001f427"},
        {"animal": "Dolphin", "fact": "Dolphins sleep with one eye open!", "emoji": "\U0001f42c"},
        {"animal": "Elephant", "fact": "Elephants are the only animals that can't jump!", "emoji": "\U0001f418"},
        {"animal": "Cat", "fact": "Cats spend 70% of their lives sleeping!", "emoji": "\U0001f431"},
        {"animal": "Butterfly", "fact": "Butterflies taste with their feet!", "emoji": "\U0001f98b"},
        {"animal": "Sloth", "fact": "Sloths can hold their breath for 40 minutes!", "emoji": "\U0001f9a5"},
    ]
    return jsonify(random.choice(facts))

if __name__ == "__main__":
    app.run(debug=True)
