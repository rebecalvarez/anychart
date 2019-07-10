//Displaying anychart data on the chart
    anychart.data.loadJsonFile("./data.php", function (data) {  // init and draw chart
        var chart = anychart.bar(data);
        chart.title("Volunteering Hours");
        chart.container("container");
        chart.draw();
        //Making sure the data is correct
        console.log(data);



        // update chart from server every 5 seconds
        setInterval(function(){
            // make request to server
            // to use loadJsonFile function you must include data-adapter.min.js to your page
            anychart.data.loadJsonFile("./data.php", function (data) {
                chart.data(data);
            })
        }, 5000);
    });
