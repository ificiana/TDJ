# TDJ - TopDownJapanese

\[For personal use only] TDJ is a dictionary-like repository to aid learning japanese. It
uses https://dictionary.goo.ne.jp/ for its entries.

## Features

* Dictionary lookup
* Searching
* WYSIWYG Editing

## Planned Features

* Text analyser
* Flash cards

## How to Use

[//]: # (* First write the `dbc.py` file inside `app` package directory.)

[//]: # (  It looks like this:)

[//]: # (  ```pycon)

[//]: # (  import os)

[//]: # (      )

[//]: # (  import pymongo)

[//]: # (  )

[//]: # (  USER = os.getenv&#40;"MONGOUSER"&#41;)

[//]: # (  PASSWORD = os.getenv&#40;"MONGOPASSWORD"&#41;)

[//]: # (  SITE = os.getenv&#40;"MONGOSITE"&#41;)

[//]: # (  )

[//]: # (  )

[//]: # (  def connect&#40;&#41;:)

[//]: # (      return pymongo.MongoClient&#40;)

[//]: # (          f"mongodb+srv://{USER}:{PASSWORD}@{SITE}.mongodb.net/?retryWrites=true&w=majority"&#41;)

[//]: # (  )

[//]: # (  def auth&#40;data&#41;:)

[//]: # (      return something_that_is_true_on_auth&#40;&#41;)

[//]: # (  ```)

[//]: # (* Ask me for the credentials. &#40;... heh&#41;)

[//]: # (* Then get the backend running at http://127.0.0.1:5000. Make sure you see "Hello from Flask!")

[//]: # (* )

* Go to https://ificiana.github.io/tdj to get started!

## Why not automate the entries?

Because I am the one learning. If I didn't learn the word, it won't be here.
Basic kana-only words will not be there. (Homepage is an exception)

[//]: # (## Why not host the backend?)

[//]: # ()

[//]: # (Well, sure... but, I need the host to host it. For free.)