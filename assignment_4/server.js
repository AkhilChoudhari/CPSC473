
var http = require("http"),
    querystring = require("querystring"),
    server;
    var resultArray = '{"outcome":"John","wins":0,"losses":0,"ties":0}';
    var gameArray = ["rock", "paper", "scissors", "lizard", "spock"];
    var resultJSON=JSON.parse(resultArray);
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
    function postAction(res,action)
    {
      res.write("<form method='POST' action='/play/"+action+"'>\n");
      res.write("<input type='hidden' name='element' value='"+action+"'>\n");
      res.write("<input type='submit' value='"+action+"'>\n");
      res.write("</form><br/>");
    }

    function gameLogic(res,requestEle,resultJSON,gameArray)
    {
      var selectEle=gameArray[Math.floor(Math.random() * gameArray.length)];
      if(requestEle==="rock")
      {
        if(selectEle ==="scissors" || selectEle ==="lizard")
        {
          resultJSON.outcome="win";
          resultJSON.wins += 1;
        }
        else if(selectEle === "rock")
        {
          resultJSON.outcome="ties";
          resultJSON.ties += 1;

        }
        else
        {
          resultJSON.outcome="losses";
          resultJSON.losses += 1;
        }
      }
      return resultJSON;
    }

    function frontPage(req, res) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });


        var requestEle;
        if (req.method === "POST" && (req.url === "/play/rock" || req.url === "/play/paper" ||
        req.url === "/play/scissor"  || req.url === "/play/lizard" || req.url === "/play/spock")) {

              /*var chunk = '';
              req.on('data', function (data) {
                  chunk += data;
              });
              req.on('end', function () {
                requestEle=(querystring.parse(chunk)).element;
                console.log("request"+requestEle);
              });*/
              var parts=req.url.split("/"),
              requestEle=parts[2];
              resultJSON=gameLogic(res,requestEle,resultJSON,gameArray)
              res.write(JSON.stringify(resultJSON));
              res.end();
        }
        else
        {
          res.writeHead(200, {
              "Content-Type": "text/html"
          });
          beginPage(res);

          postAction(res,"rock");
          postAction(res,"paper");
          postAction(res,"scissor");
          postAction(res,"lizard");
          postAction(res,"spock");

          endPage(res);
        }


    }
server=http.createServer(frontPage);
server.listen(3000);

console.log("Server listening on port 3000 http://localhost:3000");
