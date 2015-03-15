
var http = require("http"),
    server;
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
      res.write("<input type='submit' value='"+action+"'>\n");
      res.write("</form><br/>");
    }

    function frontPage(req, res) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        beginPage(res);
        //res.write(req.method +"" +req.url);
        if (req.method === "POST" && (req.url === "/play/rock" || req.url === "/play/paper" ||
        req.url === "/play/scissor"  || req.url === "/play/lizard" || req.url === "/play/spock")) {
          res.write(req.url);
        }
        else
        {
          postAction(res,"rock");
          postAction(res,"paper");
          postAction(res,"scissor");
          postAction(res,"lizard");
          postAction(res,"spock");
        }
        endPage(res);

    }
server=http.createServer(frontPage);
server.listen(3000);

console.log("Server listening on port 3000 http://localhost:3000");
