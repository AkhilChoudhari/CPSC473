var http = require("http"),
    server;
var resultArray = '{"outcome":"John","wins":0,"losses":0,"ties":0}';
var gameArray = ["rock", "paper", "scissors", "lizard", "spock"];
var resultJSON = JSON.parse(resultArray);

function beginPage(res) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html lang='en'>\n");
    res.write("<head>\n");
    res.write("<meta charset='utf-8'>\n");
    res.write("<title>Game</title>\n");
    res.write("</head>\n");
    res.write("<body>\n");
    res.write("<div class='container'>");
}

function endPage(res) {
    res.write("</div>");
    res.write("</body>\n");
    res.write("</html>\n");
    res.end();
}

function postAction(res, action) {
    res.write("<form method='POST' action='/play/" + action + "'>\n");
    res.write("<input type='hidden' name='element' value='" + action + "'>\n");
    res.write("<input type='submit' value='" + action + "'>\n");
    res.write("</form><br/>");
}

function gameLogic(requestEle, resultJSON, gameArray) {
    var selectEle = gameArray[Math.floor(Math.random() * gameArray.length)];
    console.log(selectEle);
    if (requestEle === "rock") {
        if (selectEle === "scissors" || selectEle === "lizard") {
            resultJSON.outcome = "win";
            resultJSON.wins += 1;
        } else if (selectEle === "rock") {
            resultJSON.outcome = "ties";
            resultJSON.ties += 1;

        } else {
            resultJSON.outcome = "losses";
            resultJSON.losses += 1;
        }
    } else if (requestEle === "paper") {
        if (selectEle === "rock" || selectEle === "spock") {
            resultJSON.outcome = "win";
            resultJSON.wins += 1;
        } else if (selectEle === "paper") {
            resultJSON.outcome = "ties";
            resultJSON.ties += 1;

        } else {
            resultJSON.outcome = "losses";
            resultJSON.losses += 1;
        }
    } else if (requestEle === "scissors") {
        if (selectEle === "paper" || selectEle === "lizard") {
            resultJSON.outcome = "win";
            resultJSON.wins += 1;
        } else if (selectEle === "scissors") {
            resultJSON.outcome = "ties";
            resultJSON.ties += 1;

        } else {
            resultJSON.outcome = "losses";
            resultJSON.losses += 1;
        }
    } else if (requestEle === "lizard") {
        if (selectEle === "paper" || selectEle === "spock") {
            resultJSON.outcome = "win";
            resultJSON.wins += 1;
        } else if (selectEle === "lizard") {
            resultJSON.outcome = "ties";
            resultJSON.ties += 1;

        } else {
            resultJSON.outcome = "losses";
            resultJSON.losses += 1;
        }
    } else if (requestEle === "spock") {
        if (selectEle === "scissors" || selectEle === "rock") {
            resultJSON.outcome = "win";
            resultJSON.wins += 1;
        } else if (selectEle === "spock") {
            resultJSON.outcome = "ties";
            resultJSON.ties += 1;

        } else {
            resultJSON.outcome = "losses";
            resultJSON.losses += 1;
        }
    } else {
        resultJSON = {};
    }
    return resultJSON;
}

function frontPage(req, res) {




    if (req.method === "POST" && (req.url === "/play/rock" || req.url === "/play/paper" ||
            req.url === "/play/scissors" || req.url === "/play/lizard" || req.url === "/play/spock")) {

        /*var chunk = '';
        req.on('data', function (data) {
            chunk += data;
        });
        req.on('end', function () {
          requestEle=(querystring.parse(chunk)).element;
          console.log("request"+requestEle);
        });*/

        var parts = req.url.split("/");
            var requestEle = parts[2];
        resultJSON = gameLogic(requestEle, resultJSON, gameArray);
        console.log(resultJSON);
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(resultJSON));
        res.end();
    } else {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        beginPage(res);

        postAction(res, "rock");
        postAction(res, "paper");
        postAction(res, "scissors");
        postAction(res, "lizard");
        postAction(res, "spock");

        endPage(res);
    }


}
server = http.createServer(frontPage);
server.listen(3000);

console.log("Server listening on port 3000 http://localhost:3000");
