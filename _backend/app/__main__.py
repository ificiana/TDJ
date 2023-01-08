import re

from flask import Flask, request, jsonify
from pymongo.collection import Collection

from .dbc import connect

app = Flask(__name__)
mc = connect()


@app.route('/')
def hello_world():
    return 'Hello from Flask!'


@app.route("/tdj-get", methods=['GET'])
def tdj_get():
    col: Collection = mc.data.main
    key = request.args.get('') or "404"
    cursor = col.aggregate([
        {'$match': {'key': key}},
        {'$project': {"_id": 0}},
        {'$addFields': {"footer": "[!edit] this page<br>TDJ by Ificiana"}},
    ])
    try:
        data = next(cursor)
    except StopIteration:
        data = next(col.aggregate([
            {'$match': {'key': "404"}},
            {'$project': {"_id": 0}},
            {'$addFields': {"footer": "[!edit] this page<br>TDJ by Ificiana"}},
        ]))
    res = jsonify(data)
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res


@app.route("/tdj-search", methods=['GET'])
def tdj_search():
    col: Collection = mc.data.main
    if key := re.sub(r"\d", "", request.args.get('q')):
        cursor = col.aggregate([
            {'$search': {'index': 'key', 'text': {
                'query': key,
                'path': {'wildcard': '*'},
                "fuzzy": {
                    "maxEdits": 2,
                    "maxExpansions": 1
                }}}},
            # {"$match": {"key": {"$not": {"$regex": "\\d+"}}}},
            {'$project': {"_id": 0, "key": 1}},
            {'$limit': 25},
        ])
        data = [i["key"] for i in cursor]
    else:
        data = []
    res = jsonify(data)
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res


@app.route('/tdj-edit', methods=['POST'])
def tdj_edit():
    print()
