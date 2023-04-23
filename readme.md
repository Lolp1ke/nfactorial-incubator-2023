# nFactorial incubator 2023

### Here is my noSQL database built up from scratch
As core storage I used .json files

This database supports images they are saved in Base64 format


##### Application tested on
```
Windows 11 22H2
AMD processor family
```
##### Node js and package manager
```
node v18.15.0
yarn v1.22.19
```

## Tech Stack

**Client:** React, Typescript

**Server:** Node, Express, Typescript

##### Start commands

Backend:
```bash
cd backend
yarn
yarn start
```
Frontend:
```bash
cd frontend
yarn
yarn dev
```
## Backend Routing
#### Create Database

```http
  POST /api/db/create
```
| Parameter | Type     | Description                     |
|:----------|:---------|:--------------------------------|
| `name`    | `string` | **Required**. Name for database |

#### Delete Database

```http
  POST /api/db/delete
```
| Parameter | Type     | Description                     |
|:----------|:---------|:--------------------------------|
| `name`    | `string` | **Required**. Name for database |

#### Get specific database
```http
  GET /api/db/get-one
```
| Parameter | Type     | Description                     |
|:----------|:---------|:--------------------------------|
| `name`    | `string` | **Required**. Name for database |

#### Get all databases
```http
  GET /api/db/get-all
```
Other calls you can check in project just clone it :)

## Authors
- [GitHub](https://www.github.com/Lolp1ke)
- [GitLab](https://www.gitlab.com/Lolp1ke)
- [Telegram](https://t.me/Lolp1ke)
