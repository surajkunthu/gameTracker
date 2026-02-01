# Database for Tracking Games

Web page built in TypeScript/JavaScript

Technologies used:

- Node.js
- Express.js
- PostgreSQL
- Knex.js
- [Steamgriddb API](https://github.com/SteamGridDB/node-steamgriddb)

Data Model for Game

```json
{
    "id":,
    "franchise":,
    "franchise_index":,
    "title":,
    "imgURL":,
    "score":,
    "developer":,
    "publisher":,
    "year":,
    "platform(s) played on": [],
    "genre(s)": [],
    "dlc(s)": [
        {
            "dlc_title_X":,
            "dlc_imgURL_X":,
            "dlc_score_X":,
            "notes":,
        },
    ],
    "notes":,
}
```
