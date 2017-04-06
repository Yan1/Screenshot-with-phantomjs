# Screenshot-with-phantomjs
This is a node.js app for screenshot with phantomjs.

### How to start
1. npm install
2. node app.js
3. delete the files in *images* folder
4. You can send a post request to localhost:7000/bar.html with the body. For example:
```
<script>
    var name = 'bar.png';
    var data = {
        xAxis: ["shirts","georgette","trousers","shoes"],
        value: [5, 36, 10, 10]
    };
    $.ajax({
        url: 'bar.html',
        type: 'POST',
        data: {data: data, name: name},
        success: function (result) {
            document.write(result);
        }
    });
</script>
```
5. several minutes later you will find the bar.png exists in *images* folder

You can also open localhost:7000/testBar.html to render the bar-example.png instead of send a post request by yourself.

