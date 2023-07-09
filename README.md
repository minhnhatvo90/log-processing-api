* Clone the project<br />
`git clone https://github.com/minhnhatvo90/log-processing-api.git`<br />
`cd log-processing-api`<br />
`git pull origin develop`<br />
* Setup Environment Variables<br />
.env<br />
`NODE_LOCAL_PORT=3030`<br />
`NODE_DOCKER_PORT=3000`<br />
* Installing<br />
`docker compose up -d `<br />
* Call <br />
`curl --location --request GET 'http://localhost:3030/api/book' \
--form 'file=@"/path/to/json/file/log.json"'`
