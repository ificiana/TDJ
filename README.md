# TDJ - TopDownJapanese

\[For personal use only] TDJ is a dictionary-like repository to aid learning japanese. It
uses https://dictionary.goo.ne.jp/ for its entries.

## Features

* Dictionary lookup
* Searching

## Planned Features

* WYSIWYG Editing (almost there...)
* Text analyser
* Flash cards

## How to Use

* First write the `dbc.py` file inside `app` package directory.
  It looks like this:
    ```py
    import os
    
    import pymongo
    
    USER = os.getenv("MONGOUSER")
    PASSWORD = os.getenv("MONGOPASSWORD")
    SITE = os.getenv("MONGOSITE")
    
    
    def connect():
        return pymongo.MongoClient(
            f"mongodb+srv://{USER}:{PASSWORD}@{SITE}.mongodb.net/?retryWrites=true&w=majority")
    ```
* Ask me the credentials. (... heh)
* Then get the backend running at http://127.0.0.1:5000.
* Go to https://ificiana.github.io/tdj to get started!

## Why not automate the entries?

Because I am the one learning. If I didn't learn the word, it won't be here.

## Why not host the backend?

Well, sure... but, I need the host to host it. For free.